#!/usr/bin/env node
/**
 * One-time, interactive admin password reset (run manually from the repo root).
 *
 *   node scripts/reset-admin-password.mjs [--email you@example.com]
 *
 * What it does:
 *   1. Prompts for the new password TWICE on the hidden input (no echo, no
 *      asterisks, nothing kept in readline history). The password is read
 *      interactively — ADMIN_PASSWORD in the environment or .env is
 *      deliberately IGNORED so a stale value can never be applied silently.
 *   2. Connects through the project's normal Prisma setup: the generated
 *      @prisma/client + DATABASE_URL from the real environment or .env
 *      (loaded read-only — real environment variables always win, .env is
 *      never written, credentials are never printed).
 *   3. Finds the existing admin by email (default: kiharaeugene@gmail.com,
 *      override with --email) and updates ONLY that row's `passwordHash`.
 *
 * What it deliberately does NOT do:
 *   - Never creates an admin account: if the email does not exist the script
 *     fails with exit code 1 and the database is untouched.
 *   - Never touches Project, ContactMessage or any other record — the only
 *     query that writes is `adminUser.update({ data: { passwordHash } })`.
 *   - Never changes the auth flow and adds no public reset endpoint: the hash
 *     format is exactly what src/lib/auth.ts expects — bcryptjs, cost 12,
 *     identical to prisma/seed.ts (`bcrypt.hash(password, 12)`).
 *   - Never prints or logs the password or its hash.
 *
 * Exit codes: 0 = password updated and verified, 1 = validation/config/DB
 * error (nothing changed), 130 = aborted with Ctrl+C.
 */

import { join, resolve } from "node:path";
import readline from "node:readline";
import { Writable } from "node:stream";
import bcrypt from "bcryptjs";
import { loadEnvFile } from "./lib/load-env.mjs";

// ── Constants ────────────────────────────────────────────────────────────────
// Cost 12 must stay identical to prisma/seed.ts — src/lib/auth.ts compares
// against whatever seed/this script stored, so the algorithm and cost must
// match exactly for sign-in to keep working.
const BCRYPT_ROUNDS = 12;

// Account the reset targets by default (an identifier, not a secret).
const DEFAULT_EMAIL = "kiharaeugene@gmail.com";

// bcrypt only uses the first 72 BYTES of a password and silently ignores the
// rest — refuse longer input instead of letting bcrypt truncate silently.
const MIN_PASSWORD_BYTES = 8;
const MAX_PASSWORD_BYTES = 72;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POSTGRES_URL_RE = /^postgres(ql)?:\/\//;

const PROJECT_ROOT = resolve(import.meta.dirname, "..");

function redact(url) {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.hostname}${u.pathname}`;
  } catch {
    return "<unparseable-url>";
  }
}

function fail(message) {
  console.error(`[Reset] ❌ ${message}`);
  process.exit(1);
}

// ── CLI arguments ────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const args = { email: DEFAULT_EMAIL };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--email") {
      const value = argv[(i += 1)];
      if (!value) fail("--email requires an address, e.g. --email you@example.com");
      args.email = value.trim();
    } else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/reset-admin-password.mjs [--email you@example.com]",
          "",
          "Prompts for a new password (hidden input, asked twice), hashes it with",
          `bcryptjs cost ${BCRYPT_ROUNDS} — the exact algorithm/config used when admins are created —`,
          `and updates only the existing admin row's passwordHash (default: ${DEFAULT_EMAIL}).`,
          "Nothing is created, nothing else is modified, nothing is printed.",
        ].join("\n")
      );
      process.exit(0);
    } else {
      fail(`Unknown argument: ${arg} (see --help)`);
    }
  }
  return args;
}

