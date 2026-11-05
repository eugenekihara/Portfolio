import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, join } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");

/**
 * Locate the standalone build root (the directory containing server.js).
 * Next.js <= 15.3 emits .next/standalone/server.js directly; newer versions
 * may nest the output under the workspace-relative project path, e.g.
 * .next/standalone/my-app/server.js or .next/standalone/org/app/server.js.
 */
function findStandaloneRoot() {
  const base = join(projectRoot, ".next", "standalone");
  if (existsSync(join(base, "server.js"))) return base;

  const queue = [base];
  while (queue.length) {
    const dir = queue.shift();
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      continue;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      let isDir = false;
      try {
        isDir = statSync(full).isDirectory();
      } catch {
        continue;
      }
      if (!isDir) {
        if (entry === "server.js") return dir;
        continue;
      }
      if (entry === "node_modules") continue; // never scan node_modules
      queue.push(full);
    }
  }
  return base; // fall back to the classic layout
}

// Copy static assets next to the standalone server.js (self-hosting only).
// NOTE: the database is PostgreSQL accessed via environment variables at
// runtime (DATABASE_URL / DIRECT_URL). No database file is bundled and no
// .env is written into the build anymore — secrets come from the environment.
const standaloneRoot = findStandaloneRoot();
console.log(`Standalone root: ${standaloneRoot.replace(projectRoot, ".")}`);

const copies = [
  [join(projectRoot, ".next/static"), join(standaloneRoot, ".next/static")],
  [join(projectRoot, "public"), join(standaloneRoot, "public")],
];

for (const [src, dst] of copies) {
  if (!existsSync(src)) {
    console.log(`Skipping ${src.replace(projectRoot, ".")} (not found)`);
    continue;
  }
  mkdirSync(dirname(dst), { recursive: true });
  cpSync(src, dst, { recursive: true, force: true });
  console.log(`Copied ${src.replace(projectRoot, ".")} -> ${dst.replace(projectRoot, ".")}`);
}

console.log("Standalone assets copied.");
