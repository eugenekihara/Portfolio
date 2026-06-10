import { mkdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { execSync } from "node:child_process";

// Compute the absolute path to the database file
// This ensures prisma CLI and Prisma Client use the SAME file
const projectRoot = resolve(import.meta.dirname, "..");
const dbDir = join(projectRoot, "db");
const dbFile = join(dbDir, "custom.db");
const dbUrl = `file:${dbFile}`;

console.log(`[Setup DB] Project root: ${projectRoot}`);
console.log(`[Setup DB] Database path: ${dbFile}`);
console.log(`[Setup DB] DATABASE_URL: ${dbUrl}`);

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
  console.log(`[Setup DB] ✅ Database synced successfully`);
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
