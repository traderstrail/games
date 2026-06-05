// ========================================
// EVENT SETTINGS - Edit this object for sales
// ========================================

var eventSettings = {
  enabled: true,
  title: "GRAND OPENING EVENT",
  discount: 5,
  endDate: "2026-12-31T23:59:59"
};

// ========================================
// EXCHANGE RATE - Edit this for PHP conversion
// ========================================

var EXCHANGE_RATE = 56;

// ========================================
// DISCORD LINK - Change once, updates all Buy buttons
// ========================================

var DISCORD_LINK = "https://discord.gg/YOURSERVER";

// ========================================
// HERO SETTINGS - Edit this object for hero section
// ========================================

var heroSettings = {
  backgroundImage: "images/hero-banner.svg",
  title: "Trader's Trail GameSeller",
  description: "Buy and sell gaming accounts, currencies, items and more. Trusted by thousands of gamers worldwide.",
  buttonText: "Browse Games",
  buttonLink: "#games"
};

// ========================================
// GAMES DATA - Add a new game by adding one object
// ========================================

var games = [
  {
    id: "growtopia",
    name: "Growtopia",
    page: "growtopia.html",
    image: "images/growtopia.svg",
    description: "Buy Growtopia Diamond Locks, World Locks, accounts and more at the best prices."
  },
  {
    id: "minecraft",
    name: "Minecraft",
    page: "minecraft.html",
    image: "images/minecraft.svg",
    description: "Premium Minecraft accounts, Minecoins, ranks and cosmetics available."
  },
  {
    id: "pixelworlds",
    name: "Pixel Worlds",
    page: "pixelworlds.html",
    image: "images/pixelworlds.svg",
    description: "Find Pixel Worlds gems, rare items, world packs and accounts for sale."
  },
  {
    id: "roblox",
    name: "Roblox",
    page: "roblox.html",
    image: "images/roblox.svg",
    description: "Roblox accounts with Robux, limiteds, gamepasses and more."
  },
  {
    id: "hayday",
    name: "Hay Day",
    page: "hayday.html",
    image: "images/hayday.svg",
    description: "Hay Day farms with coins, diamonds and farm packs available now."
  }
];

// ========================================
// PRODUCTS DATA - Add products without editing HTML
// ========================================

