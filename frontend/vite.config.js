// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    appType: "spa",
    server: {
      proxy: {
        "/student/": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
        "/course/": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
        "/teacher/": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
        "/notes/": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
        "/playlist/": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
        "/admin/": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
  };
});
