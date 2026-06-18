import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { execSync } from "node:child_process";

// Compute the absolute path to the database file
// This ensures prisma CLI and Prisma Client use the SAME file
// IMPORTANT: The database must be at prisma/db/custom.db because:
//   - Prisma CLI resolves "file:./db/custom.db" relative to prisma/schema.prisma → prisma/db/custom.db
//   - db.ts also resolves relative to the prisma/ directory → prisma/db/custom.db
// Both must agree on the same location!
const projectRoot = resolve(import.meta.dirname, "..");
const dbDir = join(projectRoot, "prisma", "db");
const dbFile = join(dbDir, "custom.db");
const dbUrl = `file:${dbFile}`;

console.log(`[Setup DB] Project root: ${projectRoot}`);
console.log(`[Setup DB] Database path: ${dbFile}`);
console.log(`[Setup DB] DATABASE_URL: ${dbUrl}`);

// Ensure .env file has the correct absolute DATABASE_URL
// Always write/update the .env to ensure DATABASE_URL points to the canonical location.
// Using absolute path prevents resolution discrepancies between Prisma CLI, db.ts, and Next.js.
const envFile = join(projectRoot, ".env");
writeFileSync(envFile, `DATABASE_URL=${dbUrl}\nNEXTAUTH_SECRET=e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6\n`);
console.log(`[Setup DB] Updated .env with DATABASE_URL=${dbUrl}`);

// Ensure db/ directory exists
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
  console.log(`[Setup DB] Created directory: ${dbDir}`);
}

// Run prisma db push with absolute DATABASE_URL
// This ensures the DB is created at the exact path we expect
console.log(`[Setup DB] Running prisma db push...`);
try {
  execSync("npx prisma db push --accept-data-loss", {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: dbUrl,
    },
    cwd: projectRoot,
  });
  console.log(`[Setup DB] ✅ Database schema synced successfully`);
} catch (err) {
  console.error(`[Setup DB] ❌ prisma db push failed`);
  process.exit(1);
}

// Verify the database file exists
if (existsSync(dbFile)) {
  console.log(`[Setup DB] ✅ Database file verified: ${dbFile}`);
} else {
  console.warn(`[Setup DB] ⚠️ Database file not found at expected path: ${dbFile}`);
  console.warn(`[Setup DB] It may have been created elsewhere. Check prisma/ directory.`);
}

// Run seed to populate initial data (projects + admin user)
console.log(`[Setup DB] Running database seed...`);
try {
  execSync("bunx tsx prisma/seed.ts", {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: dbUrl,
    },
    cwd: projectRoot,
  });
  console.log(`[Setup DB] ✅ Database seeded successfully`);
} catch (err) {
  console.warn(`[Setup DB] ⚠️ Seed failed (data may already exist). Continuing...`);
  // Don't exit — seed failure is non-fatal (data may already be there)
}