var productsData = {
  growtopia: [
    {
      name: "Blue Gem Lock",
      description: "100 Diamond Locks, instant delivery, best price guaranteed.",
      image: "images/products/growtopia-diamond-lock-pack.svg",
      originalPrice: 29.99,
      salePrice: 24.99,
      badge: "popular",
      totalSold: 0
    },
    {
      name: "World Lock Bundle",
      description: "500 World Locks, safe and fast delivery.",
      image: "images/products/growtopia-world-lock-bundle.svg",
      originalPrice: 14.99,
      salePrice: 11.99,
      badge: "sale",
      totalSold: 0
    },
    {
      name: "Premium Account",
      description: "Level 100+ account with rares and DLS.",
      image: "images/products/growtopia-premium-account.svg",
      originalPrice: 59.99,
      salePrice: 44.99,
      badge: "popular",
      totalSold: 0
    },
    {
      name: "Growtoken Pack",
      description: "10,000 Growtokens, cheapest on the market.",
      image: "images/products/growtopia-growtoken-pack.svg",
      originalPrice: 19.99,
      salePrice: 15.99,
      badge: null,
      totalSold: 0
    }
  ],
  minecraft: [
    {
      name: "Minecraft Java and Bedrock Edition | NO ban Hypixel |Random1-3 capes",
      description: "Full access Minecraft Java & Bedrock account.",
      image: "images/products/minecraft-account.svg",
      originalPrice: 13.50,
      salePrice: 24.99,
      badge: "popular",
      totalSold: 0
    },
    {
      name: "Minecraft: Java for PC Windows 10/11 Account|Full Access",
      description: "Full access Minecraft Java account.",
      image: "images/products/minecraft-minecoin-pack.svg",
      originalPrice: 12,
      salePrice: 39.99,
      badge: "popular",
      totalSold: 0
    },
    {
      name: "TLauncher Minecraft Java Edition |Full Access",
      description: "Not Minecraft Microsoft Account its TLauncher Minecraft Fresh new account.",
      image: "images/products/minecraft-lifetime-rank.svg",
      originalPrice: 2,
      salePrice: 19.99,
      badge: "popular",
      totalSold: 0
    },
    {
      name: "Minecraft Java & Bedrock Edition (PC) - Microsoft Store Key Global",
      description: "Global Microsoft Store digital key with instant delivery. Redeem directly on Microsoft Store and activate in the Philippines.",
      image: "images/products/minecraft-cosmetics-bundle.svg",
      originalPrice: 22.50,
      salePrice: 12.99,
      badge: "sale",
      totalSold: 0
    }
  ],
  pixelworlds: [
    {
      name: "100 Gems",
      description: "100 Gems, instantly added to your account.",
      image: "images/products/pixelworlds-100-gems.svg",
      originalPrice: 9.99,
      salePrice: 7.99,
      badge: "popular",
      totalSold: 0
    },
    {
      name: "500 Gems",
      description: "500 Gems, best value gem pack.",
      image: "images/products/pixelworlds-500-gems.svg",
      originalPrice: 39.99,
      salePrice: 29.99,
      badge: "sale",
      totalSold: 0
    },
    {
      name: "Starter Account",
      description: "Level 20+ with gems and rare items.",
      image: "images/products/pixelworlds-starter-account.svg",
      originalPrice: 19.99,
      salePrice: 14.99,
      badge: "new",
      totalSold: 0
    },
    {
      name: "World Pack",
      description: "Premium world with lock and items.",
      image: "images/products/pixelworlds-world-pack.svg",
      originalPrice: 24.99,
      salePrice: 19.99,
      badge: null,
      totalSold: 0
    }
  ],
  roblox: [
    {
      name: "1,000 Robux",
      description: "1,000 Robux added to your account instantly.",
      image: "images/products/roblox-1000-robux.svg",
      originalPrice: 14.99,
      salePrice: 11.99,
      badge: "popular",
      totalSold: 0
    },
    {
      name: "Limited Item",
      description: "Rare limited item, great investment.",
      image: "images/products/roblox-limited-item.svg",
      originalPrice: 99.99,
      salePrice: 74.99,
      badge: "sale",
      totalSold: 0
    },
    {
      name: "Gamepass",
      description: "Custom gamepass for your experience.",
      image: "images/products/roblox-gamepass.svg",
      originalPrice: 9.99,
      salePrice: 7.99,
      badge: null,
      totalSold: 0
    },
    {
      name: "Bloxfruit Account",
      description: "Max level Bloxfruit account with fruits.",
      image: "images/products/roblox-bloxfruit-account.svg",
      originalPrice: 44.99,
      salePrice: 34.99,
      badge: "popular",
      totalSold: 0
    }
  ],
  hayday: [
    {
      name: "100,000 Coins",
      description: "Coins delivered to your farm quickly.",
      image: "images/products/hayday-100000-coins.svg",
      originalPrice: 12.99,
      salePrice: 9.99,
      badge: "popular",
      totalSold: 0
    },
    {
      name: "500 Diamonds",
      description: "Diamonds for upgrades and decorations.",
      image: "images/products/hayday-500-diamonds.svg",
      originalPrice: 39.99,
      salePrice: 29.99,
      badge: "sale",
      totalSold: 0
    },
    {
      name: "Max Level Farm",
      description: "Level 200+ farm with coins and diamonds.",
      image: "images/products/hayday-max-level-farm.svg",
      originalPrice: 79.99,
      salePrice: 59.99,
      badge: null,
      totalSold: 1
    },
    {
      name: "Farm Pack",
      description: "Starter pack with coins, diamonds and supplies.",
      image: "images/products/hayday-farm-pack.svg",
      originalPrice: 24.99,
      salePrice: 19.99,
      badge: "new",
      totalSold: 0
    }
  ]
};

