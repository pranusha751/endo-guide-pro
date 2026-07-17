import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// Force native Vercel build
process.env.NITRO_PRESET = "vercel";

export default defineConfig({
  plugins: [
    tanstackStart(),
    react(),
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "pwa-192x192.png", "pwa-512x512.png"],
      manifest: {
        name: "Endo Guide Pro",
        short_name: "EndoGuide",
        description: "Your digital endodontic workflow manager",
        theme_color: "#10b981",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
