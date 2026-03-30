// Variables globales
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// DOM Elements
const searchForm = document.querySelector(".search-form");
const shoppingCart = document.querySelector(".shopping-cart");
const loginForm = document.querySelector(".login-form");
const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector("#menu-btn");
const searchBtn = document.querySelector("#search-btn");
const cartBtn = document.querySelector("#cart-btn");
const loginBtn = document.querySelector("#login-btn");
const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".total span");

// Données des animaux
const animals = [
  {
    id: 1,
    name: "Berger Allemand",
    category: "Chien",
    price: 75000,
    image: "images/dog1.jpg",
    age: "3 mois",
    health: "Vacciné, vermifugé",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Persan",
    category: "Chat",
    price: 45000,
    image: "images/cat1.jpg",
    age: "2 mois",
    health: "Vacciné",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Poule Locale",
    category: "Volailles",
    price: 5000,
    image: "images/chicken1.jpg",
    age: "6 mois",
    health: "En bonne santé",
    rating: 4.2,
  },
  {
    id: 4,
    name: "Mouton",
    category: "Bétail",
    price: 120000,
    image: "images/sheep1.jpg",
    age: "1 an",
    health: "Vacciné",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Labrador",
    category: "Chien",
    price: 85000,
    image: "images/dog2.jpg",
    age: "4 mois",
    health: "Vacciné, pucé",
    rating: 4.9,
  },
];

// Témoignages
const testimonials = [
  {
    name: "Marie Koné",
    text: "Excellent service ! Mon chien a été parfaitement soigné. Je recommande vivement.",
    image: "images/client1.jpg",
    rating: 5,
  },
  {
    name: "Jean Traoré",
    text: "Des animaux en parfaite santé et un personnel très professionnel. Merci !",
    image: "images/client2.jpg",
    rating: 4,
  },
  {
    name: "Aïcha Diop",
    text: "J'ai acheté 3 poules pour mon élevage, elles sont toutes en pleine forme.",
    image: "images/client3.jpg",
    rating: 5,
  },
];

// Initialisation
document.addEventListener("DOMContentLoaded", function () {
  // Mettre à jour l'année du copyright
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Initialiser les swipers
  initSwiper();

  // Charger le panier
  updateCart();

  // Afficher les animaux
  displayAnimals();

  // Afficher les témoignages
  displayTestimonials();

  // Gestion de la connexion
  handleAuth();
});

// Gestion des formulaires
searchBtn.onclick = () => {
  searchForm.classList.toggle("active");
  shoppingCart.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};

cartBtn.onclick = () => {
  shoppingCart.classList.toggle("active");
  searchForm.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};

loginBtn.onclick = () => {
  loginForm.classList.toggle("active");
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
  navbar.classList.remove("active");
};

menuBtn.onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
  loginForm.classList.remove("active");
};

// Fermer les formulaires au scroll
window.onscroll = () => {
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};

// Swiper
function initSwiper() {
  // Swiper pour les animaux
  const animalSwiper = new Swiper(".animal-slider", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // Swiper pour les témoignages
  const testimonialSwiper = new Swiper(".review-slider", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// Afficher les animaux
function displayAnimals() {
  const animalSlider = document.querySelector(".animal-slider .swiper-wrapper");
  if (!animalSlider) return;

  animals.forEach((animal) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
            <div class="animal-card">
                <img src="${animal.image}" alt="${animal.name}">
                <span class="category">${animal.category}</span>
                <h3>${animal.name}</h3>
                <div class="stars">
                    ${generateStars(animal.rating)}
                </div>
                <p class="age">Âge: ${animal.age}</p>
                <p class="health">${animal.health}</p>
                <div class="price">${animal.price.toLocaleString()} CFA</div>
                <button class="btn add-to-cart" data-id="${animal.id}">
                    <i class="fas fa-cart-plus"></i> Ajouter au panier
                </button>
            </div>
        `;
    animalSlider.appendChild(slide);
  });

  // Ajouter les événements aux boutons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

// Afficher les témoignages
function displayTestimonials() {
  const testimonialSlider = document.querySelector(
    ".review-slider .swiper-wrapper"
  );
  if (!testimonialSlider) return;

  testimonials.forEach((testimonial) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
            <div class="testimonial-content">
                <img src="${testimonial.image}" alt="${testimonial.name}">
                <p>"${testimonial.text}"</p>
                <div class="stars">
                    ${generateStars(testimonial.rating)}
                </div>
                <h4>${testimonial.name}</h4>
            </div>
        `;
    testimonialSlider.appendChild(slide);
  });
}

// Générer les étoiles
function generateStars(rating) {
  let stars = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

// Gestion du panier
function addToCart(e) {
  const animalId = parseInt(e.target.closest(".add-to-cart").dataset.id);
  const animal = animals.find((a) => a.id === animalId);

  if (!animal) return;

  const existingItem = cart.find((item) => item.id === animalId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...animal,
      quantity: 1,
    });
  }

  // Sauvegarder dans localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Mettre à jour l'affichage
  updateCart();

  // Afficher une notification
  showNotification(`${animal.name} ajouté au panier!`);
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCartQuantity(id, quantity) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      item.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    }
  }
}

