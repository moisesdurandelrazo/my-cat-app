import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api-cat": {
                target: "https://catfact.ninja",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api-cat/, ""),
            },
            "/api-user": {
                target: "https://randomuser.me",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api-user/, ""),
            },
        },
    },
});
