# DevOps Engineer Portfolio — Phase 3

React + Vite frontend and Node.js + Express API with **MySQL persistence** for contact-form submissions.

## Requirements

- Node.js 20 or newer and npm
- MySQL Server 8.x running locally
- MySQL Workbench (optional, but helpful on Windows)

## Architecture

- Frontend: `http://localhost:5173`
- Express API: `http://localhost:3001`
- MySQL: configured by `backend/.env`
- `GET /api/health` checks API and database connectivity
- `POST /api/contact` validates a contact request and inserts it into `contact_messages`

The API intentionally does not provide a public endpoint for reading contact messages. Do not put real sensitive information into this learning project or expose it publicly before production hardening.

## Step 1 — Create the database and table

Start MySQL Server. In MySQL Workbench, connect to your local server and open `backend/schema.sql` (File → Open SQL Script), then execute the script. It creates the `devops_portfolio` database and the `contact_messages` table.

You can verify the table with:

```sql
USE devops_portfolio;
SHOW TABLES;
DESCRIBE contact_messages;
```

## Step 2 — Create a dedicated application user

For local development, use a dedicated account instead of connecting your application as `root`. In MySQL Workbench, execute the following after replacing the example password with a strong local password:

```sql
CREATE USER IF NOT EXISTS 'portfolio_app'@'127.0.0.1'
  IDENTIFIED BY 'replace_with_your_local_password';

GRANT SELECT, INSERT ON devops_portfolio.contact_messages
  TO 'portfolio_app'@'127.0.0.1';

FLUSH PRIVILEGES;
```

If you previously created this user with a different password, update it using `ALTER USER` or use a new local password consistently in both MySQL and `backend/.env`.

## Step 3 — Configure the backend

In PowerShell, from the project root:

```powershell
Copy-Item backend/.env.example backend/.env
notepad backend/.env
```

Set `DB_USER` and `DB_PASSWORD` to the account you created. The default MySQL port is `3306`; if your local MySQL server listens on a different port, update `DB_PORT` to match it.

**Do not commit `backend/.env` to Git.** It is excluded by `.gitignore`. Never paste your database password into chat or screenshots.

## Step 4 — Install backend dependencies and run the API

```powershell
cd backend
npm install
npm run check
npm run dev
```

The API verifies a MySQL connection before listening. A successful startup includes `MySQL connection verified.` and `Portfolio API listening on http://localhost:3001`.

If startup fails, check that MySQL is running, the port is correct, the schema exists, and the account/password match. Common MySQL errors include `ECONNREFUSED` (server/port unavailable), `ER_ACCESS_DENIED_ERROR` (credentials or account host mismatch), and `ER_BAD_DB_ERROR` (database missing).

## Step 5 — Verify health (new PowerShell window)

Use `curl.exe` in Windows PowerShell because `curl` may be an alias for `Invoke-WebRequest`:

```powershell
curl.exe -i http://localhost:3001/api/health
```

Expected: HTTP `200 OK` and JSON containing `"status":"ok"` and `"database":"connected"`.

## Step 6 — Test contact validation and persistence

Invalid request (expected HTTP 400):

```powershell
curl.exe -i -X POST http://localhost:3001/api/contact -H "Content-Type: application/json" -d '{"name":"A","email":"bad","subject":"Hi","message":"Short"}'
```

Valid test request (expected HTTP 201 and `"persistent":true`):

```powershell
curl.exe -i -X POST http://localhost:3001/api/contact -H "Content-Type: application/json" -d '{"name":"Demo User","email":"demo@example.com","subject":"Portfolio question","message":"This is a test message for checking database persistence."}'
```

Verify the row in MySQL Workbench:

```sql
SELECT id, name, email, subject, created_at
FROM devops_portfolio.contact_messages
ORDER BY created_at DESC
LIMIT 5;
```

The query deliberately excludes the message body. Use only synthetic test data for this project.

Restart the backend and run the SELECT again. The row should still exist; this demonstrates persistence beyond the Node process lifetime.

## Step 7 — Start and test the frontend

Open another terminal at the project root:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`, submit the contact form with synthetic test data, and confirm the success response. Vite proxies `/api/*` to the backend on port 3001.

## Phase 3 checklist

- [ ] MySQL Server is running
- [ ] `devops_portfolio.contact_messages` exists
- [ ] Dedicated application user has only required table permissions
- [ ] `backend/.env` configured locally and not committed
- [ ] `npm run check` passes
- [ ] Health endpoint reports database connected
- [ ] Invalid contact request returns HTTP 400
- [ ] Valid contact request returns HTTP 201 and `persistent: true`
- [ ] Contact row visible in MySQL
- [ ] Row remains after restarting the backend
- [ ] Frontend contact form works through Vite proxy

## Important security notes

This is a learning implementation, not production-ready contact infrastructure. It does not yet include rate limiting, email delivery, administrative access controls, data-retention policies, CSRF protection, production secret management, or comprehensive automated tests. Never expose the database publicly or deploy this API to the internet as-is.
