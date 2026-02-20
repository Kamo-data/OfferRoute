import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

/**
 * Vite config - OfferRoute
 * - Proxy /api => Azure Functions local (http://localhost:7071)
 * - PWA manifest (installable)
 */
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // En dev, la PWA est parfois désactivée; on la force si besoin
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "robots.txt"],
      manifest: {
        name: "OfferRoute",
        short_name: "OfferRoute",
        description: "Recherche d'offres et suivi de candidatures",
        lang: "fr",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // Par défaut, on cache juste les assets; on évite de casser les appels API
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],

  // Dev server
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    proxy: {
      // Toute requête /api/* ira vers l'API Functions en local
      "/api": {
        target: "http://localhost:7071",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Preview après build (npm run preview)
  preview: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
  },

  build: {
    outDir: "dist",
    sourcemap: true,
  },
});