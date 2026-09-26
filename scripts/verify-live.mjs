#!/usr/bin/env node
/**
 * FRONTIER-05-TESTS-ALL-REPOS — smallest real check for this repo: every
 * VentureNode in src/data/ventures.ts (the single source of truth per
 * ADDING-A-PROJECT.md) references a logo file that actually exists under
 * public/, and every live `href` is a well-formed https URL. No network
 * calls, no build step required — this is a static parse of the data file,
 * catching the most common mistake when adding a new venture (forgetting to
 * drop the logo file in place, or a typo'd path).
 *
 * Usage: node scripts/verify-live.mjs [--root <dir>]
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const argRootIdx = process.argv.indexOf("--root");
const root =
  argRootIdx !== -1 && process.argv[argRootIdx + 1]
    ? resolve(process.argv[argRootIdx + 1])
    : resolve(__dirname, "..");

const failures = [];
let checks = 0;
function check(label, ok) {
  checks += 1;
  if (!ok) failures.push(label);
}

const dataPath = join(root, "src/data/ventures.ts");
if (!existsSync(dataPath)) {
  console.error(`FAIL: ${dataPath} does not exist`);
  process.exit(1);
}
const src = readFileSync(dataPath, "utf8");

// logo: "/logos/xyz.svg"
const logoRe = /logo:\s*"([^"]+)"/g;
let m;
const logos = [];
while ((m = logoRe.exec(src))) logos.push(m[1]);
check("ventures.ts declares at least one logo", logos.length > 0);
for (const logo of logos) {
  check(
    `logo path "${logo}" starts with /logos/`,
    logo.startsWith("/logos/")
  );
  check(
    `logo file exists on disk for "${logo}"`,
    existsSync(join(root, "public", logo.replace(/^\//, "")))
  );
}

// href: "https://..."  (skip href: null / omitted entries)
const hrefRe = /href:\s*"([^"]+)"/g;
const hrefs = [];
while ((m = hrefRe.exec(src))) hrefs.push(m[1]);
for (const href of hrefs) {
  let ok = false;
  try {
    const url = new URL(href);
    ok = url.protocol === "https:";
  } catch {
    ok = false;
  }
  check(`href "${href}" is a well-formed https URL`, ok);
}

// /projects glossary page exists (README/ADDING-A-PROJECT.md promise it auto-updates)
check(
  "src/app/projects page exists",
  existsSync(join(root, "src/app/projects/page.tsx")) ||
    existsSync(join(root, "src/app/projects/page.ts"))
);

console.log(`verify-live: ${checks} checks run, ${failures.length} failed.`);
if (failures.length > 0) {
  for (const f of failures) console.error(`  FAIL: ${f}`);
  process.exit(1);
}
console.log("verify-live: all checks passed.");
