/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      manifest: {
        name: "Paravel",
        short_name: "Paravel",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/vite.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
        ],
      },
      injectRegister: "auto",
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
      },
      // devOptions: {
      //   enabled: true,
      // },
    }),
    react(),
  ],
  test: {
    environment: "jsdom",
    // setupFiles: ["./tests/setup.ts"],
    // testMatch: ["./tests/**/*.test.tsx"],
    globals: true,
  },
  server: {
    port: 3000,
    proxy: {
      "/api-server/": "...",
      "/authorization/": "...",
    },
  },

  build: {
    outDir: "build",
  },
});