// ========================================


// ========================================
// All searchable items (games + products)
// ========================================

var searchableItems = [];

games.forEach(game => {
  searchableItems.push({
    name: game.name,
    type: "Game",
    page: game.page,
    image: game.image
  });
  if (productsData[game.id]) {
    productsData[game.id].forEach(product => {
      searchableItems.push({
        name: product.name,
        type: game.name + " Product",
        page: game.page,
        image: product.image
      });
    });
  }
});

// ========================================
// DOM CONTENT LOADED
// ========================================

function renderSite() {
  buildNavbar();
  buildEventBanner();
  buildFooter();
  buildPaymentMethods();

  const currentPage = getCurrentPage();

  if (currentPage === "index") {
    buildHero();
    buildGameCards();
  } else {
    const game = games.find(g => g.page === currentPage + ".html");
    if (game) {
      buildGameHeader(game);
      buildProductCards(game.id);
    }
  }

  initSearch();
  initAnimations();
  initNavbarScroll();
  initMobileToggle();
  updateCountdown();
}

window.reinitSite = function () {
  const selectors = [
    "#eventBanner", "#navbar", "#hero", "#games",
    ".game-header", ".products-section", ".payment-section",
    ".footer", ".toast"
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.remove());
  });
  renderSite();
};

document.addEventListener("DOMContentLoaded", function () {
  if (getCurrentPage() === "admin") return;
  renderSite();
  setInterval(updateCountdown, 1000);
});

// ========================================
// PAGE DETECTION
// ========================================

function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split("/").pop();
  if (!filename || filename === "" || filename === "index.html") {
    return "index";
  }
  return filename.replace(".html", "");
}

// ========================================
// BUILD NAVBAR
// ========================================

