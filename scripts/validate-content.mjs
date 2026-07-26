import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

const root = process.cwd();
const errors = [];
const contentDirectories = ["experience", "education", "projects", "timeline", "memories", "achievements"];
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const parseFrontmatter = (file) => {
  const source = fs.readFileSync(file, "utf8");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error("YAML frontmatter がありません");
  return parse(match[1]);
};

for (const directory of contentDirectories) {
  const full = path.join(root, "src/content", directory);
  for (const name of fs.readdirSync(full).filter((item) => item.endsWith(".md"))) {
    const file = path.join(full, name);
    try {
      const data = parseFrontmatter(file);
      for (const key of ["published", "featured", "order"]) {
        if (!(key in data)) errors.push(`${file}: ${key} がありません`);
      }
      if (!data.title?.ja && !data.title?.zhTw && !data.title?.en) errors.push(`${file}: 全言語のタイトルが空です`);
      const images = [data.image, ...(data.gallery || [])].filter(Boolean);
      for (const image of images) {
        if (!image.startsWith("/assets/images/")) errors.push(`${file}: 画像パスが /assets/images/ 配下ではありません: ${image}`);
        const diskPath = path.join(root, "public", image.replace(/^\//, ""));
        if (!fs.existsSync(diskPath)) errors.push(`${file}: 画像が見つかりません: ${image}`);
        if (data.published && imageExtensions.has(path.extname(image).toLowerCase()) && data.image === image && !Object.values(data.imageAlt || {}).some(Boolean)) {
          errors.push(`${file}: 公開メイン画像のaltがありません`);
        }
      }
    } catch (error) {
      errors.push(`${file}: ${error.message}`);
    }
  }
}

for (const file of ["site.json", "profile.json", "skills.json", "languages.json", "social-links.json", "interests.json"]) {
  try { JSON.parse(fs.readFileSync(path.join(root, "src/data", file), "utf8")); }
  catch (error) { errors.push(`src/data/${file}: JSONエラー: ${error.message}`); }
}

try { parse(fs.readFileSync(path.join(root, ".pages.yml"), "utf8")); }
catch (error) { errors.push(`.pages.yml: YAMLエラー: ${error.message}`); }
try {
  const workflow = parse(fs.readFileSync(path.join(root, ".github/workflows/deploy.yml"), "utf8"));
  if (!workflow?.jobs?.build || !workflow?.jobs?.deploy) errors.push(".github/workflows/deploy.yml: build/deployジョブが不足");
} catch (error) { errors.push(`.github/workflows/deploy.yml: YAMLエラー: ${error.message}`); }

const textFiles = [
  ...contentDirectories.flatMap((directory) => fs.readdirSync(path.join(root, "src/content", directory)).map((file) => path.join(root, "src/content", directory, file))),
  ...fs.readdirSync(path.join(root, "src/data")).map((file) => path.join(root, "src/data", file))
];
const secretPattern = /(ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,}|BEGIN [A-Z ]*PRIVATE KEY|password\s*[:=]\s*["'][^"']+)/i;
for (const file of textFiles) if (secretPattern.test(fs.readFileSync(file, "utf8"))) errors.push(`${file}: 秘密情報の可能性がある文字列を検出`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Content validation passed.");