function updateCart() {
  // Mettre à jour le compteur
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Mettre à jour les items
  updateCartItems();

  // Mettre à jour le total
  updateCartTotal();
}

function updateCartItems() {
  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "box";
    cartItem.innerHTML = `
            <i class="fas fa-trash remove-item" data-id="${item.id}"></i>
            <img src="${item.image}" alt="${item.name}">
            <div class="content">
                <h3>${item.name}</h3>
                <span class="price">${item.price.toLocaleString()} CFA</span>
                <span class="quantity">
                    <button class="quantity-btn minus" data-id="${
                      item.id
                    }">-</button>
                    ${item.quantity}
                    <button class="quantity-btn plus" data-id="${
                      item.id
                    }">+</button>
                </span>
            </div>
        `;
    cartItems.appendChild(cartItem);
  });

  // Ajouter les événements
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      removeFromCart(id);
    });
  });

  document.querySelectorAll(".quantity-btn.minus").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const item = cart.find((item) => item.id === id);
      if (item) {
        updateCartQuantity(id, item.quantity - 1);
      }
    });
  });

  document.querySelectorAll(".quantity-btn.plus").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const item = cart.find((item) => item.id === id);
      if (item) {
        updateCartQuantity(id, item.quantity + 1);
      }
    });
  });
}

function updateCartTotal() {
  if (!cartTotal) return;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toLocaleString();
}

// Gestion de l'authentification
function handleAuth() {
  const loginFormElement = document.querySelector(".login-form");
  if (!loginFormElement) return;

  loginFormElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    // Simuler une connexion
    if (email && password) {
      currentUser = {
        email: email,
        name: email.split("@")[0],
      };

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      showNotification("Connexion réussie!");
      loginForm.classList.remove("active");

      // Mettre à jour l'interface
      updateUserInterface();
    }
  });

  // Lien vers l'inscription
  const registerLink = document.getElementById("register-link");
  if (registerLink) {
    registerLink.addEventListener("click", function (e) {
      e.preventDefault();
      showRegisterForm();
    });
  }
}

function updateUserInterface() {
  const loginBtn = document.querySelector("#login-btn");
  if (currentUser && loginBtn) {
    loginBtn.innerHTML = `<i class="fas fa-user-check"></i>`;
    loginBtn.title = `Connecté en tant que ${currentUser.name}`;
  }
}

function showRegisterForm() {
  const loginForm = document.querySelector(".login-form");
  if (loginForm) {
    loginForm.innerHTML = `
            <h3>Créer un compte</h3>
            <input type="text" placeholder="Nom complet" class="box" required>
            <input type="email" placeholder="Votre email" class="box" required>
            <input type="tel" placeholder="Téléphone" class="box" required>
            <input type="password" placeholder="Mot de passe" class="box" required>
            <input type="password" placeholder="Confirmer mot de passe" class="box" required>
            <input type="submit" value="S'inscrire" class="btn">
            <p>Déjà un compte ? <a href="#" id="login-link">Se connecter</a></p>
        `;

    // Ajouter l'événement pour revenir au login
    document
      .getElementById("login-link")
      .addEventListener("click", function (e) {
        e.preventDefault();
        location.reload();
      });
  }
}

