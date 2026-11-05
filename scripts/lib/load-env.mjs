import { existsSync, readFileSync } from "node:fs";

/**
 * Minimal, dependency-free .env loader shared by the database scripts.
 *
 * Behaviour:
 *   - Ignores blank lines and full-line comments (# ...).
 *   - Supports an optional `export ` prefix.
 *   - Supports single/double-quoted values; an inline comment after the
 *     closing quote is dropped ("KEY=value" # comment).
 *   - Strips inline comments (# ...) from UNQUOTED values.
 *   - Values may contain "=" (e.g. base64 secrets with padding).
 *   - Double-quoted values understand \\n, \\r, \\" and \\\\ escapes.
 *   - By default it NEVER overrides variables that already exist in
 *     process.env — real environment variables always win over .env.
 *
 * It only READS the file; it never writes to disk.
 */
export function loadEnvFile(filePath, { override = false } = {}) {
  if (!existsSync(filePath)) return 0;
  const text = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  let applied = 0;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const m = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;

    const key = m[1];
    let value = m[2].trim();
    const first = value[0];

    if (first === '"' || first === "'") {
      // Walk the value, honouring the closing quote and (for double quotes)
      // the escapes \\n \\r \\" and \\\\ — an escaped quote does NOT close
      // the value (e.g. ESC="say \"hi\"\n").
      let out = "";
      let i = 1;
      while (i < value.length) {
        const ch = value[i];
        if (first === '"' && ch === "\\" && i + 1 < value.length) {
          const next = value[i + 1];
          if (next === '"') out += '"';
          else if (next === "n") out += "\n";
          else if (next === "r") out += "\r";
          else if (next === "\\") out += "\\";
          else out += ch + next;
          i += 2;
          continue;
        }
        if (ch === first) break; // closing quote — rest (inline comment) is dropped
        out += ch;
        i += 1;
      }
      value = out;
    } else {
      const hash = value.indexOf(" #");
      if (hash !== -1) value = value.slice(0, hash).trim();
    }

    if (!override && process.env[key] !== undefined) continue;
    process.env[key] = value;
    applied += 1;
  }

  return applied;
}
