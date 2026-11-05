#!/usr/bin/env node
/**
 * One-time data migration: SQLite (prisma/db/custom.db) → PostgreSQL.
 *
 * Guarantees:
 *   - Exact row copies: IDs, password hashes, timestamps, nullable fields and
 *     Boolean values are preserved for AdminUser, Project and ContactMessage.
 *   - Upsert-only: never deletes anything and never touches rows that exist
 *     only in PostgreSQL. Re-running converges instead of duplicating.
 *   - The SQLite file is opened STRICTLY read-only (readOnly open option +
 *     PRAGMA query_only). The source database is never modified.
 *   - --dry-run touches nothing but the SQLite file (read-only): the Prisma
 *     Client / PostgreSQL code paths are never even imported.
 *   - Credentials are never printed (connection strings are shown redacted,
 *     password hashes are compared but never displayed).
 *
 * Usage (from the project root):
 *   node scripts/migrate-sqlite-to-postgres.mjs                  # migrate + verify
 *   node scripts/migrate-sqlite-to-postgres.mjs --dry-run        # inspect only, zero PostgreSQL access
 *   node scripts/migrate-sqlite-to-postgres.mjs --verify-only    # read-only comparison, no writes
 *   node scripts/migrate-sqlite-to-postgres.mjs --sqlite path/to/custom.db
 *   node scripts/migrate-sqlite-to-postgres.mjs --help
 *
 * Requires Node.js >= 22.13 (node:sqlite enabled by default; works on 23.4+ too).
 * Tested on Node 22.20.0 and 24.x with Prisma 6.19.x.
 */

import { existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadEnvFile } from "./lib/load-env.mjs";

// ────────────────────────────── args ────────────────────────────────────

const argv = process.argv.slice(2);
const DRY_RUN = argv.includes("--dry-run");
const VERIFY_ONLY = argv.includes("--verify-only");

if (argv.includes("--help")) {
  console.log(`Usage: node scripts/migrate-sqlite-to-postgres.mjs [options]

Options:
  --dry-run        Read the SQLite source, print counts and a redacted sample,
                   then exit. PostgreSQL is never contacted and nothing is written.
  --verify-only    Connect to PostgreSQL read-only and compare every source row
                   (counts, missing IDs, extra IDs, field-level content). No writes.
  --sqlite <path>  Path to the SQLite file (default: prisma/db/custom.db)
  --help           Show this help.`);
  process.exit(0);
}

function argValue(name, fallback) {
  const i = argv.indexOf(name);
  return i !== -1 && argv[i + 1] ? resolve(process.cwd(), argv[i + 1]) : fallback;
}
const sqlitePath = argValue("--sqlite", resolve(process.cwd(), "prisma/db/custom.db"));

const projectRoot = resolve(import.meta.dirname, "..");

// ────────────────────────────── env (.env, read-only, non-overriding) ───

loadEnvFile(join(projectRoot, ".env")); // real env vars always win

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

// ────────────────────────────── node:sqlite (dynamic, friendly error) ───

let DatabaseSync;
try {
  ({ DatabaseSync } = await import("node:sqlite"));
} catch {
  console.error("[Migrate] ❌ node:sqlite is not available in this Node.js runtime.");
  console.error("[Migrate]    Node.js >= 22.13 (LTS) or >= 23.4 ships it enabled by default.");
  console.error("[Migrate]    On Node 22.5–22.12 you can retry with: node --experimental-sqlite <script>");
  process.exit(1);
}

// ────────────────────────────── value coercion ──────────────────────────
// Prisma writes SQLite DateTime values as epoch milliseconds (INTEGER) and
// Booleans as 0/1. Text timestamps are also accepted for robustness.

function toDate(v) {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "number") return new Date(v);
  const s = String(v).trim();
  let d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d;
  // Normalize "2025-01-15 09:30:00.123 +00:00"-style timestamps
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

const COERCE = { string: toStr, bool: toBool, int: toInt, date: toDate };

