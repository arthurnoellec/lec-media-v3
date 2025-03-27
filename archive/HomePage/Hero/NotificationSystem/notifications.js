// Définition des notifications
const notificationsList = [
  {
    name: "Shopify",
    icon: "/shopify_logo_apple.png",
    time: "Now",
    title: "Nouvelle commande",
    content: "Vous avez une nouvelle commande pour 1 article totalisant $365,99",
  },
  {
    name: "Shopify",
    icon: "/shopify_logo_apple.png",
    time: "Now",
    title: "Nouvelle commande",
    content: "Vous avez une nouvelle commande pour 2 articles totalisant $120,50",
  },
  {
    name: "Shopify",
    icon: "/shopify_logo_apple.png",
    time: "Now",
    title: "Nouvelle commande",
    content: "Vous avez une nouvelle commande pour 3 articles totalisant $250,75",
  },
  {
    name: "Shopify",
    icon: "/shopify_logo_apple.png",
    time: "Now",
    title: "Nouvelle commande",
    content: "Vous avez une nouvelle commande pour 1 article totalisant $99,99",
  },
];

// Template pour les notifications
function createNotificationTemplate() {
  const element = document.createElement("li");
  element.className = "Notification Notification--Close Notification--Optimize";

  element.innerHTML = `
      <div class="Notification__Container">
        <div class="Notification__Icon">
          <img alt="logo shopify icon iphone apple" width="56" height="56"/>
        </div>
        <div class="Notification__Contente">
          <div class="Notification__Header">
            <div class="Notification__App">
              <div class="Notification__Name"></div>
            </div>
            <div class="Notification__Time"></div>
          </div>
          <div class="Notification__Body">
            <div class="Notification__Title" style="display: none"></div>
            <div class="Notification__Content"></div>
          </div>
        </div>
      </div>
    `;

  return element;
}

// Génération d'un nombre aléatoire
function rnd(size) {
  return Math.floor(Math.random() * size);
}

// Fonction pour générer une notification avec configuration
function createNotification(config = {}) {
  const element = createNotificationTemplate();

  // Mets à jour le contenu de la notification
  const icon = element.querySelector(".Notification__Icon img");
  const name = element.querySelector(".Notification__Name");
  const time = element.querySelector(".Notification__Time");
  const title = element.querySelector(".Notification__Title");
  const content = element.querySelector(".Notification__Content");

  if (icon) icon.src = config.icon;
  if (name) name.textContent = config.name;
  if (time) time.textContent = config.time;
  if (title) title.textContent = config.title;
  if (content) content.textContent = config.content;

  return element;
}

// Ajouter une notification à la liste
function addNotification(notification, callback) {
  const listElement = document.querySelector(".Notifications__List");

  if (!listElement) return;

  // Ajouter en haut de la liste
  listElement.insertAdjacentElement("afterBegin", notification);

  // Animation d'entrée
  setTimeout(() => {
    notification.classList.remove("Notification--Close");
    setTimeout(() => {
      notification.classList.remove("Notification--Optimize");

      if (typeof callback === "function") callback();

      // Limiter le nombre de notifications
      const notifications = document.querySelectorAll(".Notification");
      if (notifications.length > 6) {
        if (listElement.lastChild) {
          listElement.removeChild(listElement.lastChild);
        }
      }
    }, 875);
  }, 25);
}

// Génère l'heure actuelle
function getCurrentTime() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;
}

// Génère un montant de commande aléatoire
function generateRandomOrder() {
  const items = rnd(3) + 1;
  const amount = (Math.random() * (400.99 - 20.0) + 20.0).toFixed(2);
  return `Vous avez une nouvelle commande de ${items} article${
    items > 1 ? "s" : ""
  } pour un total de $${amount}`;
}

// Ajoute une notification aléatoire
function addRandomNotification() {
  const randomIndex = rnd(notificationsList.length);
  const notification = { ...notificationsList[randomIndex] };

  // Met à jour avec des informations dynamiques
  notification.time = getCurrentTime();
  notification.content = generateRandomOrder();

  const newNotification = createNotification(notification);
  addNotification(newNotification);
}

// Initialisation des notifications
function initNotifications() {
  // Ajouter 5 notifications initiales
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      addRandomNotification();
    }, i * 100);
  }

  // Ajouter périodiquement des notifications
  (function loop() {
    const randomDelay = Math.round(Math.random() * 900) + 500;
    setTimeout(() => {
      addRandomNotification();
      loop();
    }, randomDelay);
  })();
}

// Export pour utilisation dans les composants Astro
export { initNotifications, addRandomNotification };
