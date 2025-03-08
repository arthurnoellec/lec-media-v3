// Placez ce fichier à la racine de votre projet sous le nom generate-sitemap.js
const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Configuration
const baseUrl = "https://lec-media.agency";
const outputFile = "sitemap.xml";
const excludeDirs = [
  "node_modules",
  ".git",
  ".vscode",
  ".netlify",
  "archive",
  "curved-cluster/node_modules",
];
const excludePatterns = ["**/XXXX-*", "**/XXXX *", "**/.DS_Store"];

// Fonction pour trouver tous les fichiers HTML statiques
function findStaticHtmlFiles() {
  const htmlFiles = [];

  // Construire les motifs à exclure
  const ignorePatterns = [
    ...excludeDirs.map((dir) => `**/${dir}/**`),
    ...excludePatterns,
    "**/curved-cluster/dist/**", // Exclure le dossier de sortie d'Astro
    "**/curved-cluster/src/**", // Exclure les sources Astro
  ];

  // Options pour glob
  const options = {
    ignore: ignorePatterns,
    nodir: true,
    cwd: process.cwd(),
  };

  // Rechercher tous les fichiers HTML
  const files = glob.sync("**/*.html", options);

  // Filtrer et convertir en URLs
  files.forEach((file) => {
    // Vérifier si le nom du fichier ne contient pas "XXXX"
    if (!file.includes("XXXX")) {
      const url = `${baseUrl}/${file}`;
      htmlFiles.push(url);
    }
  });

  return htmlFiles;
}

// Fonction pour trouver toutes les pages Astro
function findAstroPages() {
  const astroPages = [];

  // Options pour glob
  const options = {
    ignore: ["**/node_modules/**", "**/_*.astro"],
    nodir: true,
    cwd: path.join(process.cwd(), "curved-cluster/src/pages"),
  };

  // Rechercher tous les fichiers Astro
  const files = glob.sync("**/*.astro", options);

  // Convertir les chemins de fichiers en URLs
  files.forEach((file) => {
    // Transformer le chemin de fichier en URL
    let url = file
      .replace(/\.astro$/, "") // Supprimer l'extension .astro
      .replace(/\/index$/, "/") // Remplacer /index par /
      .replace(/\[([^\]]+)\]/g, ":$1"); // Remplacer [param] par :param pour les routes dynamiques

    // Si ce n'est pas un fichier index et ne se termine pas par /
    if (!file.endsWith("index.astro") && !url.endsWith("/")) {
      url = `/${url}`;
    }

    // Ajouter l'URL de base
    url = url === "" ? baseUrl : `${baseUrl}${url}`;

    // Éviter les doubles slashes
    url = url.replace(/\/\//g, "/").replace("https:/", "https://");

    astroPages.push(url);
  });

  return astroPages;
}

// Fonction principale pour générer le sitemap
function generateSitemap() {
  console.log("Démarrage de la génération du sitemap...");

  // Trouver tous les fichiers
  const staticHtmlFiles = findStaticHtmlFiles();
  console.log(`Nombre de fichiers HTML statiques trouvés: ${staticHtmlFiles.length}`);

  const astroPages = findAstroPages();
  console.log(`Nombre de pages Astro trouvées: ${astroPages.length}`);

  // Générer les URLs de pages dynamiques spécifiques
  const dynamicPages = [];

  // Combiner toutes les URLs
  const allUrls = [...staticHtmlFiles, ...astroPages, ...dynamicPages];
  console.log(`Nombre total d'URLs: ${allUrls.length}`);

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

  // Écrire le fichier
  const outputPath = path.join(process.cwd(), "curved-cluster/dist", outputFile);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, xml);

  // Afficher les URLs pour vérification
  console.log("URLs incluses dans le sitemap:");
  uniqueUrls.forEach((url) => console.log(` - ${url}`));

  console.log(`\nSitemap généré avec succès: ${outputPath}`);

  // Retourner le nombre d'URLs pour vérification
  return uniqueUrls.length;
}

// Exécuter la génération
const urlCount = generateSitemap();
console.log(`Sitemap généré avec ${urlCount} URLs.`);
