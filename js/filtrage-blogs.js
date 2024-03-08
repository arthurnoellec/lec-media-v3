document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('searchBar');
    const categoryFilter = document.getElementById('categoryFilter');
    let blogsMetadata = [];

    // Charger les métadonnées des blogs
    fetch('../Blogs/meta-blogs.json')
        .then(response => response.json())
        .then(data => {
            blogsMetadata = data;
            displayBlogs(blogsMetadata);
        });


    // Écouteur d'événements pour la barre de recherche
    searchBar.addEventListener('input', function (e) {
        const searchText = e.target.value.toLowerCase();
        const filteredBlogs = blogsMetadata.filter(blog =>
            blog.title.toLowerCase().includes(searchText)
        );
        displayBlogs(filteredBlogs);
    });


    // Écouteur d'événements pour la liste déroulante
    categoryFilter.addEventListener('change', function (e) {
        const selectedCategory = e.target.value;
        const filteredBlogs = blogsMetadata.filter(blog =>
            selectedCategory === 'all' || blog.categories.includes(selectedCategory)
        );
        displayBlogs(filteredBlogs);
    });

    // Fonction pour afficher les blogs
    function displayBlogs(blogsMetadata) {
        const container = document.getElementById('blogContainer');
        container.innerHTML = '';
        blogsMetadata.slice().reverse().forEach(blog => {
            // Créer la carte principale
            const carteDiv = document.createElement('div');
            carteDiv.className = 'carte';

            // Créer le div pour le contenu
            const contenuDiv = document.createElement('div');
            contenuDiv.className = 'contenu';
            contenuDiv.innerHTML = `<h2>${blog.title}</h2><p>${blog.description}</p>`;

            // Ajouter l'image
            const imgDiv = document.createElement('div');
            imgDiv.className = 'img-blog';
            const img = document.createElement('img');
            img.className = 'test';
            img.src = `./Blogs/img-carte/${blog.img}`; // Modifier le chemin selon la structure de votre dossier
            img.onerror = function () {
                console.error('Erreur de chargement de l\'image : ', img.src);
                // Vous pouvez également définir une image par défaut ici
                img.src = './logo-lec-media-blanc.png';
            };
            imgDiv.appendChild(img);

            // Créer le div pour la lecture et autres informations
            const lectureDiv = document.createElement('div');
            lectureDiv.className = 'lecture-div';
            lectureDiv.innerHTML = `
            <a href='./Blogs/contenus/${blog.file}'><button>Lire</button></a>
            <p><strong>Temps de lecture : ${blog.readingTime}</strong></p>
            <p>Publié le ${blog.date}</p>`;

            // Assembler la carte
            carteDiv.appendChild(contenuDiv);
            carteDiv.appendChild(imgDiv);
            carteDiv.appendChild(lectureDiv);

            // Ajouter la carte au conteneur
            container.appendChild(carteDiv);
        });
    }

});