# PostgreSQL (Neon) Migration Guide

This project has been switched from a local SQLite file (`prisma/db/custom.db`) to
PostgreSQL, ready for Vercel + [Neon](https://neon.tech). All data (admin login,
projects, contact messages) is carried over **exactly** — IDs, password hashes,
timestamps and flags are preserved. Nothing is deleted; the old SQLite file stays
on disk as your backup until you decide otherwise.

---

## 1. What changed

| File | Change |
| --- | --- |
| `prisma/schema.prisma` | Provider `sqlite` → `postgresql`, added `directUrl` (unpooled URL for migrations) |
| `prisma/migrations/20261105000000_init/` | Formal init migration that creates all 3 tables in PostgreSQL |
| `src/lib/db.ts` | Removed the hardcoded SQLite path + `DATABASE_URL` override — now uses env vars only |
| `scripts/setup-db.mjs` | Rebuilt: never writes `.env`, no hardcoded secrets, no `db push --accept-data-loss`, no auto-seed. Just `prisma migrate deploy` + read-only row counts |
| `scripts/migrate-sqlite-to-postgres.mjs` | NEW — one-time data migration (SQLite → PostgreSQL, upsert-only, idempotent, read-only on the SQLite side) |
| `prisma/seed.ts` | Safe seed: credentials from env vars, never overwrites existing rows, never runs during build |
| `scripts/copy-standalone-assets.mjs` | No longer bundles a SQLite file or writes a hardcoded `.env`/secret into the build |
| `package.json` | `build`/`dev` no longer touch the database; removed `db:push`/`db:reset`; added `db:setup`, `db:deploy`, `db:migrate:sqlite`, `db:verify` |
| `.env.example` | NEW — template for all required environment variables |

New npm scripts:

| Command | What it does |
| --- | --- |
| `npm run db:setup` | Validates env + applies pending migrations (safe, idempotent) |
| `npm run db:deploy` | `prisma migrate deploy` only |
| `npm run db:migrate:sqlite` | One-time data migration from the old SQLite file |
| `npm run db:verify` | Compare row counts SQLite vs PostgreSQL (no writes) |
| `npm run db:seed` | Explicit, safe seed for a **fresh** database (admin comes from `ADMIN_EMAIL`/`ADMIN_PASSWORD`) |

---

## 2. One-time migration — what to type

Run these on the machine that has the original `prisma/db/custom.db`.
You need two connection strings from the Neon console → **Connection Details**:

- **Pooled** (host contains `-pooler`) → used at runtime
- **Direct / unpooled** (no `-pooler`) → used for migrations

```bash
# 0. Get the latest code
git checkout main
git pull

npm install

# 1. Back up the old SQLite database (kept locally, git-ignored)
cp prisma/db/custom.db prisma/db/custom.backup-$(date +%Y-%m-%d).db

# 2. Point the project at Neon — replace the two URLs with YOUR values
cat > .env <<'EOF'
DATABASE_URL="postgresql://USER:PASSWORD@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://USER:PASSWORD@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="paste-output-of-openssl-rand-base64-32"
EOF
chmod 600 .env

# 3. Create the tables in Neon
npm run db:deploy

# 4. Look before you leap — no writes happen in this step
npm run db:migrate:sqlite -- --dry-run

# 5. Copy the real data (upsert-only, preserves IDs/hashes/timestamps; re-runnable)
npm run db:migrate:sqlite

# 6. Confirm counts match
npm run db:verify

# 7. Quick local sanity check, then stop it
npm run dev
#   → visit http://localhost:3000, log in at /admin with your existing password
```

Notes:

- `?pgbouncer=true` on `DATABASE_URL` makes Prisma compatible with Neon's pooled
  connections (transaction-mode PgBouncer).
- If you prefer, you can point **both** variables at the same **direct** (unpooled)
  URL for the initial migration — everything still works; only Neon's pooler
  efficiency is lost at runtime.
- The migration is **upsert-only**: it never deletes anything in PostgreSQL and
  never modifies the SQLite file. If it is interrupted, just run it again.

---

## 3. Vercel configuration

In the Vercel project → **Settings → Environment Variables** (all environments):

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Neon **pooled** URL + `?sslmode=require&pgbouncer=true` (if you added the Neon integration, `DATABASE_URL` is created for you — just append `&pgbouncer=true`) |
| `DIRECT_URL` | Neon **direct/unpooled** URL + `?sslmode=require` |
| `NEXTAUTH_URL` | Your production URL, e.g. `https://your-domain.com` (next-auth v4 requires this) |
| `NEXTAUTH_SECRET` | A fresh random value: `openssl rand -base64 32` |

> ⚠️ **Rotate `NEXTAUTH_SECRET`.** The old code hard-coded a secret into the repo
> (`scripts/setup-db.mjs` / `copy-standalone-assets.mjs`), so it is public in git
> history. Setting a new random value in Vercel invalidates anything forged with
> the old one. You will simply log in again — sessions are JWT-based.

Then deploy (push to `main`, or `vercel --prod`).

**No migration runs during Vercel builds.** The build only compiles — it never
connects to the database. Schema changes in the future: run `npm run db:migrate`
locally, commit the generated files in `prisma/migrations/`, then run
`npm run db:deploy` (or `db:setup`) against production when you want them applied.

---

## 4. Everyday development

- `npm run dev` — just works as long as `.env` contains the Neon URLs.
  **Careful:** local dev now reads/writes your production database. If you want an
  isolated sandbox, create a second Neon branch/database and use its URLs in `.env`.
- Fresh machine or fresh database? `npm run db:deploy` creates the schema, and
  `ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run db:seed` fills a **new** database
  (existing rows are never overwritten).
- `prisma db push` and `prisma migrate reset` scripts were removed on purpose —
  they are the classic "accept data loss" footguns. Use migrations.

---

## 5. If something looks wrong

```bash
npm run db:verify          # counts SQLite vs PostgreSQL
npm run db:migrate:sqlite  # safe to re-run — converges instead of duplicating
```

The original SQLite file (`prisma/db/custom.db`, plus the backup you made) is
never touched by any of these commands. Keep it until you are confident, then
archive or delete it whenever you like — it is your snapshot of pre-migration data.
