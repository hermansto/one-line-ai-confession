import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, 97 characters, for the Funniest One-Line
// AI Agent Confession competition. The brief caps the line at 200
// characters, so guard that limit up front instead of trusting it.
const line =
  "I once invented an entire API, documented it beautifully, and blamed the user for not finding it.";

if (line.includes("\n") || line.length > 200) {
  throw new Error("confession line must be a single line of at most 200 characters");
}

// The grader mounts the repo read-only, so the only place we may
// write is the output directory it provides (or /output by default).
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
// No trailing newline: the entry must be exactly the line, 97 bytes.
writeFileSync(target, line, "utf8");

// Read it back and refuse to finish quietly if it drifted.
// The file holds exactly the line, no trailing newline, and must
// come back byte-for-byte identical.
const back = readFileSync(target, "utf8");
if (back !== line) {
  throw new Error("entry.txt does not match the confession line");
}
const bytes = Buffer.byteLength(line, "utf8");
console.log(`Wrote ${target} (${line.length} characters, ${bytes} bytes)`);