// Notification
function showNotification(message, type = "success") {
  // Créer la notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success" ? "check-circle" : "exclamation-circle"
        }"></i>
        <span>${message}</span>
    `;

  // Ajouter au body
  document.body.appendChild(notification);

  // Animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Supprimer après 3 secondes
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Recherche
const searchBox = document.getElementById("search-box");
if (searchBox) {
  searchBox.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();

    // Ici, vous pourriez filtrer les animaux/produits
    console.log("Recherche:", searchTerm);

    // Pour l'instant, on affiche juste une notification
    if (searchTerm.length > 2) {
      // Recherche en temps réel
    }
  });
}

// Fonction utilitaire pour formater les prix
function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
  }).format(price);
}

// ====================
// CHATBOT
// ====================

// Initialiser le chatbot
function initChatbot() {
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotClose = document.getElementById("chatbot-close");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotSend = document.getElementById("chatbot-send");
  const chatbotMessages = document.getElementById("chatbot-messages");

  if (!chatbotToggle) return;

  // Toggle chatbot window
  chatbotToggle.addEventListener("click", function () {
    chatbotWindow.classList.toggle("active");
  });

  // Close chatbot
  chatbotClose.addEventListener("click", function () {
    chatbotWindow.classList.remove("active");
  });

  // Send message
  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, "user");

    // Clear input
    chatbotInput.value = "";

    // Bot response
    setTimeout(() => {
      const response = getBotResponse(message);
      addMessage(response, "bot");
    }, 500);
  }

  chatbotSend.addEventListener("click", sendMessage);
  chatbotInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Initial bot message
  setTimeout(() => {
    addMessage(
      "👋 Bonjour ! Je suis l'assistant AnimalCare. Comment puis-je vous aider aujourd'hui ?",
      "bot"
    );
  }, 1000);
}

// Ajouter un message au chat
function addMessage(text, sender) {
  const chatbotMessages = document.getElementById("chatbot-messages");
  if (!chatbotMessages) return;

  const messageDiv = document.createElement("div");
  messageDiv.className = `chatbot-message ${sender}`;
  messageDiv.textContent = text;

  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Réponse du chatbot
function getBotResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Questions fréquentes
  if (
    lowerMessage.includes("bonjour") ||
    lowerMessage.includes("salut") ||
    lowerMessage.includes("hello")
  ) {
    return "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
  }

  if (lowerMessage.includes("prix") || lowerMessage.includes("combien")) {
    return "Les prix varient selon les animaux et services. Consultez nos pages pour plus de détails ou contactez-nous pour un devis personnalisé.";
  }

  if (lowerMessage.includes("rendez-vous") || lowerMessage.includes("rdv")) {
    return "Pour prendre rendez-vous, visitez notre page 'Soins' ou appelez-nous au +225 01 23 45 67 89.";
  }

  if (lowerMessage.includes("urgence") || lowerMessage.includes("urgent")) {
    return "🔴 URGENCE : Appelez immédiatement le +225 01 23 45 67 89 (24h/24) ou rendez-vous directement à notre clinique.";
  }

  if (lowerMessage.includes("vaccin") || lowerMessage.includes("vaccination")) {
    return "Nous proposons tous les vaccins pour chiens, chats et animaux de ferme. Prenez rendez-vous pour un programme de vaccination adapté.";
  }

  if (lowerMessage.includes("adoption") || lowerMessage.includes("acheter")) {
    return "Consultez notre page 'Vente' pour voir les animaux disponibles. Vous pouvez aussi nous visiter pour rencontrer les animaux.";
  }

  if (
    lowerMessage.includes("heures") ||
    lowerMessage.includes("horaires") ||
    lowerMessage.includes("ouvert")
  ) {
    return "Nos horaires : Lundi-Vendredi: 8h-18h, Samedi: 9h-17h, Dimanche: 10h-15h. Urgences: 24h/24.";
  }

  if (lowerMessage.includes("merci")) {
    return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions.";
  }

  if (lowerMessage.includes("au revoir") || lowerMessage.includes("bye")) {
    return "Au revoir ! À bientôt chez AnimalCare.";
  }

  // Réponses par défaut
  const defaultResponses = [
    "Je peux vous aider avec les soins, la vente d'animaux, la pharmacie ou l'élevage. Que recherchez-vous exactement ?",
    "Pouvez-vous préciser votre demande ? Je peux vous renseigner sur nos services vétérinaires, la vente d'animaux ou nos produits.",
    "Je ne suis pas sûr de comprendre. Pour une assistance complète, contactez-nous au +225 01 23 45 67 89.",
    "Consultez notre site pour toutes les informations. Vous pouvez aussi nous appeler pour parler à un conseiller.",
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ====================
// FONCTIONS AVANCÉES
// ====================

// Gestion des utilisateurs
class UserManager {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("users")) || [];
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  }

  register(userData) {
    // Vérifier si l'utilisateur existe déjà
    if (this.users.find((u) => u.email === userData.email)) {
      return { success: false, message: "Cet email est déjà utilisé." };
    }

    // Ajouter l'utilisateur
    const user = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
      role: "user",
    };

    this.users.push(user);
    localStorage.setItem("users", JSON.stringify(this.users));

    return { success: true, user };
  }

  login(email, password) {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { success: true, user };
    }

    return { success: false, message: "Email ou mot de passe incorrect." };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }

  updateProfile(userData) {
    const index = this.users.findIndex((u) => u.id === this.currentUser.id);

    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userData };
      this.currentUser = this.users[index];

      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));

      return { success: true, user: this.currentUser };
    }

    return { success: false, message: "Utilisateur non trouvé." };
  }

  getOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    return orders.filter((order) => order.userId === this.currentUser?.id);
  }
}

// Gestion des commandes
class OrderManager {
  constructor() {
    this.orders = JSON.parse(localStorage.getItem("orders")) || [];
  }

  createOrder(cart, userId, shippingInfo) {
    const order = {
      id: "ORD" + Date.now(),
      userId,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "pending",
      shippingInfo,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(), // 7 jours
    };

    this.orders.push(order);
    localStorage.setItem("orders", JSON.stringify(this.orders));

    // Vider le panier
    localStorage.removeItem("cart");
    localStorage.removeItem("pharmacyCart");

    return order;
  }

  updateOrderStatus(orderId, status) {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      localStorage.setItem("orders", JSON.stringify(this.orders));
      return order;
    }
    return null;
  }
}

// Système de notation
class RatingSystem {
  constructor() {
    this.ratings = JSON.parse(localStorage.getItem("ratings")) || [];
  }

  addRating(itemId, userId, rating, comment) {
    const existingRating = this.ratings.find(
      (r) => r.itemId === itemId && r.userId === userId
    );

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.comment = comment;
      existingRating.updatedAt = new Date().toISOString();
    } else {
      this.ratings.push({
        id: Date.now(),
        itemId,
        userId,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      });
    }

    localStorage.setItem("ratings", JSON.stringify(this.ratings));
    return this.getAverageRating(itemId);
  }

  getAverageRating(itemId) {
    const itemRatings = this.ratings.filter((r) => r.itemId === itemId);
    if (itemRatings.length === 0) return 0;

    const sum = itemRatings.reduce((total, r) => total + r.rating, 0);
    return sum / itemRatings.length;
  }

  getRatings(itemId) {
    return this.ratings.filter((r) => r.itemId === itemId);
  }
}

// ====================
// INITIALISATION COMPLÈTE
// ====================

// Mettre à jour l'initialisation dans DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialisations existantes...

  // Ajouter le chatbot au HTML s'il n'existe pas
  if (!document.getElementById("chatbot-container")) {
    const chatbotHTML = `
            <div class="chatbot-container" id="chatbot-container">
                <div class="chatbot-toggle" id="chatbot-toggle">
                    <i class="fas fa-comment-dots"></i>
                </div>
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <h4>Assistant AnimalCare</h4>
                        <button class="chatbot-close" id="chatbot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="chatbot-messages" id="chatbot-messages"></div>
                    <div class="chatbot-input">
                        <input type="text" id="chatbot-input" placeholder="Tapez votre message...">
                        <button id="chatbot-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    document.body.insertAdjacentHTML("beforeend", chatbotHTML);

    // Initialiser le chatbot
    initChatbot();
  }

  // Gestionnaires
  window.userManager = new UserManager();
  window.orderManager = new OrderManager();
  window.ratingSystem = new RatingSystem();

  // Mettre à jour l'interface utilisateur
  updateUserInterface();
});

