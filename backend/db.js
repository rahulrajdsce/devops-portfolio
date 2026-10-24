import mysql from 'mysql2/promise';

const required = ['DB_HOST', 'DB_NAME', 'DB_USER'];
const missing = required.filter((key) => !process.env[key]?.trim());
if (missing.length > 0) {
  throw new Error(`Missing required database environment variables: ${missing.join(', ')}. Copy .env.example to .env and configure it.`);
}

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT || '3306', 10),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  decimalNumbers: true,
  timezone: 'Z',
});