// ────────────────────────────── table specs ─────────────────────────────
// Every field of every model, mirroring prisma/schema.prisma exactly —
// including nullable strings, Booleans, the `order` integer and all dates.
// SQLite stores field names as-is; PostgreSQL does the same, so no column
// mapping is needed. Only these fields are read and written; anything else
// found in the SQLite file is reported and skipped.

const TABLES = [
  {
    table: "AdminUser",
    model: "adminUser",
    fields: [
      ["id", "string"],
      ["email", "string"],
      ["passwordHash", "string"],
      ["name", "string"],
      ["createdAt", "date"],
      ["updatedAt", "date"],
    ],
    redact: ["passwordHash"],
  },
  {
    table: "Project",
    model: "project",
    fields: [
      ["id", "string"],
      ["title", "string"],
      ["slug", "string"],
      ["shortDescription", "string"],
      ["detailedDescription", "string"],
      ["category", "string"],
      ["categoryTag", "string"],
      ["technologies", "string"],
      ["thumbnail", "string"],
      ["additionalImages", "string"],
      ["githubUrl", "string"],
      ["liveDemoUrl", "string"],
      ["completionDate", "date"],
      ["featured", "bool"],
      ["published", "bool"],
      ["order", "int"],
      ["impact", "string"],
      ["caseStudyHref", "string"],
      ["createdAt", "date"],
      ["updatedAt", "date"],
    ],
    redact: [],
  },
  {
    table: "ContactMessage",
    model: "contactMessage",
    fields: [
      ["id", "string"],
      ["fullName", "string"],
      ["email", "string"],
      ["message", "string"],
      ["isRead", "bool"],
      ["isArchived", "bool"],
      ["isReplied", "bool"],
      ["createdAt", "date"],
      ["updatedAt", "date"],
    ],
    redact: [],
  },
];

const CHUNK = 100;

// ────────────────────────────── SQLite read (strictly read-only) ────────

if (!existsSync(sqlitePath)) {
  console.error(`[Migrate] ❌ SQLite database not found at: ${sqlitePath}`);
  console.error("[Migrate]    Pass a custom path with --sqlite <path> if it lives elsewhere.");
  process.exit(1);
}

function openSqliteReadOnly(path) {
  try {
    // Preferred: SQLite-level read-only open (Node >= 22.x supports the option).
    // The file is never locked for writing, journals are never created, and the
    // open itself fails rather than creating anything.
    const db = new DatabaseSync(path, { readOnly: true });
    db.exec("PRAGMA query_only = 1"); // belt and braces
    return { db, mode: "readOnly" };
  } catch (err) {
    const msg = String(err?.message || err);
    // Older runtimes without the readOnly option: fall back to a normal open
    // locked down with PRAGMA query_only (still blocks every write).
    if (/readOnly|unknown option|invalid option|ENOVAL|ERR_INVALID_ARG_VALUE/i.test(msg)) {
      const db = new DatabaseSync(path);
      db.exec("PRAGMA query_only = 1");
      console.warn("[Migrate] ⚠️  readOnly open option unavailable — using PRAGMA query_only instead.");
      return { db, mode: "query_only" };
    }
    // A genuinely read-only open failure (missing file, hot journal, lock, …)
    // must NOT fall back to a read-write open: the source file must never be
    // touched, not even for journal recovery.
    throw err;
  }
}

const sqliteFileInfo = statSync(sqlitePath);
const { db: sqlite, mode: sqliteMode } = openSqliteReadOnly(sqlitePath);

const sqliteData = new Map(); // table -> { rows, mapped }