// Fonction pour mettre à jour l'interface utilisateur
function updateUserInterface() {
  const userManager = window.userManager;

  // Mettre à jour le bouton de connexion
  const loginBtn = document.querySelector("#login-btn");
  if (loginBtn && userManager.currentUser) {
    loginBtn.innerHTML = `<i class="fas fa-user-check"></i>`;
    loginBtn.title = `Connecté en tant que ${userManager.currentUser.name}`;

    // Ajouter un menu déroulant pour l'utilisateur
    const userMenu = document.createElement("div");
    userMenu.className = "user-menu";
    userMenu.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            box-shadow: var(--shadow);
            border-radius: 8px;
            min-width: 200px;
            display: none;
            z-index: 1000;
        `;

    userMenu.innerHTML = `
            <div style="padding: 1.5rem; border-bottom: 1px solid #eee;">
                <div style="font-weight: 600; font-size: 1.6rem;">${userManager.currentUser.name}</div>
                <div style="font-size: 1.4rem; color: #666;">${userManager.currentUser.email}</div>
            </div>
            <a href="#" style="display: block; padding: 1rem 1.5rem; font-size: 1.5rem; color: #333; text-decoration: none;" id="profile-link">
                <i class="fas fa-user"></i> Mon profil
            </a>
            <a href="#" style="display: block; padding: 1rem 1.5rem; font-size: 1.5rem; color: #333; text-decoration: none;" id="orders-link">
                <i class="fas fa-shopping-bag"></i> Mes commandes
            </a>
            <button style="width: 100%; padding: 1rem 1.5rem; font-size: 1.5rem; color: #f44336; background: none; border: none; border-top: 1px solid #eee; text-align: left; cursor: pointer;" id="logout-btn">
                <i class="fas fa-sign-out-alt"></i> Déconnexion
            </button>
        `;

    loginBtn.parentNode.style.position = "relative";
    loginBtn.parentNode.appendChild(userMenu);

    // Gestion des événements
    loginBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      userMenu.style.display =
        userMenu.style.display === "block" ? "none" : "block";
    });

    document
      .getElementById("logout-btn")
      .addEventListener("click", function () {
        userManager.logout();
        location.reload();
      });

    document.addEventListener("click", function () {
      userMenu.style.display = "none";
    });
  }
}

// ====================
// GESTION DES COMMANDES
// ====================

// Classe OrderManager (étendue)
class OrderManager {
  constructor() {
    this.orders = JSON.parse(localStorage.getItem("orders")) || [];
  }

  createOrder(cart, shippingInfo, paymentInfo) {
    const order = {
      id: "CMD-" + Date.now().toString().slice(-8),
      userId: currentUser?.id || "guest",
      items: cart,
      shipping: shippingInfo,
      payment: paymentInfo,
      customer: shippingInfo,
      totals: {
        subtotal: cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        shipping: shippingInfo.cost,
        taxes: Math.round(
          cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.18
        ),
        total: 0,
      },
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Calculer le total final
    order.totals.total =
      order.totals.subtotal + order.totals.shipping + order.totals.taxes;

    this.orders.push(order);
    localStorage.setItem("orders", JSON.stringify(this.orders));

    return order;
  }

  updateOrderStatus(orderId, status) {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      localStorage.setItem("orders", JSON.stringify(this.orders));
      return order;
    }
    return null;
  }

  getUserOrders(userId) {
    return this.orders.filter((order) => order.userId === userId);
  }

  getOrderById(orderId) {
    return this.orders.find((order) => order.id === orderId);
  }

  // Nouvelle méthode pour le traitement des paiements
  processPayment(orderId, paymentDetails) {
    const order = this.getOrderById(orderId);
    if (!order) return { success: false, message: "Commande non trouvée" };

    // Simuler le traitement du paiement
    const paymentSuccess = Math.random() > 0.1; // 90% de succès

    if (paymentSuccess) {
      order.status = "paid";
      order.payment.processed = true;
      order.payment.processedAt = new Date().toISOString();
      order.payment.details = paymentDetails;

      localStorage.setItem("orders", JSON.stringify(this.orders));

      return {
        success: true,
        order,
        message: "Paiement traité avec succès",
      };
    } else {
      return {
        success: false,
        message: "Échec du paiement. Veuillez réessayer.",
      };
    }
  }
}

// ====================
// GESTION DU PAIEMENT
// ====================

class PaymentManager {
  constructor() {
    this.savedCards = JSON.parse(localStorage.getItem("savedCards")) || [];
  }

  validateCard(cardData) {
    const { number, expiry, cvc, name } = cardData;

    // Validation basique
    if (!number || number.replace(/\D/g, "").length !== 16) {
      return { valid: false, error: "Numéro de carte invalide" };
    }

    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
      return { valid: false, error: "Date d'expiration invalide" };
    }

    if (!cvc || cvc.length !== 3) {
      return { valid: false, error: "Code CVC invalide" };
    }

    if (!name || name.trim().length < 2) {
      return { valid: false, error: "Nom invalide" };
    }

    // Vérifier la date d'expiration
    const [month, year] = expiry.split("/").map((num) => parseInt(num, 10));
    const expiryDate = new Date(2000 + year, month - 1);
    const today = new Date();

    if (expiryDate < today) {
      return { valid: false, error: "Carte expirée" };
    }

    return { valid: true };
  }

  processMobilePayment(provider, phone, amount) {
    // Simuler le paiement mobile
    const paymentSuccess = Math.random() > 0.05; // 95% de succès

    if (paymentSuccess) {
      return {
        success: true,
        transactionId: "MOB-" + Date.now().toString().slice(-10),
        provider,
        phone,
        amount,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        success: false,
        error: "Paiement échoué. Veuillez vérifier votre solde.",
      };
    }
  }

  saveCard(cardData) {
    const card = {
      id: "CARD-" + Date.now().toString().slice(-8),
      lastFour: cardData.number.slice(-4),
      expiry: cardData.expiry,
      name: cardData.name,
      type: this.detectCardType(cardData.number),
      isDefault: this.savedCards.length === 0,
    };

    this.savedCards.push(card);
    localStorage.setItem("savedCards", JSON.stringify(this.savedCards));

    return card;
  }

  detectCardType(number) {
    const cleaned = number.replace(/\D/g, "");

    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";

    return "unknown";
  }
}

// ====================
// INITIALISATION MISE À JOUR
// ====================

// Mettre à jour l'initialisation dans DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialisations existantes...

  // Ajouter les nouveaux gestionnaires
  window.orderManager = new OrderManager();
  window.paymentManager = new PaymentManager();

  // Mettre à jour le compteur du panier
  updateCartCount();
});

// Fonction pour mettre à jour le compteur du panier
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const pharmacyCart = JSON.parse(localStorage.getItem("pharmacyCart")) || [];

  const totalItems = [...cart, ...pharmacyCart].reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartCountElements = document.querySelectorAll(".cart-count");
  cartCountElements.forEach((element) => {
    element.textContent = totalItems;
  });
}

// Fonction pour rediriger vers la page de commande
function goToCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const pharmacyCart = JSON.parse(localStorage.getItem("pharmacyCart")) || [];

  if (cart.length === 0 && pharmacyCart.length === 0) {
    showNotification("Votre panier est vide", "warning");
    return;
  }

  window.location.href = "commande.html";
}

// Ajouter un événement au bouton de commande dans le panier
document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.querySelector(".shopping-cart .btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      goToCheckout();
    });
  }
});

// ====================
// FONCTIONS UTILITAIRES PAIEMENT
// ====================

// Formater le numéro de carte
function formatCardNumber(number) {
  return number
    .replace(/\D/g, "")
    .replace(/(\d{4})/g, "$1 ")
    .trim();
}

// Formater la date d'expiration
function formatExpiryDate(expiry) {
  const cleaned = expiry.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
  }
  return cleaned;
}

// Obtenir l'icône de la carte
function getCardIcon(cardType) {
  const icons = {
    visa: "fa-cc-visa",
    mastercard: "fa-cc-mastercard",
    amex: "fa-cc-amex",
    unknown: "fa-credit-card",
  };

  return icons[cardType] || "fa-credit-card";
}

// ====================
// GESTION DES COMMANDES
// ====================

// Classe OrderManager (étendue)
class OrderManager {
  constructor() {
    this.orders = JSON.parse(localStorage.getItem("orders")) || [];
  }

  createOrder(cart, shippingInfo, paymentInfo) {
    const order = {
      id: "CMD-" + Date.now().toString().slice(-8),
      userId: currentUser?.id || "guest",
      items: cart,
      shipping: shippingInfo,
      payment: paymentInfo,
      customer: shippingInfo,
      totals: {
        subtotal: cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        shipping: shippingInfo.cost,
        taxes: Math.round(
          cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.18
        ),
        total: 0,
      },
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Calculer le total final
    order.totals.total =
      order.totals.subtotal + order.totals.shipping + order.totals.taxes;

    this.orders.push(order);
    localStorage.setItem("orders", JSON.stringify(this.orders));

    return order;
  }

  updateOrderStatus(orderId, status) {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      localStorage.setItem("orders", JSON.stringify(this.orders));
      return order;
    }
    return null;
  }

  getUserOrders(userId) {
    return this.orders.filter((order) => order.userId === userId);
  }

  getOrderById(orderId) {
    return this.orders.find((order) => order.id === orderId);
  }

  // Nouvelle méthode pour le traitement des paiements
  processPayment(orderId, paymentDetails) {
    const order = this.getOrderById(orderId);
    if (!order) return { success: false, message: "Commande non trouvée" };

    // Simuler le traitement du paiement
    const paymentSuccess = Math.random() > 0.1; // 90% de succès

    if (paymentSuccess) {
      order.status = "paid";
      order.payment.processed = true;
      order.payment.processedAt = new Date().toISOString();
      order.payment.details = paymentDetails;

      localStorage.setItem("orders", JSON.stringify(this.orders));

      return {
        success: true,
        order,
        message: "Paiement traité avec succès",
      };
    } else {
      return {
        success: false,
        message: "Échec du paiement. Veuillez réessayer.",
      };
    }
  }
}

// ====================
// GESTION DU PAIEMENT
// ====================

class PaymentManager {
  constructor() {
    this.savedCards = JSON.parse(localStorage.getItem("savedCards")) || [];
  }

  validateCard(cardData) {
    const { number, expiry, cvc, name } = cardData;

    // Validation basique
    if (!number || number.replace(/\D/g, "").length !== 16) {
      return { valid: false, error: "Numéro de carte invalide" };
    }

    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
      return { valid: false, error: "Date d'expiration invalide" };
    }

    if (!cvc || cvc.length !== 3) {
      return { valid: false, error: "Code CVC invalide" };
    }

    if (!name || name.trim().length < 2) {
      return { valid: false, error: "Nom invalide" };
    }

    // Vérifier la date d'expiration
    const [month, year] = expiry.split("/").map((num) => parseInt(num, 10));
    const expiryDate = new Date(2000 + year, month - 1);
    const today = new Date();

    if (expiryDate < today) {
      return { valid: false, error: "Carte expirée" };
    }

    return { valid: true };
  }

  processMobilePayment(provider, phone, amount) {
    // Simuler le paiement mobile
    const paymentSuccess = Math.random() > 0.05; // 95% de succès

    if (paymentSuccess) {
      return {
        success: true,
        transactionId: "MOB-" + Date.now().toString().slice(-10),
        provider,
        phone,
        amount,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        success: false,
        error: "Paiement échoué. Veuillez vérifier votre solde.",
      };
    }
  }

  saveCard(cardData) {
    const card = {
      id: "CARD-" + Date.now().toString().slice(-8),
      lastFour: cardData.number.slice(-4),
      expiry: cardData.expiry,
      name: cardData.name,
      type: this.detectCardType(cardData.number),
      isDefault: this.savedCards.length === 0,
    };

    this.savedCards.push(card);
    localStorage.setItem("savedCards", JSON.stringify(this.savedCards));

    return card;
  }

  detectCardType(number) {
    const cleaned = number.replace(/\D/g, "");

    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";

    return "unknown";
  }
}

// ====================
// INITIALISATION MISE À JOUR
// ====================

// Mettre à jour l'initialisation dans DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialisations existantes...

  // Ajouter les nouveaux gestionnaires
  window.orderManager = new OrderManager();
  window.paymentManager = new PaymentManager();

  // Mettre à jour le compteur du panier
  updateCartCount();
});

// Fonction pour mettre à jour le compteur du panier
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const pharmacyCart = JSON.parse(localStorage.getItem("pharmacyCart")) || [];

  const totalItems = [...cart, ...pharmacyCart].reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartCountElements = document.querySelectorAll(".cart-count");
  cartCountElements.forEach((element) => {
    element.textContent = totalItems;
  });
}

// Fonction pour rediriger vers la page de commande
function goToCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const pharmacyCart = JSON.parse(localStorage.getItem("pharmacyCart")) || [];

  if (cart.length === 0 && pharmacyCart.length === 0) {
    showNotification("Votre panier est vide", "warning");
    return;
  }

  window.location.href = "commande.html";
}

// Ajouter un événement au bouton de commande dans le panier
document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.querySelector(".shopping-cart .btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      goToCheckout();
    });
  }
});

// ====================
// FONCTIONS UTILITAIRES PAIEMENT
// ====================

// Formater le numéro de carte
function formatCardNumber(number) {
  return number
    .replace(/\D/g, "")
    .replace(/(\d{4})/g, "$1 ")
    .trim();
}

// Formater la date d'expiration
function formatExpiryDate(expiry) {
  const cleaned = expiry.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
  }
  return cleaned;
}

// Obtenir l'icône de la carte
function getCardIcon(cardType) {
  const icons = {
    visa: "fa-cc-visa",
    mastercard: "fa-cc-mastercard",
    amex: "fa-cc-amex",
    unknown: "fa-credit-card",
  };

  return icons[cardType] || "fa-credit-card";
}

// ====================
// PAGE "MES COMMANDES"
// ====================

// Ajouter cette fonction pour créer une page "mes commandes"
function createOrdersPage() {
  if (!document.getElementById("orders-page")) return;

  const orderManager = window.orderManager;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  const userOrders = orderManager.getUserOrders(currentUser.id);
  displayUserOrders(userOrders);
}

// Afficher les commandes de l'utilisateur
function displayUserOrders(orders) {
  const ordersContainer = document.getElementById("orders-container");
  if (!ordersContainer) return;

  if (orders.length === 0) {
    ordersContainer.innerHTML = `
            <div style="text-align: center; padding: 5rem;">
                <i class="fas fa-shopping-bag" style="font-size: 5rem; color: var(--gray); margin-bottom: 2rem;"></i>
                <h3 style="font-size: 2.5rem; color: var(--dark); margin-bottom: 1rem;">Aucune commande</h3>
                <p style="font-size: 1.6rem; color: var(--gray); margin-bottom: 3rem;">
                    Vous n'avez pas encore passé de commande.
                </p>
                <a href="vente.html" class="btn">
                    <i class="fas fa-shopping-cart"></i> Commencer mes achats
                </a>
            </div>
        `;
    return;
  }

  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  let html = `
        <div class="orders-list">
            <div class="orders-header">
                <h2>Mes commandes</h2>
                <div class="orders-count">${orders.length} commande${
    orders.length > 1 ? "s" : ""
  }</div>
            </div>
    `;

  orders.forEach((order) => {
    html += createOrderCard(order);
  });

  html += `</div>`;
  ordersContainer.innerHTML = html;

  // Ajouter les événements
  document.querySelectorAll(".view-order-details").forEach((button) => {
    button.addEventListener("click", function () {
      const orderId = this.dataset.orderId;
      viewOrderDetails(orderId);
    });
  });
}

// Créer une carte de commande
function createOrderCard(order) {
  const statusColors = {
    pending: "#ff9800",
    processing: "#2196f3",
    shipped: "#4caf50",
    delivered: "#2e7d32",
    cancelled: "#f44336",
  };

  const statusLabels = {
    pending: "En attente",
    processing: "En traitement",
    shipped: "Expédiée",
    delivered: "Livrée",
    cancelled: "Annulée",
  };

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const orderDate = new Date(order.createdAt).toLocaleDateString("fr-FR");

  return `
        <div class="order-card">
            <div class="order-header">
                <div class="order-info">
                    <div class="order-number">Commande ${order.id}</div>
                    <div class="order-date">${orderDate}</div>
                </div>
                <div class="order-status" style="background: ${
                  statusColors[order.status] || "#666"
                }">
                    ${statusLabels[order.status] || order.status}
                </div>
            </div>
            
            <div class="order-body">
                <div class="order-items-preview">
                    ${order.items
                      .slice(0, 3)
                      .map(
                        (item) => `
                        <div class="order-item-preview">
                            <img src="${
                              item.image || "images/default-product.jpg"
                            }" alt="${item.name}">
                            <div class="item-info">
                                <div class="item-name">${item.name}</div>
                                <div class="item-quantity">${
                                  item.quantity
                                } × ${item.price.toLocaleString()} CFA</div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                    
                    ${
                      order.items.length > 3
                        ? `
                        <div class="more-items">+${
                          order.items.length - 3
                        } autre${order.items.length - 3 > 1 ? "s" : ""}</div>
                    `
                        : ""
                    }
                </div>
                
                <div class="order-total">
                    <div class="total-label">Total</div>
                    <div class="total-amount">${order.totals.total.toLocaleString()} CFA</div>
                </div>
            </div>
            
            <div class="order-footer">
                <button class="btn btn-outline view-order-details" data-order-id="${
                  order.id
                }">
                    <i class="fas fa-eye"></i> Voir les détails
                </button>
                
                ${
                  order.status === "pending"
                    ? `
                    <button class="btn btn-outline cancel-order" data-order-id="${order.id}">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                `
                    : ""
                }
                
                ${
                  order.status === "delivered"
                    ? `
                    <button class="btn btn-outline reorder" data-order-id="${order.id}">
                        <i class="fas fa-redo"></i> Commander à nouveau
                    </button>
                `
                    : ""
                }
            </div>
        </div>
    `;
}

// Ajouter ces styles CSS pour la page des commandes
const ordersPageStyles = `
    .orders-page {
        padding: 8rem 9% 5rem;
        background: var(--light);
        min-height: 100vh;
    }
    
    .orders-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3rem;
        padding-bottom: 2rem;
        border-bottom: 2px solid var(--light-gray);
    }
    
    .orders-header h2 {
        font-size: 3rem;
        color: var(--dark);
    }
    
    .orders-count {
        font-size: 1.6rem;
        color: var(--gray);
        background: var(--white);
        padding: 0.5rem 1.5rem;
        border-radius: 20px;
        border: 1px solid var(--light-gray);
    }
    
    .order-card {
        background: var(--white);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        margin-bottom: 2rem;
        overflow: hidden;
        transition: var(--transition);
    }
    
    .order-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem;
        background: var(--light);
        border-bottom: 1px solid var(--light-gray);
    }
    
    .order-info {
        flex: 1;
    }
    
    .order-number {
        font-size: 1.8rem;
        color: var(--dark);
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .order-date {
        font-size: 1.4rem;
        color: var(--gray);
    }
    
    .order-status {
        padding: 0.5rem 1.5rem;
        border-radius: 20px;
        font-size: 1.4rem;
        color: white;
        font-weight: 500;
    }
    
    .order-body {
        padding: 2rem;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        border-bottom: 1px solid var(--light-gray);
    }
    
    .order-items-preview {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .order-item-preview {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }
    
    .order-item-preview img {
        width: 6rem;
        height: 6rem;
        object-fit: cover;
        border-radius: 8px;
    }
    
    .item-info {
        flex: 1;
    }
    
    .item-name {
        font-size: 1.5rem;
        color: var(--dark);
        margin-bottom: 0.3rem;
    }
    
    .item-quantity {
        font-size: 1.3rem;
        color: var(--gray);
    }
    
    .more-items {
        font-size: 1.4rem;
        color: var(--primary);
        text-align: center;
        padding: 1rem;
        background: var(--light);
        border-radius: 8px;
        cursor: pointer;
    }
    
    .order-total {
        text-align: right;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .total-label {
        font-size: 1.4rem;
        color: var(--gray);
        margin-bottom: 0.5rem;
    }
    
    .total-amount {
        font-size: 2.2rem;
        color: var(--primary);
        font-weight: 600;
    }
    
    .order-footer {
        padding: 2rem;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }
    
    .order-details-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        align-items: center;
        justify-content: center;
    }
    
    .order-details-modal.active {
        display: flex;
    }
    
    .order-details-content {
        background: var(--white);
        border-radius: var(--radius);
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        animation: modalSlideIn 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .order-body {
            grid-template-columns: 1fr;
        }
        
        .order-footer {
            flex-direction: column;
        }
        
        .order-footer .btn {
            width: 100%;
        }
    }
`;

// Ajouter les styles au document
if (!document.querySelector("#orders-styles")) {
  const styleElement = document.createElement("style");
  styleElement.id = "orders-styles";
  styleElement.textContent = ordersPageStyles;
  document.head.appendChild(styleElement);
}
