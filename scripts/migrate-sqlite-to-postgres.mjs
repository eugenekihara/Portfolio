#!/usr/bin/env node
/**
 * One-time data migration: SQLite (prisma/db/custom.db) → PostgreSQL.
 *
 * Guarantees:
 *   - Exact row copies: IDs, password hashes, timestamps and flags preserved.
 *   - Upsert-only: never deletes anything, never touches rows that exist only
 *     in PostgreSQL. Re-running converges instead of duplicating.
 *   - The SQLite file is opened read-only (PRAGMA query_only) — never modified.
 *   - Credentials are never printed (connection string is shown redacted).
 *
 * Usage (from the project root, after DATABASE_URL/DIRECT_URL are set):
 *   node scripts/migrate-sqlite-to-postgres.mjs                 # migrate + verify
 *   node scripts/migrate-sqlite-to-postgres.mjs --dry-run       # inspect only, no DB writes
 *   node scripts/migrate-sqlite-to-postgres.mjs --verify-only   # counts comparison, no writes
 *   node scripts/migrate-sqlite-to-postgres.mjs --sqlite path/to/custom.db
 *
 * Requires Node >= 22.5 (built-in node:sqlite).
 */

import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

// ────────────────────────────── args & env ──────────────────────────────

const argv = process.argv.slice(2);
const DRY_RUN = argv.includes("--dry-run");
const VERIFY_ONLY = argv.includes("--verify-only");

function argValue(name, fallback) {
  const i = argv.indexOf(name);
  return i !== -1 && argv[i + 1] ? resolve(process.cwd(), argv[i + 1]) : fallback;
}
const sqlitePath = argValue("--sqlite", resolve(process.cwd(), "prisma/db/custom.db"));

const projectRoot = resolve(import.meta.dirname, "..");
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

if (!DRY_RUN && !/^postgres(ql)?:\/\//.test(dbUrl)) {
  console.error("[Migrate] ❌ DATABASE_URL is missing or does not point to PostgreSQL.");
  console.error("[Migrate]    Set DATABASE_URL (and DIRECT_URL) in .env or your shell first.");
  process.exit(1);
}

