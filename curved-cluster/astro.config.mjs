// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

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
    sitemap({
      // Pages supplémentaires à inclure dans le sitemap
      customPages: [
        "https://lec-media.agency/index.html",
        "https://lec-media.agency/an_carte.html",
        "https://lec-media.agency/calc.html",
        "https://lec-media.agency/calculateur.html",
        "https://lec-media.agency/les-blogs.html",
        // Ajoutez ici toutes vos pages HTML statiques
        // Blogs
        "https://lec-media.agency/Blogs/contenus/15-outils-marketing-incontournables-en-2024.html",
        "https://lec-media.agency/Blogs/contenus/Guide-Ultime-Obtenir-Subvention-PCAN-en-un-Clic.html",
        "https://lec-media.agency/Blogs/contenus/Reussir-en-ecommerce-en-2024.html",
        "https://lec-media.agency/Blogs/contenus/comment-creer-bundles-amazon-shopify-gratuitement.html",
        "https://lec-media.agency/Blogs/contenus/conseil-choisir-cms.html",
        "https://lec-media.agency/Blogs/contenus/l-agence-montreal-boutique-en-ligne.html",
        "https://lec-media.agency/Blogs/contenus/le-pouvoir-du-branding.html",
        "https://lec-media.agency/Blogs/contenus/marque-distinctive-cle-du-succes.html",
        "https://lec-media.agency/Blogs/contenus/optimisez-votre-boutique-en-ligne-CRO.html",
        // Réalisations
        "https://lec-media.agency/Realisations/Arico.html",
        "https://lec-media.agency/Realisations/Crochetmilie.html",
        "https://lec-media.agency/Realisations/nos-realisations.html",
        // Leads
        "https://lec-media.agency/Leads/dashboard.html",
        "https://lec-media.agency/Leads/leads-connexion.html",
      ],
      // Configuration optionnelle
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  output: "static",
  adapter: netlify(),
  trailingSlash: "never",
  build: {
    format: "directory",
  },
});
