import { copyFileSync, existsSync, mkdirSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const copies = [
  ["D:\\Downloads\\evently.png", join(root, "src", "assets", "evently-ai.png")],
  ["D:\\Downloads\\breed.png", join(root, "src", "assets", "breed-perfumes.png")],
  ["D:\\Downloads\\psync.png", join(root, "src", "assets", "pocketsync.png")],
  ["D:\\Downloads\\cy.png", join(root, "src", "assets", "cy.png")],
  ["D:\\Downloads\\evently.png", join(root, "public", "evently-ai.png")],
  ["D:\\Downloads\\breed.png", join(root, "public", "breed-perfumes.png")],
  ["D:\\Downloads\\psync.png", join(root, "public", "pocketsync.png")],
  ["D:\\Downloads\\cy.png", join(root, "public", "cy.png")],
];

let copied = 0;

for (const [src, dest] of copies) {
  if (!existsSync(src)) {
    console.warn(`Skipping missing source: ${src}`);
    continue;
  }
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  const { size } = statSync(dest);
  console.log(`Copied ${dest} (${size} bytes)`);
  copied += 1;
}

if (copied === 0) {
  console.error("No project images were copied.");
  process.exit(1);
}