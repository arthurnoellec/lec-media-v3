// scripts/create-post.js
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fonction pour créer un slug à partir d'un titre
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

// Fonction pour obtenir la date actuelle au format YYYY-MM-DD
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Questions pour l'article
rl.question("Titre de l'article: ", (title) => {
  const slug = slugify(title);

  rl.question("Résumé de l'article: ", (excerpt) => {
    rl.question("Tags (séparés par des virgules): ", (tagsInput) => {
      // Traitement des tags
      const tags = tagsInput.split(",").map((tag) => tag.trim());
      const tagString = tags.map((tag) => `"${tag}"`).join(", ");

      // Création du contenu du fichier
      const today = getCurrentDate();
      const fileContent = `---
title: "${title}"
date: "${today}"
slug: "${slug}"
excerpt: "${excerpt}"
tags: [${tagString}]
---

# ${title}

Rédigez votre contenu ici...
`;

      // Création du fichier
      const filePath = path.join(process.cwd(), "src", "content", "blog", `${slug}.md`);

      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          console.error("Erreur lors de la création du fichier:", err);
        } else {
          console.log(`Article créé avec succès: ${filePath}`);
        }
        rl.close();
      });
    });
  });
});
