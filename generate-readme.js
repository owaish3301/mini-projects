const fs = require("fs");
const path = require("path");

const ROOT_DIR = process.cwd();
const MAIN_README = path.join(ROOT_DIR, "README.md");

// Regex to detect live site links
const LIVE_LINK_REGEX =
  /(https?:\/\/[^\s]+(?:github\.io|netlify\.app|vercel\.app)[^\s]*)/i;

// Get all top-level directories
const folders = fs
  .readdirSync(ROOT_DIR, { withFileTypes: true })
  .filter(
    (dirent) =>
      dirent.isDirectory() &&
      !dirent.name.startsWith(".") &&
      dirent.name !== "node_modules"
  )
  .map((dirent) => dirent.name)
  .sort((a, b) => a.localeCompare(b));

// Build table rows
const rows = folders.map((folder, index) => {
  const projectReadme = path.join(ROOT_DIR, folder, "README.md");
  let liveLink = "❌";

  if (fs.existsSync(projectReadme)) {
    const content = fs.readFileSync(projectReadme, "utf8");
    const match = content.match(LIVE_LINK_REGEX);
    if (match) {
      liveLink = `🔗 [Live](${match[0]})`;
    }
  }

  return `| ${index + 1} | ${folder} | HTML, CSS, JS | ${liveLink} | 📂 [Code](./${folder}) |`;
});

// Full table
const table = `
## 📌 Projects Overview

| # | Project Name | Tech Stack | Live Demo | Source Code |
|---|-------------|------------|-----------|-------------|
${rows.join("\n")}
`;

// Read main README
let mainReadme = fs.readFileSync(MAIN_README, "utf8");

// Replace existing Projects Overview section
const sectionRegex =
  /## 📌 Projects Overview[\s\S]*?(?=\n---|\n## |\s*$)/;

if (sectionRegex.test(mainReadme)) {
  mainReadme = mainReadme.replace(sectionRegex, table.trim());
} else {
  mainReadme += "\n\n" + table;
}

// Write updated README
fs.writeFileSync(MAIN_README, mainReadme);

console.log("✅ README updated successfully!");