function readTable(spec) {
  const cols = sqlite
    .prepare(`PRAGMA table_info("${spec.table}")`)
    .all()
    .map((c) => c.name);

  const fieldNames = spec.fields.map(([name]) => name);
  const missing = fieldNames.filter((c) => !cols.includes(c));
  if (missing.length) {
    console.error(`[Migrate] ❌ Table ${spec.table} is missing expected columns: ${missing.join(", ")}`);
    console.error(`[Migrate]    Actual columns: ${cols.join(", ")}`);
    process.exit(1);
  }
  const extra = cols.filter((c) => !fieldNames.includes(c));
  if (extra.length) {
    console.warn(
      `[Migrate] ⚠️  Table ${spec.table} has extra column(s) not in the Prisma schema — skipped: ${extra.join(", ")}`
    );
  }

  const select = fieldNames.map((c) => `"${c}"`).join(", ");
  const rows = sqlite.prepare(`SELECT ${select} FROM "${spec.table}"`).all();
  const mapped = rows.map((row) => {
    const data = {};
    for (const [name, type] of spec.fields) data[name] = COERCE[type](row[name]);
    return data;
  });
  return { rows, mapped };
}

for (const spec of TABLES) {
  sqliteData.set(spec.table, readTable(spec));
}

console.log(`[Migrate] SQLite source (read-only, mode: ${sqliteMode}):`);
for (const spec of TABLES) {
  console.log(`  ${spec.table.padEnd(16)} ${sqliteData.get(spec.table).rows.length} rows`);
}

// ────────────────────────────── dry run (zero PostgreSQL access) ────────
// This block exits BEFORE the Prisma Client is imported, so --dry-run is
// structurally incapable of touching PostgreSQL: no connection, no writes.

if (DRY_RUN) {
  console.log("\n[Migrate] --dry-run: PostgreSQL is never contacted. Sample of the first row per table");
  console.log("[Migrate] (sensitive values redacted):");
  for (const spec of TABLES) {
    const { mapped } = sqliteData.get(spec.table);
    console.log(`\n  ${spec.table}:`);
    if (!mapped.length) {
      console.log("    (empty)");
      continue;
    }
    for (const [k, v] of Object.entries(mapped[0])) {
      const value = spec.redact.includes(k) ? "***redacted***" : v;
      const shown =
        typeof value === "string" && value.length > 60 ? `${value.slice(0, 57)}…` : value;
      console.log(`    ${k.padEnd(20)} ${shown}`);
    }
  }
  console.log("\n[Migrate] ✅ Dry run complete — nothing was written anywhere.");
  console.log("[Migrate]    Remove --dry-run to perform the migration.");
  process.exit(0);
}

// ────────────────────────────── PostgreSQL (write or verify) ────────────

