// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  appType: "spa",
  server: {
    host: true, // 👈 Add this line to allow external access (e.g., from your phone)
    port: 5173, // Optional: explicitly set port (default is 5173)
    proxy: {
      "/student/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/course/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/teacher/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/notes/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/playlist/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/admin/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
    // historyApiFallback: true,
  },
  plugins: [react()],
});
