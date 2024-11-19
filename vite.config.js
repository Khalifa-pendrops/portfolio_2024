import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://portfolio-2024-pq5d.onrender.com/api/message",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});