function buildNavbar() {
  const navHTML = `
    <nav class="navbar" id="navbar">
      <div class="navbar-inner">
        <a href="index.html" class="navbar-logo">
          <img src="images/logo.svg" alt="Logo" onerror="this.style.display='none'">
        </a>
        <div class="navbar-search">
          <span class="navbar-search-icon">&#128269;</span>
          <input type="text" id="searchInput" placeholder="Search games, products..." autocomplete="off">
          <div class="search-results" id="searchResults"></div>
        </div>
        <button class="navbar-toggle" id="navToggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="navbar-links" id="navLinks">
          <a href="index.html">Home</a>
          <a href="growtopia.html">Growtopia</a>
          <a href="minecraft.html">Minecraft</a>
          <a href="pixelworlds.html">Pixel Worlds</a>
          <a href="roblox.html">Roblox</a>
          <a href="hayday.html">Hay Day</a>
        </div>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML("afterbegin", navHTML);
}

// ========================================
// BUILD EVENT BANNER
// ========================================

function buildEventBanner() {
  if (!eventSettings.enabled) return;

  const banner = document.createElement("div");
  banner.className = "event-banner active";
  banner.id = "eventBanner";
  banner.innerHTML = `
    <div class="event-banner-title">🔥 ${eventSettings.title}</div>
    <div class="event-banner-discount">${eventSettings.discount}% OFF ALL PRODUCTS</div>
    <div class="event-banner-timer">Event Ends In: <span id="countdownTimer">--</span></div>
    <button class="event-banner-close" id="closeBanner">&times;</button>
  `;

  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.parentNode.insertBefore(banner, navbar);
  } else {
    document.body.insertAdjacentHTML("afterbegin", banner.outerHTML);
  }

  document.getElementById("closeBanner")?.addEventListener("click", function () {
    document.getElementById("eventBanner").classList.remove("active");
  });
}

// ========================================
// COUNTDOWN TIMER
// ========================================

function updateCountdown() {
  const timerEl = document.getElementById("countdownTimer");
  if (!timerEl) return;

  const end = new Date(eventSettings.endDate);
  const now = new Date();
  const diff = end - now;

  if (diff <= 0) {
    timerEl.textContent = "Event Ended";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timerEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// ========================================
// BUILD HERO SECTION
// ========================================

function buildHero() {
  const hero = document.createElement("section");
  hero.className = "hero";
  hero.id = "hero";
  hero.style.backgroundImage = `url(${heroSettings.backgroundImage})`;

  hero.innerHTML = `
    <div class="hero-content">
      <h1>${heroSettings.title}</h1>
      <p>${heroSettings.description}</p>
      <a href="${heroSettings.buttonLink}" class="hero-btn">${heroSettings.buttonText}</a>
      <a href="#" class="hero-btn hero-btn-secondary">Proof of Legitimacy</a>
    </div>
  `;

  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.insertAdjacentElement("afterend", hero);
  }
}

// ========================================
// BUILD GAME CARDS
// ========================================

function buildGameCards() {
  const section = document.createElement("section");
  section.className = "games-section fade-in";
  section.id = "games";

  let cardsHTML = `<h2 class="section-title">Featured Games</h2>
    <p class="section-subtitle">Choose a game to browse our products</p>
    <div class="games-grid">`;

  games.forEach(game => {
    cardsHTML += `
      <div class="game-card">
        <img src="${game.image}" alt="${game.name}" class="game-card-image" onerror="handleGameImageError(this)">
        <div class="game-card-body">
          <h3>${game.name}</h3>
          <p>${game.description}</p>
          <a href="${game.page}" class="game-card-btn">Browse Products</a>
        </div>
      </div>
    `;
  });

  cardsHTML += `</div></section>`;

  section.innerHTML = cardsHTML;

  const hero = document.getElementById("hero");
  if (hero) {
    hero.insertAdjacentElement("afterend", section);
  }
}

// ========================================
// BUILD GAME HEADER (on game pages)
// ========================================

function buildGameHeader(game) {
  const header = document.createElement("div");
  header.className = "game-header";
  header.style.backgroundImage = `url(${game.image})`;

  header.innerHTML = `
    <div class="game-header-content">
      <h1>${game.name}</h1>
      <p>${game.description}</p>
    </div>
  `;

  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.insertAdjacentElement("afterend", header);
  }
}

// ========================================
// BUILD PRODUCT CARDS (on game pages)
// ========================================

function buildProductCards(gameId) {
  const products = productsData[gameId];
  if (!products || products.length === 0) return;

  const section = document.createElement("section");
  section.className = "products-section";

  let html = `<h2 class="section-title">Our Products</h2>
    <p class="section-subtitle">Browse our selection of ${gameId} products</p>
    <div class="products-grid">`;

  const eventActive = eventSettings.enabled;
  const eventEnded = new Date(eventSettings.endDate) <= new Date();

  products.forEach(product => {
    const badgeHTML = product.badge
      ? `<span class="product-badge badge-${product.badge}">${product.badge}</span>`
      : "";

    let pricingHTML;
    if (eventActive && !eventEnded && product.originalPrice) {
      const salePrice = product.originalPrice * (1 - eventSettings.discount / 100);
      const salePricePHP = salePrice * EXCHANGE_RATE;
      pricingHTML = `
        <span class="product-original-price">$${product.originalPrice.toFixed(2)}</span>
        <span class="product-sale-price">$${salePrice.toFixed(2)}</span>
        <span class="product-php-price">₱${salePricePHP.toFixed(2)}</span>
      `;
    } else {
      const displayPrice = product.originalPrice || 0;
      const displayPricePHP = displayPrice * EXCHANGE_RATE;
      pricingHTML = `
        <span class="product-sale-price">$${displayPrice.toFixed(2)}</span>
        <span class="product-php-price">₱${displayPricePHP.toFixed(2)}</span>
      `;
    }

    html += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-card-image" onerror="handleProductImageError(this)">
        <div class="product-card-body">
          ${badgeHTML}
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-pricing">
            ${pricingHTML}
          </div>
          <button class="product-buy-btn" onclick="handleBuyClick('${product.name}')">Buy Now</button>
        </div>
      </div>
    `;
  });

  html += `</div></section>`;

  section.innerHTML = html;

  const header = document.querySelector(".game-header");
  if (header) {
    header.insertAdjacentElement("afterend", section);
  }
}

