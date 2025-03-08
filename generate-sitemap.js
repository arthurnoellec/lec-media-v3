// Placez ce fichier à la racine de votre projet
const fs = require("fs");
const path = require("path");

// Configuration
const baseUrl = "https://lec-media.agency";
const outputFile = "sitemap.xml";

// Fonction pour explorer récursivement un répertoire et trouver les fichiers HTML
function findHtmlFiles(dir, fileList = [], basePath = "") {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const relativePath = path.join(basePath, file);
    const stat = fs.statSync(filePath);

    // Si c'est un répertoire, explorer récursivement
    if (stat.isDirectory()) {
      // Ignorer certains répertoires
      if (
        !file.startsWith(".") &&
        file !== "node_modules" &&
        file !== "curved-cluster" &&
        file !== "archive"
      ) {
        findHtmlFiles(filePath, fileList, relativePath);
      }
    }
    // Si c'est un fichier HTML
    else if (file.endsWith(".html") && !file.startsWith("XXXX")) {
      // Convertir le chemin du fichier en URL
      const url = `${baseUrl}/${relativePath}`;
      fileList.push(url);
    }
  });

  return fileList;
}

// Fonction pour trouver toutes les pages Astro
function findAstroPages() {
  // Liste des pages Astro déjà connues (basée sur ce que le build a généré)
  const astroPages = [
    "/",
    "/agence-cro",
    "/creation-boutique-shopify",
    "/formation-intervention-entreprise-shopify",
    "/integration-3dvue",
    "/refonte-site-ecommerce",
    "/blog",
    "/blog/article1",
    "/blog/article2",
  ];

  return astroPages.map((page) => `${baseUrl}${page}`);
}

// Fonction principale pour générer le sitemap
function generateSitemap() {
  console.log("Démarrage de la génération du sitemap...");

  // Trouver tous les fichiers HTML statiques
  const staticHtmlFiles = findHtmlFiles(".");
  console.log(`Nombre de fichiers HTML statiques trouvés: ${staticHtmlFiles.length}`);

  // Obtenir les pages Astro
  const astroPages = findAstroPages();
  console.log(`Nombre de pages Astro trouvées: ${astroPages.length}`);

  // Combiner toutes les URLs
  const allUrls = [...staticHtmlFiles, ...astroPages];

  // Trier et enlever les doublons
  const uniqueUrls = [...new Set(allUrls)].sort();

  // Générer le contenu XML
  const today = new Date().toISOString();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  uniqueUrls.forEach((url) => {
    xml += "  <url>\n";
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += "    <changefreq>weekly</changefreq>\n";
    xml += "    <priority>0.7</priority>\n";
    xml += "  </url>\n";
  });

  xml += "</urlset>";

  // Écrire le fichier - ici, nous utilisons un chemin absolu
  const outputPath = path.join(process.cwd(), "curved-cluster", "dist", outputFile);

  // S'assurer que le répertoire existe
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    console.log(`Création du répertoire: ${outputDir}`);
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, xml);

  console.log(`Sitemap généré avec succès: ${outputPath}`);
  console.log(`Le sitemap contient ${uniqueUrls.length} URLs.`);
}

// Exécuter la génération
generateSitemap();
