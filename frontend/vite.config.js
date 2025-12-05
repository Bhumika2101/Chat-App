import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiUrl = env.VITE_API_URL || "http://localhost:8000";

  return {
    plugins: [react()],
    // base:"/vite-deploy/",
    server: {
      port: 5173,
      proxy: {
        "/socket.io": {
          target: apiUrl,
          changeOrigin: true,
          ws: true,
        },
        "/api": {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