// ========================================
// BUILD PAYMENT METHODS
// ========================================

var paymentMethods = [
  { name: "GCash", image: "images/gcash.svg", desc: "Instant bank transfers & payments" },
  { name: "PayMaya", image: "images/paymaya.svg", desc: "Pay via Maya wallet or card" },
  { name: "PayPal", image: "images/paypal.svg", desc: "Secure international payments" }
];

function buildPaymentMethods() {
  const section = document.createElement("section");
  section.className = "payment-section fade-in";

  let html = `
    <h2 class="section-title">We Accept</h2>
    <p class="section-subtitle">Secure and trusted payment methods</p>
    <div class="payment-grid">
  `;

  paymentMethods.forEach(p => {
    html += `
      <div class="payment-card">
        <img src="${p.image}" alt="${p.name}" class="payment-logo" onerror="this.style.display='none'">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
      </div>
    `;
  });

  html += `</div></section>`;
  section.innerHTML = html;

  const footer = document.querySelector(".footer");
  if (footer) {
    footer.parentNode.insertBefore(section, footer);
  } else {
    document.body.appendChild(section);
  }
}

// ========================================
// BUILD FOOTER
// ========================================

function buildFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <p>&copy; ${new Date().getFullYear()} Trader's Trail GameSeller. All rights reserved.</p>
  `;

  document.body.appendChild(footer);
}

// ========================================
// HANDLE BUY CLICK
// ========================================

function handleBuyClick(productName) {
  window.open(DISCORD_LINK, "_blank");

  for (const gameId in productsData) {
    const product = productsData[gameId].find(p => p.name === productName);
    if (product) {
      break;
    }
  }

  showToast("Redirecting to Discord for: " + productName);
}

// ========================================
// TOAST NOTIFICATION
// ========================================

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("active");
  });

  setTimeout(() => {
    toast.classList.remove("active");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ========================================
// SEARCH SYSTEM
// ========================================

function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (!searchInput || !searchResults) return;

  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();

    if (!query) {
      searchResults.classList.remove("active");
      return;
    }

    const results = searchableItems.filter(item =>
      item.name.toLowerCase().includes(query)
    );

    if (results.length === 0) {
      searchResults.innerHTML = `<div class="search-no-results">No results found</div>`;
      searchResults.classList.add("active");
      return;
    }

    let html = "";
    results.slice(0, 8).forEach(item => {
      html += `
        <div class="search-result-item" onclick="navigateTo('${item.page}')">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
          <div>
            <div class="result-name">${item.name}</div>
            <div class="result-type">${item.type}</div>
          </div>
        </div>
      `;
    });

    searchResults.innerHTML = html;
    searchResults.classList.add("active");
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".navbar-search")) {
      searchResults.classList.remove("active");
    }
  });
}

function navigateTo(page) {
  window.location.href = page;
}

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================

function initAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");

  if (!fadeElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => observer.observe(el));
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

function initNavbarScroll() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// ========================================
// MOBILE TOGGLE
// ========================================

function initMobileToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    links.classList.toggle("open");
  });

  const linkItems = links.querySelectorAll("a");
  linkItems.forEach(link => {
    link.addEventListener("click", function () {
      links.classList.remove("open");
    });
  });
}

// ========================================
// IMAGE ERROR HANDLERS
// ========================================

function handleGameImageError(img) {
  img.style.display = "none";
}

function handleProductImageError(img) {
  img.style.display = "none";
}

// ========================================
// Expose to global scope for onclick handlers
// ========================================

window.handleBuyClick = handleBuyClick;
window.navigateTo = navigateTo;
window.handleGameImageError = handleGameImageError;
window.handleProductImageError = handleProductImageError;
