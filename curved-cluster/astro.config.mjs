// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://lec-media.agency",
  outDir: "./dist",
  publicDir: "./public",
  integrations: [
    icon({
      include: {
        tabler: ["*"], // Pour inclure toutes les icônes Tabler
      },
    }),
  ],
  output: "static",
  adapter: netlify(),
  trailingSlash: "never",
  build: {
    format: "directory",
  },
});
