#!/usr/bin/env node
/**
 * Safe database bootstrap (run manually: `npm run db:setup`).
 *
 * What it does:
 *   1. Reads DATABASE_URL / DIRECT_URL from the environment or .env — it NEVER
 *      writes or overwrites .env, never overrides variables that are already
 *      set in the real environment, and never prints credentials.
 *   2. Applies pending Prisma migrations with `prisma migrate deploy`
 *      (additive, non-destructive — it never resets, drops, or "db push"-es).
 *      A failed migration stops this script with a NON-ZERO exit code.
 *   3. Prints a read-only row-count summary (informational; its failure does
 *      not affect the exit code).
 *
 * What it deliberately does NOT do:
 *   - No `.env` writing, no hardcoded secrets (the old version overwrote .env
 *     with a hardcoded NEXTAUTH_SECRET — that is gone; secrets live in your
 *     environment only).
 *   - No `db push --accept-data-loss`, no `migrate reset`, no automatic
 *     seeding (seeding is explicit: `npm run db:seed`).
 *
 * Exit codes: 0 = success, 1 = configuration error or failed migration.
 */

import { join, resolve } from "node:path";
import { execSync } from "node:child_process";
import { loadEnvFile } from "./lib/load-env.mjs";

const POSTGRES_URL_RE = /^postgres(ql)?:\/\//;

function redact(url) {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.hostname}${u.pathname}`;
  } catch {
    return "<unparseable-url>";
  }
}

async function main() {
  const projectRoot = resolve(import.meta.dirname, "..");

  // ── Load .env if present (read-only; real environment variables always win) ──
  loadEnvFile(join(projectRoot, ".env"));

  const dbUrl = process.env.DATABASE_URL || "";

  // ── Validate the target database ──
  if (!POSTGRES_URL_RE.test(dbUrl)) {
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
  } else if (!POSTGRES_URL_RE.test(process.env.DIRECT_URL)) {
    console.error("[Setup DB] ❌ DIRECT_URL is set but does not point to PostgreSQL.");
    console.error("[Setup DB]    Remove it or set it to the unpooled postgresql:// URL.");
    process.exit(1);
  }

  console.log(`[Setup DB] Target database: ${redact(dbUrl)}`);

  // ── Apply pending migrations (non-destructive, fatal on failure) ──
  console.log("[Setup DB] Applying migrations with `prisma migrate deploy`…");
  try {
    execSync("npx prisma migrate deploy", {
      stdio: "inherit",
      cwd: projectRoot,
      env: process.env,
    });
  } catch (err) {
    const status = typeof err?.status === "number" ? ` (exit code ${err.status})` : "";
    console.error(`[Setup DB] ❌ prisma migrate deploy FAILED${status} — see output above.`);
    console.error("[Setup DB]    The database was NOT changed by this step beyond what the");
    console.error("[Setup DB]    migration itself applied; fix the error and re-run.");
    process.exit(1);
  }

  // ── Read-only summary (informational — never affects the exit code) ──
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
    console.warn(`[Setup DB] ⚠️  Could not read row counts (${String(err?.message || err).split("\n")[0]}).`);
    console.warn("[Setup DB]    Try regenerating the client first: npm run db:generate");
  }

  console.log("[Setup DB] ℹ️  Seeding is manual-only: npm run db:seed (never runs during build).");
}

main().catch((err) => {
  console.error("[Setup DB] ❌ Unexpected error:", err?.stack || err);
  process.exit(1);
});