function redact(url) {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.hostname}${u.pathname}`;
  } catch {
    return "<unparseable-url>";
  }
}

// ────────────────────────────── value coercion ──────────────────────────

function toDate(v) {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "number") return new Date(v);
  const s = String(v).trim();
  let d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d;
  // Normalize Prisma/SQLite-style timestamps: "2025-01-15 09:30:00.123 +00:00"
  const m = s.match(
    /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}(?::\d{2})?(?:\.\d{1,6})?)(?:\s*(Z|[+-]\d{2}:?\d{2}))?$/
  );
  if (m) {
    const tz = m[3] ? (m[3] === "Z" ? "Z" : m[3].replace(":", "")) : "Z";
    d = new Date(`${m[1]}T${m[2]}${tz}`);
    if (!Number.isNaN(d.getTime())) return d;
  }
  throw new Error(`Unparseable datetime value: "${v}"`);
}

function toBool(v) {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  const s = String(v).trim().toLowerCase();
  if (["0", "false", "f", "no"].includes(s)) return false;
  if (["1", "true", "t", "yes"].includes(s)) return true;
  throw new Error(`Unparseable boolean value: "${v}"`);
}

function toInt(v) {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  if (!Number.isInteger(n)) throw new Error(`Unparseable integer value: "${v}"`);
  return n;
}

function toStr(v) {
  return v === null || v === undefined ? null : String(v);
}

// ────────────────────────────── table specs ─────────────────────────────
// Field lists mirror prisma/schema.prisma exactly (SQLite stores field names
// as-is; PostgreSQL will too — no column mapping needed).

const TABLES = [
  {
    table: "AdminUser",
    bools: [],
    ints: [],
    dates: ["createdAt", "updatedAt"],
    redact: ["passwordHash"],
  },
  {
    table: "Project",
    bools: ["featured", "published"],
    ints: ["order"],
    dates: ["completionDate", "createdAt", "updatedAt"],
    redact: [],
  },
  {
    table: "ContactMessage",
    bools: ["isRead", "isArchived", "isReplied"],
    ints: [],
    dates: ["createdAt", "updatedAt"],
    redact: [],
  },
];

const MODEL = { AdminUser: "adminUser", Project: "project", ContactMessage: "contactMessage" };
const CHUNK = 100;

// ────────────────────────────── SQLite read ─────────────────────────────

if (!existsSync(sqlitePath)) {
  console.error(`[Migrate] ❌ SQLite database not found at: ${sqlitePath}`);
  console.error("[Migrate]    Pass a custom path with --sqlite <path> if it lives elsewhere.");
  process.exit(1);
}

const sqlite = new DatabaseSync(sqlitePath);
sqlite.exec("PRAGMA query_only = 1"); // hard read-only, even by accident

const sqliteData = new Map();

function readTable(spec) {
  const cols = sqlite
    .prepare(`PRAGMA table_info("${spec.table}")`)
    .all()
    .map((c) => c.name);
  const needed = [...new Set([...spec.dates, ...spec.bools, ...spec.ints, "id"])];
  const missing = needed.filter((c) => !cols.includes(c));
  if (missing.length) {
    console.error(`[Migrate] ❌ Table ${spec.table} is missing expected columns: ${missing.join(", ")}`);
    console.error(`[Migrate]    Actual columns: ${cols.join(", ")}`);
    process.exit(1);
  }
  const select = cols.map((c) => `"${c}"`).join(", ");
  return sqlite.prepare(`SELECT ${select} FROM "${spec.table}"`).all();
}

function mapRow(spec, row) {
  const data = {};
  for (const col of Object.keys(row)) {
    const v = row[col];
    if (spec.bools.includes(col)) data[col] = toBool(v);
    else if (spec.ints.includes(col)) data[col] = toInt(v);
    else if (spec.dates.includes(col)) data[col] = toDate(v);
    else data[col] = toStr(v);
  }
  return data;
}

for (const spec of TABLES) {
  const rows = readTable(spec);
  sqliteData.set(spec.table, rows);
}

console.log("[Migrate] SQLite source (read-only):");
for (const spec of TABLES) {
  console.log(`  ${spec.table.padEnd(16)} ${sqliteData.get(spec.table).length} rows`);
}

// ────────────────────────────── dry run ─────────────────────────────────

if (DRY_RUN) {
  console.log("\n[Migrate] --dry-run: sample of first row per table (sensitive values redacted):");
  for (const spec of TABLES) {
    const rows = sqliteData.get(spec.table);
    console.log(`\n  ${spec.table}:`);
    if (!rows.length) {
      console.log("    (empty)");
      continue;
    }
    const sample = mapRow(spec, rows[0]);
    for (const [k, v] of Object.entries(sample)) {
      const value = spec.redact.includes(k) ? "***redacted***" : v;
      const shown =
        typeof value === "string" && value.length > 60 ? `${value.slice(0, 57)}…` : value;
      console.log(`    ${k.padEnd(20)} ${shown}`);
    }
  }
  console.log("\n[Migrate] ✅ Dry run complete — nothing was written. Remove --dry-run to migrate.");
  process.exit(0);
}

// ────────────────────────────── PostgreSQL write ────────────────────────

const { PrismaClient } = await import("@prisma/client");
const prisma = new PrismaClient();

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function migrateTable(spec) {
  const rows = sqliteData.get(spec.table);
  const model = MODEL[spec.table];
  let done = 0;
  const t0 = Date.now();
  for (const group of chunk(rows, CHUNK)) {
    const ops = group.map((row) => {
      const data = mapRow(spec, row);
      const { id, ...rest } = data;
      // Upsert by id: insert if missing, otherwise refresh the row to match
      // SQLite exactly. Never deletes; rows that exist only in PostgreSQL are
      // left untouched.
      return prisma[model].upsert({ where: { id }, update: rest, create: data });
    });
    await prisma.$transaction(ops);
    done += group.length;
    console.log(`  ${spec.table}: ${done}/${rows.length}`);
  }
  console.log(`  ${spec.table} done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

async function verify() {
  let ok = true;
  console.log("\n[Migrate] ── Verification (SQLite → PostgreSQL) ──");
  console.log("  Table              SQLite   PostgreSQL   Missing-in-PG");
  for (const spec of TABLES) {
    const model = MODEL[spec.table];
    const src = sqliteData.get(spec.table);
    const pgRows = await prisma[model].findMany({ select: { id: true } });
    const pgIds = new Set(pgRows.map((r) => r.id));
    const missing = src.filter((r) => !pgIds.has(r.id)).map((r) => r.id);
    console.log(
      `  ${spec.table.padEnd(18)} ${String(src.length).padStart(6)} ${String(pgRows.length).padStart(12)} ${String(missing.length).padStart(13)}`
    );
    for (const id of missing) console.log(`    ↳ missing in PostgreSQL: ${id}`);
    if (missing.length) ok = false;
  }
  console.log(ok ? "\n[Migrate] ✅ Verification passed — all SQLite rows are present in PostgreSQL." : "\n[Migrate] ❌ Verification FAILED.");
  return ok;
}

try {
  if (VERIFY_ONLY) {
    const ok = await verify();
    process.exit(ok ? 0 : 1);
  }

  console.log(`\n[Migrate] Writing to PostgreSQL: ${redact(dbUrl)}`);
  console.log("[Migrate] Upsert-only — nothing will be deleted.\n");
  const t0 = Date.now();
  for (const spec of TABLES) {
    await migrateTable(spec);
  }
  console.log(`\n[Migrate] Copy finished in ${((Date.now() - t0) / 1000).toFixed(1)}s.`);

  const ok = await verify();
  process.exit(ok ? 0 : 1);
} catch (err) {
  console.error("\n[Migrate] ❌ Migration failed:", err.message);
  console.error("[Migrate]    Nothing was deleted; already-migrated rows are kept (re-run to resume).");
  process.exit(1);
} finally {
  await prisma.$disconnect().catch(() => {});
}
