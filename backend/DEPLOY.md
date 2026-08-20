# Pawdiac Backend — Deploy Guide

## Railway Deployment (once account is upgraded)

### Option A: Railway CLI (fastest)
```bash
cd /Users/sunnydulay/.openclaw/workspace/pawdiac/backend

# 1. Create new project
railway init --name pawdiac-backend

# 2. Add PostgreSQL plugin inside Railway dashboard, OR:
railway add --plugin postgresql

# 3. Set environment variables
railway variables set OPENAI_API_KEY=sk-...
railway variables set JWT_SECRET=$(openssl rand -hex 32)
# DATABASE_URL is auto-set by the Postgres plugin

# 4. Deploy
railway up
```

### Option B: Railway Dashboard (GitHub)
1. Go to https://railway.app/new
2. "Deploy from GitHub Repo" → connect this repo
3. Add a PostgreSQL service in the same project
4. Railway auto-wires `DATABASE_URL`
5. Add env vars: `OPENAI_API_KEY`, `JWT_SECRET`
6. Deploy

### Environment Variables Required
| Variable | Value |
|---|---|
| `DATABASE_URL` | Auto-set by Railway Postgres plugin |
| `OPENAI_API_KEY` | Your OpenAI key |
| `JWT_SECRET` | Random 32-byte hex string |
| `PORT` | Set by Railway automatically |
| `NODE_ENV` | `production` |

## Local Development
```bash
cp .env.example .env
# Fill in your DATABASE_URL, OPENAI_API_KEY, JWT_SECRET
npm install
npm run dev
```

## API Routes
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /health | No | Health check |
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login |
| POST | /api/dogs | Yes | Create dog |
| GET | /api/dogs/:id | Yes | Get dog + cosmic profile |
| GET | /api/dogs/:id/reading | Yes | Today's reading (cached) |
| POST | /api/dogs/:id/observations | Yes | Log observation |
| GET | /api/users/:id/dogs | Yes | List user's dogs |
| POST | /api/apn/register | Yes | Register APN token |
