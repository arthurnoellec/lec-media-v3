document.addEventListener('DOMContentLoaded', () => {
    const targetDiv = document.querySelector('.parent'); // Sélection de la div contenant les compteurs
    const counters = targetDiv.querySelectorAll('span'); // Sélection de tous les spans dans cette div

    const animateCounters = () => {
        counters.forEach((counter, index) => {
            const targetValue = +counter.getAttribute('data-target');
            // Rend l'animation 30% plus lente
            const increment = targetValue / 260; // Augmente le dénominateur pour ralentir

            const updateCounter = () => {
                const currentValue = parseFloat(counter.textContent);
                if (currentValue < targetValue) {
                    // Augmente la valeur actuelle et met à jour le formatage selon le compteur
                    let newValue;
                    switch (index) {
                        case 0: // Compteur 1 avec 0 chiffre après la virgule
                            newValue = Math.min(currentValue + increment, targetValue);
                            counter.textContent = newValue.toFixed(1); // Assurez-vous d'arrondir correctement
                            break;
                        case 1: // Compteur 2 avec 2 chiffres après la virgule
                            newValue = Math.min(currentValue + increment, targetValue);
                            counter.textContent = newValue.toFixed(2);
                            break;
                        case 2: // Compteur 3 avec 1 chiffre après la virgule
                            newValue = Math.min(currentValue + increment, targetValue);
                            counter.textContent = newValue.toFixed(1);
                            break;
                    }
                    setTimeout(updateCounter, 1);
                } else {
                    counter.textContent = targetValue.toFixed(index === 0 ? 0 : (index === 1 ? 2 : 1)); // Assure le format final correct
                }
            };
            updateCounter();
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters(); // Lance l'animation des compteurs
                observer.unobserve(entry.target); // Arrête d'observer après l'animation
            }
        });
    }, {
        rootMargin: "-70% 0px -70% 0px" // Configure pour déclencher quand la div dépasse la moitié de l'écran
    });

    observer.observe(targetDiv); // Commence à observer la div des compteurs
});