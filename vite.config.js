import { copyFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, "src", "assets");
const publicDir = join(__dirname, "public");

const PROJECT_IMAGE_SOURCES = [
  ["D:/Downloads/evently.png", "evently-ai.png"],
  ["D:/Downloads/breed.png", "breed-perfumes.png"],
  ["D:/Downloads/psync.png", "pocketsync.png"],
  ["D:/Downloads/cy.png", "cy.png"],
];

function copyProjectImages() {
  return {
    name: "copy-project-images",
    buildStart() {
      for (const [src, filename] of PROJECT_IMAGE_SOURCES) {
        if (!existsSync(src)) continue;
        mkdirSync(assetsDir, { recursive: true });
        mkdirSync(publicDir, { recursive: true });
        copyFileSync(src, join(assetsDir, filename));
        copyFileSync(src, join(publicDir, filename));
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [copyProjectImages(), react()],
  server: {
    proxy: {
      "/api": {
        target: "https://portfolio-2024-pq5d.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
