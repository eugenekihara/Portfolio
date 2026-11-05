#!/usr/bin/env node
/**
 * Safe database bootstrap (run manually: `npm run db:setup`).
 *
 * What it does:
 *   1. Reads DATABASE_URL / DIRECT_URL from the environment or .env — it NEVER
 *      writes or overwrites .env, and never contains or prints credentials.
 *   2. Applies pending Prisma migrations with `prisma migrate deploy`
 *      (additive, non-destructive — it never resets, drops, or "db push"-es).
 *   3. Prints a read-only row-count summary.
 *
 * What it deliberately does NOT do:
 *   - No `.env` writing, no hardcoded secrets (the old version overwrote .env
 *     with a hardcoded NEXTAUTH_SECRET — that is gone; secrets live in your
 *     environment only).
 *   - No `db push --accept-data-loss`, no `migrate reset`, no automatic
 *     seeding (seeding is explicit: `npm run db:seed`).
 */

import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { execSync } from "node:child_process";

const projectRoot = resolve(import.meta.dirname, "..");

// ── Load .env if present (read-only, never overrides real env vars) ──
const envFile = join(projectRoot, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[m[1]] === undefined) process.env[m[1]] = value;
  }
}

const dbUrl = process.env.DATABASE_URL || "";

// ── Validate the target database ──
if (!/^postgres(ql)?:\/\//.test(dbUrl)) {
  console.error("[Setup DB] ❌ DATABASE_URL is missing or does not point to PostgreSQL.");
  console.error("[Setup DB]    Add the following to .env (local) or your hosting env vars:");
  console.error('[Setup DB]      DATABASE_URL="postgresql://…?sslmode=require"');
  console.error('[Setup DB]      DIRECT_URL="postgresql://…?sslmode=require"  # unpooled URL for migrations');
  process.exit(1);
}

if (!process.env.DIRECT_URL) {
  // Prisma CLI (migrate) needs DIRECT_URL; fall back to DATABASE_URL, which then
  // must be a direct/unpooled URL.
  process.env.DIRECT_URL = dbUrl;
  console.warn("[Setup DB] ⚠️  DIRECT_URL not set — falling back to DATABASE_URL for migrations.");
}

function redact(url) {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.hostname}${u.pathname}`;
  } catch {
    return "<unparseable-url>";
  }
}

console.log(`[Setup DB] Target database: ${redact(dbUrl)}`);

// ── Apply pending migrations (non-destructive) ──
console.log("[Setup DB] Applying migrations with `prisma migrate deploy`…");
try {
  execSync("npx prisma migrate deploy", {
    stdio: "inherit",
    cwd: projectRoot,
    env: process.env,
  });
} catch {
  console.error("[Setup DB] ❌ prisma migrate deploy failed — see output above.");
  process.exit(1);
}

// ── Read-only summary ──
try {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  try {
    const [admins, projects, messages] = await Promise.all([
      prisma.adminUser.count(),
      prisma.project.count(),
      prisma.contactMessage.count(),
    ]);
    console.log(
      `[Setup DB] ✅ Database ready. Row counts → AdminUser: ${admins}, Project: ${projects}, ContactMessage: ${messages}`
    );
  } finally {
    await prisma.$disconnect();
  }
} catch (err) {
  console.warn(`[Setup DB] ⚠️  Could not read row counts (${err.message.split("\n")[0]}).`);
  console.warn("[Setup DB]    Try regenerating the client first: npm run db:generate");
}

console.log("[Setup DB] ℹ️  Seeding is manual-only: npm run db:seed (never runs during build).");
