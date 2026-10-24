import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import { randomUUID } from 'node:crypto';
import { pool } from './db.js';

const app = express();
const port = Number.parseInt(process.env.PORT || '3001', 10);
const adminUsername = process.env.ADMIN_USERNAME;
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
const jwtSecret = process.env.JWT_SECRET;

if (!adminUsername || !adminPasswordHash || !jwtSecret) {
  throw new Error(
    'ADMIN_USERNAME, ADMIN_PASSWORD_HASH, and JWT_SECRET must be configured.',
  );
}

if (jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must contain at least 32 characters.');
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Try again later.' },
});

app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '20kb' }));
app.post('/api/admin/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body ?? {};

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    username.length > 100 ||
    password.length > 200
  ) {
    return res.status(400).json({
      message: 'Username and password are required.',
    });
  }

  const usernameMatches = username === adminUsername;

  // Perform a password comparison even when the username is wrong.
  const passwordMatches = await bcrypt.compare(
    password,
    adminPasswordHash,
  );

  if (!usernameMatches || !passwordMatches) {
    return res.status(401).json({
      message: 'Invalid username or password.',
    });
  }

  const token = jwt.sign(
    { sub: adminUsername, role: 'admin' },
    jwtSecret,
    { expiresIn: '15m', issuer: 'devops-portfolio-api' },
  );

  return res.status(200).json({
    message: 'Login successful.',
    token,
    tokenType: 'Bearer',
    expiresIn: 900,
  });
});


//middileware

function requireAdmin(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authentication required.',
    });
  }

  const token = authorization.slice('Bearer '.length);

  try {
    const payload = jwt.verify(token, jwtSecret, {
      issuer: 'devops-portfolio-api',
    });

    if (payload.role !== 'admin' || payload.sub !== adminUsername) {
      return res.status(403).json({
        message: 'Admin access required.',
      });
    }

    req.admin = { username: payload.sub };
    next();
  } catch {
    return res.status(401).json({
      message: 'Invalid or expired token.',
    });
  }
}

app.get('/api/admin/me', requireAdmin, (req, res) => {
  res.json({
    authenticated: true,
    username: req.admin.username,
    role: 'admin',
  });
});

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    return res.status(200).json({
      status: 'ok',
      service: 'devops-portfolio-api',
      database: 'connected',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    });
  } catch (error) {
    console.error('Database health check failed:', error.code || 'DATABASE_ERROR');
    return res.status(503).json({
      status: 'degraded',
      service: 'devops-portfolio-api',
      database: 'disconnected',
      message: 'The API is running, but the database is unavailable.',
    });
  }
});

app.post('/api/contact', async (req, res, next) => {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ message: 'Request body must be a JSON object.' });
  }

  const { name, email, subject, message } = body;
  const errors = {};

  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    errors.name = 'Name must contain 2 to 100 characters.';
  }
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (typeof subject !== 'string' || subject.trim().length < 3 || subject.trim().length > 160) {
    errors.subject = 'Subject must contain 3 to 160 characters.';
  }
  if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000) {
    errors.message = 'Message must contain 10 to 5000 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: 'Please correct the contact form fields.', errors });
  }

  const id = randomUUID();
  try {
    // Parameterized SQL keeps user-provided values separate from SQL syntax.
    await pool.execute(
      `INSERT INTO contact_messages (id, name, email, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [id, name.trim(), email.trim(), subject.trim(), message.trim()],
    );

    return res.status(201).json({
      message: 'Your message has been saved successfully.',
      id,
      receivedAt: new Date().toISOString(),
      persistent: true,
    });
  } catch (error) {
    console.error('Contact message could not be saved:', error.code || 'DATABASE_ERROR');
    return res.status(503).json({
      message: 'Your message could not be saved because the database is temporarily unavailable. Please try again later or use the email link below.',
      code: 'DATABASE_UNAVAILABLE',
    });
  }
});

app.use('/api', (_req, res) => {
  res.status(404).json({ message: 'API endpoint not found.' });
});

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ message: 'Request body contains invalid JSON.' });
  }
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Request body is too large.' });
  }
  console.error('Unhandled API error:', err?.message || 'Unknown error');
  return res.status(500).json({ message: 'An unexpected server error occurred.' });
});

async function start() {
  try {
    await pool.query('SELECT 1');
    console.log('MySQL connection verified.');
    app.listen(port, '0.0.0.0', () => {
      console.log(`Portfolio API listening on http://localhost:${port}`);
      console.log(`Health check: http://localhost:${port}/api/health`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Could not connect to MySQL. Check backend/.env and run backend/schema.sql.');
    console.error(`Database error code: ${error.code || 'UNKNOWN_ERROR'}`);
    await pool.end().catch(() => {});
    process.exitCode = 1;
  }
}

start();