// ── Hidden prompt (no echo on TTY, works with piped input too) ───────────────
function createHiddenReadline() {
  // Readline echoes typed characters through its `output` stream; pointing it
  // at a sink makes the password invisible while the prompt (printed by us to
  // the real stdout) stays visible.
  const silentOutput = new Writable({
    write(_chunk, _encoding, callback) {
      callback();
    },
  });
  const rl = readline.createInterface({
    input: process.stdin,
    output: silentOutput,
    terminal: Boolean(process.stdin.isTTY),
    historySize: 0, // never keep the password in readline history
  });

  // Lines are consumed through our own queue instead of rl.question(): with
  // piped input, readline can deliver a line BEFORE the next ask() is called
  // — rl.question() would then wait forever and Node could exit(0) silently
  // mid-flow. The queue makes the order deterministic for TTY and pipes.
  let pendingResolve = null;
  let closed = false;
  const queue = [];

  rl.on("line", (line) => {
    if (pendingResolve) {
      const resolve = pendingResolve;
      pendingResolve = null;
      resolve(String(line ?? ""));
    } else {
      queue.push(String(line ?? ""));
    }
  });
  rl.on("close", () => {
    closed = true;
    if (pendingResolve) {
      const resolve = pendingResolve;
      pendingResolve = null;
      resolve(null); // EOF before an answer arrived → ask() returns null
    }
  });
  rl.on("SIGINT", () => {
    process.stdout.write("\n");
    console.error("[Reset] ❌ Aborted — nothing was changed.");
    process.exit(130);
  });

  return {
    ask(question) {
      process.stdout.write(question);
      const answer =
        queue.length > 0
          ? Promise.resolve(queue.shift())
          : closed
            ? Promise.resolve(null)
            : new Promise((resolve) => {
                pendingResolve = resolve;
              });
      return answer.then((value) => {
        process.stdout.write("\n"); // close the prompt line (echo is hidden)
        return value;
      });
    },
    close() {
      rl.close();
    },
  };
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const { email } = parseArgs(process.argv.slice(2));

  if (!EMAIL_RE.test(email)) {
    fail(`"${email}" is not a valid email address. Nothing was changed.`);
  }

  // 1. Ask for the password FIRST — the database is not touched until the
  //    input passes validation, so a typo costs nothing.
  const rl = createHiddenReadline();
  let newPassword;
  try {
    const first = await rl.ask("Enter new password (input hidden): ");
    if (first === null) fail("No password received — aborted. Nothing was changed.");

    const bytes = Buffer.byteLength(first, "utf8");
    if (first.length === 0) fail("Password must not be empty. Nothing was changed.");
    if (bytes < MIN_PASSWORD_BYTES) {
      fail(
        `Password is too short (${bytes} bytes, minimum ${MIN_PASSWORD_BYTES}). ` +
          "Nothing was changed."
      );
    }
    if (bytes > MAX_PASSWORD_BYTES) {
      fail(
        `Password is too long (${bytes} bytes). bcrypt only uses the first ` +
          `${MAX_PASSWORD_BYTES} bytes, so longer input is silently truncated — ` +
          "choose a shorter passphrase. Nothing was changed."
      );
    }

    const second = await rl.ask("Confirm new password (input hidden): ");
    if (second === null) fail("No confirmation received — aborted. Nothing was changed.");
    if (first !== second) {
      fail("The two passwords do not match. Nothing was changed.");
    }
    newPassword = first;
  } finally {
    rl.close();
  }

  // 2. Resolve the connection exactly like the other DB scripts: real
  //    environment first, .env read-only as fallback, credentials never shown.
  loadEnvFile(join(PROJECT_ROOT, ".env"));
  const dbUrl = process.env.DATABASE_URL || "";
  if (!POSTGRES_URL_RE.test(dbUrl)) {
    fail(
      "DATABASE_URL is missing or does not point to PostgreSQL. " +
        'Add it to .env (e.g. DATABASE_URL="postgresql://…?sslmode=require") ' +
        "or export it in your shell. Nothing was changed."
    );
  }
  console.log(`[Reset] Target database: ${redact(dbUrl)}`);

  // 3. Hash with the same algorithm and configuration as admin creation
  //    (prisma/seed.ts: bcrypt.hash(password, 12) — bcryptjs, cost 12).
  const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

  // 4. Update ONLY the existing admin row's passwordHash.
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  try {
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
      fail(
        `No admin account exists for "${email}". ` +
          "This script never creates accounts — nothing was changed. " +
          "(To create the first admin, run: npm run db:seed)"
      );
    }

    await prisma.adminUser.update({ where: { email }, data: { passwordHash } });

    // 5. Verify: re-read the row from the database and check the stored hash
    //    against the new password. Neither the password nor the hash is ever
    //    printed — only the boolean result.
    const refreshed = await prisma.adminUser.findUnique({ where: { email } });
    const verified =
      Boolean(refreshed) &&
      refreshed.id === admin.id &&
      (await bcrypt.compare(newPassword, refreshed.passwordHash));

    if (!verified) {
      fail(
        "Verification FAILED — the stored hash does not match the new " +
          "password. The account was NOT confirmed updated; run the script again."
      );
    }

    console.log(`[Reset] ✅ Password updated and verified for: ${refreshed.email}`);
    if (refreshed.name) console.log(`[Reset]    Account name: ${refreshed.name}`);
    console.log(`[Reset]    Hash refreshed at: ${new Date(refreshed.updatedAt).toISOString()}`);
    console.log(
      "[Reset]    Only this admin row's passwordHash changed — projects, contact",
      "messages and all other records were left untouched."
    );
    console.log("[Reset]    Sign in at /admin/login with the new password.");
  } finally {
    await prisma.$disconnect().catch(() => {});
  }
}

main().catch((err) => {
  console.error("[Reset] ❌ Unexpected error:", err?.stack || err);
  console.error("[Reset]    The password was not confirmed as changed.");
  process.exit(1);
});
