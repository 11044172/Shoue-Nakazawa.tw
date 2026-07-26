import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const base = "/Shoue-Nakazawa.tw/";
const required = [
  "index.html", "404.html", "robots.txt", "sitemap-index.xml",
  "ja/index.html", "zh-tw/index.html", "en/index.html",
  "ja/projects/index.html", "ja/projects/rentflow-ai/index.html",
  "ja/story/index.html", "ja/memories/index.html", "ja/achievements/index.html",
  "zh-tw/projects/index.html", "en/projects/index.html"
];
const errors = required.filter((file) => !fs.existsSync(path.join(dist, file))).map((file) => `不足: dist/${file}`);
const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "legacy") walk(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(full);
  }
};
if (fs.existsSync(dist)) walk(dist);
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  if (file !== path.join(dist, "404.html") && !html.includes('name="description"')) errors.push(`${path.relative(root,file)}: descriptionなし`);
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|#|data:)/.test(ref)) continue;
    if (ref.startsWith("/") && !ref.startsWith(base)) errors.push(`${path.relative(root,file)}: base外参照 ${ref}`);
    if (!ref.startsWith(base)) continue;
    const clean = ref.slice(base.length).split(/[?#]/)[0];
    if (!clean) continue;
    const candidate = path.join(dist, clean);
    const exists = fs.existsSync(candidate) || fs.existsSync(path.join(candidate, "index.html"));
    if (!exists) errors.push(`${path.relative(root,file)}: 壊れた内部参照 ${ref}`);
  }
  if (/tel:/.test(html)) errors.push(`${path.relative(root,file)}: 電話番号リンクが含まれています`);
}
if (errors.length) { console.error([...new Set(errors)].join("\n")); process.exit(1); }
console.log(`Built-site validation passed (${htmlFiles.length} HTML files).`);