const { PrismaClient } = await import("@prisma/client");
const prisma = new PrismaClient();

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function migrateTable(spec) {
  const { rows, mapped } = sqliteData.get(spec.table);
  let done = 0;
  const t0 = Date.now();
  for (const group of chunk(mapped, CHUNK)) {
    const ops = group.map((data) => {
      const { id, ...rest } = data;
      // Upsert by id: insert if missing, otherwise refresh the row to match
      // SQLite exactly. Never deletes; rows that exist only in PostgreSQL are
      // left untouched. Explicit id/timestamps preserve source values.
      return prisma[spec.model].upsert({ where: { id }, update: rest, create: data });
    });
    await prisma.$transaction(ops);
    done += group.length;
    console.log(`  ${spec.table}: ${done}/${rows.length}`);
  }
  console.log(`  ${spec.table} done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

// Compare one field of one row. Dates are compared by epoch milliseconds,
// everything else with strict equality. `null` matches only `null`.
function fieldEquals(type, a, b) {
  if (type === "date") {
    const ta = a instanceof Date ? a.getTime() : a == null ? null : new Date(a).getTime();
    const tb = b instanceof Date ? b.getTime() : b == null ? null : new Date(b).getTime();
    return Object.is(ta, tb);
  }
  return Object.is(a, b);
}

async function verify() {
  const problems = { missing: 0, mismatched: 0 };

  console.log("\n[Migrate] ── Verification (SQLite source → PostgreSQL destination) ──");
  console.log(
    "  Table              SQLite   PostgreSQL   Missing-in-PG   PG-only(extra)   Content-mismatch"
  );

  for (const spec of TABLES) {
    const { mapped } = sqliteData.get(spec.table);
    const srcById = new Map(mapped.map((r) => [r.id, r]));
    const pgRows = await prisma[spec.model].findMany();
    const pgById = new Map(pgRows.map((r) => [r.id, r]));

    const missing = mapped.filter((r) => !pgById.has(r.id)).map((r) => r.id);
    const extra = [...pgById.keys()].filter((id) => !srcById.has(id));

    const mismatchDetails = [];
    let mismatched = 0;
    for (const [id, src] of srcById) {
      const dest = pgById.get(id);
      if (!dest) continue;
      const differing = [];
      for (const [name, type] of spec.fields) {
        if (!fieldEquals(type, src[name], dest[name])) differing.push(name);
      }
      if (differing.length) {
        mismatched += 1;
        if (mismatchDetails.length < 5) mismatchDetails.push({ id, differing, src, dest });
      }
    }

    problems.missing += missing.length;
    problems.mismatched += mismatched;

    console.log(
      `  ${spec.table.padEnd(18)} ${String(mapped.length).padStart(6)} ${String(pgRows.length).padStart(12)} ` +
        `${String(missing.length).padStart(15)} ${String(extra.length).padStart(16)} ${String(mismatched).padStart(17)}`
    );
    for (const id of missing) console.log(`    ↳ MISSING in PostgreSQL: ${id}`);
    const fmtValue = (field, v) => {
      if (spec.redact.includes(field)) return "<redacted>";
      if (v instanceof Date) return v.toISOString();
      return JSON.stringify(v);
    };
    for (const d of mismatchDetails) {
      const fields = d.differing
        .map((f) => `${f} (source=${fmtValue(f, d.src[f])}, dest=${fmtValue(f, d.dest[f])})`)
        .join(", ");
      console.log(`    ↳ DIFFERS in PostgreSQL: ${d.id} → ${fields}`);
    }
    if (extra.length > 0) {
      console.log(
        `    ℹ️  ${extra.length} PostgreSQL-only row(s) kept as-is (never deleted): ${extra.slice(0, 5).join(", ")}${extra.length > 5 ? " …" : ""}`
      );
    }
  }

  console.log("");
  if (problems.missing === 0 && problems.mismatched === 0) {
    const total = TABLES.reduce((n, s) => n + sqliteData.get(s.table).mapped.length, 0);
    console.log(`[Migrate] ✅ Verification passed — all ${total} source rows exist in PostgreSQL with`);
    console.log("[Migrate]    identical field values (compared field-by-field, not just counts).");
    console.log("[Migrate]    PostgreSQL-only rows, if any, are reported above and were kept.");
    return true;
  }
  console.log("[Migrate] ❌ Verification FAILED:");
  if (problems.missing) console.log(`[Migrate]    - ${problems.missing} row(s) missing in PostgreSQL`);
  if (problems.mismatched) console.log(`[Migrate]    - ${problems.mismatched} row(s) with differing field values`);
  return false;
}

try {
  if (VERIFY_ONLY) {
    console.log(`[Migrate] --verify-only: read-only comparison against ${redact(dbUrl)}`);
    const ok = await verify();
    process.exitCode = ok ? 0 : 1;
  } else {
    console.log(`\n[Migrate] Writing to PostgreSQL: ${redact(dbUrl)}`);
    console.log("[Migrate] Upsert-only — nothing will be deleted.\n");
    const t0 = Date.now();
    for (const spec of TABLES) {
      await migrateTable(spec);
    }
    console.log(`\n[Migrate] Copy finished in ${((Date.now() - t0) / 1000).toFixed(1)}s.`);

    const ok = await verify();
    process.exitCode = ok ? 0 : 1;
  }
} catch (err) {
  console.error("\n[Migrate] ❌ Migration failed:", err?.message || err);
  console.error("[Migrate]    Nothing was deleted; already-migrated rows are kept (re-run to resume).");
  process.exitCode = 1;
} finally {
  await prisma.$disconnect().catch(() => {});
}
