// ========================================
// ADMIN PANEL - Full CRUD with Firebase
// ========================================

const COLLECTIONS = {
  GAMES: "games",
  PRODUCTS: "products",
  SETTINGS: "settings"
};

// ========================================
// DOM refs
// ========================================

const $ = id => document.getElementById(id);
const loginContainer = $("loginContainer");
const dashboard = $("dashboard");
const loginForm = $("loginForm");
const loginError = $("loginError");
const loginBtn = $("loginBtn");
const showSignup = $("showSignup");
const logoutBtn = $("logoutBtn");
const adminEmail = $("adminEmail");
const adminToast = $("adminToast");

const auth = window.__firebaseAuth;
const db = window.__firebaseDb;

// Check Firebase is configured
if (!window.__firebaseReady) {
  document.body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px;">
      <div style="background:#13131a;border:1px solid rgba(108,92,231,0.2);border-radius:16px;padding:40px;max-width:500px;text-align:center;">
        <h1 style="margin-bottom:12px;">🔐 Firebase Required</h1>
        <p style="color:#888;margin-bottom:24px;line-height:1.6;">
          To use the admin panel, you need to configure Firebase first.<br><br>
          1. Go to <strong>console.firebase.google.com</strong><br>
          2. Create a project (or use existing)<br>
          3. Enable <strong>Authentication</strong> → Sign-in method → <strong>Email/Password</strong><br>
          4. Enable <strong>Cloud Firestore</strong> → Start in test mode<br>
          5. Copy your web app config to <strong>js/firebase-config.js</strong>
        </p>
        <a href="index.html" style="display:inline-block;padding:12px 32px;border-radius:10px;background:#6c5ce7;color:#fff;text-decoration:none;font-weight:600;">Back to Store</a>
      </div>
    </div>
  `;
  throw new Error("Firebase not configured");
}

// ========================================
// AUTH
// ========================================

loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  const email = $("loginEmail").value.trim();
  const password = $("loginPassword").value;
  loginError.style.display = "none";
  loginBtn.disabled = true;
  loginBtn.textContent = "Signing in...";

  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    loginError.textContent = err.message;
    loginError.style.display = "block";
    loginBtn.disabled = false;
    loginBtn.textContent = "Sign In";
  }
});

auth.onAuthStateChanged(user => {
  loginBtn.disabled = false;
  loginBtn.textContent = "Sign In";

  if (user) {
    loginContainer.style.display = "none";
    dashboard.classList.add("active");
    adminEmail.textContent = user.email;
    initAdmin();
  } else {
    loginContainer.style.display = "flex";
    dashboard.classList.remove("active");
  }
});

logoutBtn.addEventListener("click", () => {
  auth.signOut();
});

// ========================================
// TOAST
// ========================================

function showToast(msg, type = "success") {
  adminToast.textContent = msg;
  adminToast.className = "admin-toast " + type;
  requestAnimationFrame(() => adminToast.classList.add("show"));
  setTimeout(() => adminToast.classList.remove("show"), 3000);
}

// ========================================
// SIDEBAR NAV
// ========================================

const sidebarLinks = document.querySelectorAll("#adminSidebar a");
const tabContents = document.querySelectorAll(".tab-content");

sidebarLinks.forEach(link => {
  link.addEventListener("click", () => {
    sidebarLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    tabContents.forEach(t => t.classList.remove("active"));
    const tab = $("tab-" + link.dataset.tab);
    if (tab) tab.classList.add("active");
  });
});

// ========================================
// INIT ADMIN - load all data
// ========================================

async function seedFirestore() {
  // Check if already seeded
  const snap = await db.collection(COLLECTIONS.GAMES).limit(1).get();
  if (!snap.empty) return; // Already has data

  console.log("[Firebase] Seeding Firestore with default data...");

  const batch = db.batch();

  // Seed games
  if (typeof games !== "undefined") {
    games.forEach(game => {
      const ref = db.collection(COLLECTIONS.GAMES).doc(game.id);
      batch.set(ref, {
        id: game.id,
        name: game.name,
        page: game.page,
        image: game.image,
        description: game.description
      });

      // Seed products for this game
      if (productsData[game.id]) {
        productsData[game.id].forEach(product => {
          const pId = product.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
          const pRef = db.collection(COLLECTIONS.PRODUCTS).doc(game.id).collection("items").doc(pId || "product-" + Date.now());
          batch.set(pRef, {
            name: product.name,
            description: product.description,
            image: product.image,
            originalPrice: product.originalPrice,
            salePrice: product.salePrice || product.originalPrice,
            badge: product.badge || null,
            totalSold: product.totalSold || 0
          });
        });
      }
    });
  }

  // Seed event settings
  if (typeof eventSettings !== "undefined") {
    batch.set(db.collection(COLLECTIONS.SETTINGS).doc("event"), {
      enabled: eventSettings.enabled,
      title: eventSettings.title,
      discount: eventSettings.discount,
      endDate: eventSettings.endDate
    });
  }

  // Seed exchange rate
  if (typeof EXCHANGE_RATE !== "undefined") {
    batch.set(db.collection(COLLECTIONS.SETTINGS).doc("exchange"), {
      rate: EXCHANGE_RATE
    });
  }

  // Seed discord link
  if (typeof DISCORD_LINK !== "undefined") {
    batch.set(db.collection(COLLECTIONS.SETTINGS).doc("discord"), {
      link: DISCORD_LINK
    });
  }

  // Seed hero settings
  if (typeof heroSettings !== "undefined") {
    batch.set(db.collection(COLLECTIONS.SETTINGS).doc("hero"), {
      backgroundImage: heroSettings.backgroundImage,
      title: heroSettings.title,
      description: heroSettings.description,
      buttonText: heroSettings.buttonText,
      buttonLink: heroSettings.buttonLink
    });
  }

  // Seed payment methods
  if (typeof paymentMethods !== "undefined") {
    paymentMethods.forEach(pm => {
      const ref = db.collection(COLLECTIONS.SETTINGS).doc("payments").collection("list").doc(pm.name.toLowerCase());
      batch.set(ref, {
        name: pm.name,
        image: pm.image,
        description: pm.desc
      });
    });
  }

  await batch.commit();
  console.log("[Firebase] Seeding complete");
}

async function initAdmin() {
  await seedFirestore();
  await Promise.all([
    loadGames(),
    loadPayments(),
    loadEventSettings(),
    loadHeroSettings(),
    loadExchangeRate(),
    loadDiscordLink()
  ]);
  populateGameSelect();
}

// ========================================
// GAMES CRUD
// ========================================

async function loadGames() {
  const list = $("gamesList");
  const snap = await db.collection(COLLECTIONS.GAMES).get();
  const items = [];
  snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
  if (items.length === 0) {
    list.innerHTML = '<div class="empty-state">No games yet. Add one above!</div>';
    return;
  }
  list.innerHTML = items.map(g => `
    <div class="item-row" data-id="${g.id}">
      <div class="info">
        <div class="name">${g.name}</div>
        <div class="desc">ID: ${g.id} | ${g.description || ""}</div>
      </div>
      <div class="actions">
        <button class="btn btn-sm btn-danger" onclick="deleteGame('${g.id}')">Delete</button>
      </div>
    </div>
  `).join("");
}

$("addGameBtn").addEventListener("click", async () => {
  const id = $("gameId").value.trim().toLowerCase().replace(/\s+/g, "");
  const name = $("gameName").value.trim();
  const image = $("gameImage").value.trim();
  const description = $("gameDesc").value.trim();

  if (!id || !name) return showToast("Game ID and Name are required", "error");

  try {
    await db.collection(COLLECTIONS.GAMES).doc(id).set({
      id, name,
      image: image || `images/${id}.svg`,
      description: description || `${name} products`,
      page: `${id}.html`
    });
    // Also create a .html page if it doesn't exist
    await ensureGamePage(id, name);
    $("gameId").value = "";
    $("gameName").value = "";
    $("gameImage").value = "";
    $("gameDesc").value = "";
    await loadGames();
    populateGameSelect();
    showToast(`Game "${name}" added!`);
  } catch (err) {
    showToast(err.message, "error");
  }
});

async function ensureGamePage(id, name) {
  const pagePath = `${id}.html`;
  // Check if file exists via fetch (won't work in browser), just create the Firestore record
  // The actual HTML file creation would need backend - we note it for the user
  console.log(`Game page ${pagePath} should be created manually or via build step`);
}

window.deleteGame = async function (id) {
  if (!confirm("Delete this game and all its products?")) return;
  try {
    const snap = await db.collection(COLLECTIONS.PRODUCTS).doc(id).collection("items").get();
    const batch = db.batch();
    snap.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    await db.collection(COLLECTIONS.GAMES).doc(id).delete();
    await loadGames();
    populateGameSelect();
    showToast("Game deleted");
  } catch (err) {
    showToast(err.message, "error");
  }
};

// ========================================
// PRODUCTS CRUD
// ========================================

async function populateGameSelect() {
  const select = $("productGameSelect");
  const currentVal = select.value;
  select.innerHTML = '<option value="">-- Select a game --</option>';
  const snap = await db.collection(COLLECTIONS.GAMES).get();
  const items = [];
  snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
  items.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g.id;
    opt.textContent = g.name;
    select.appendChild(opt);
  });
  select.value = currentVal;
  if (select.value) handleGameSelect();
}

$("productGameSelect").addEventListener("change", handleGameSelect);

async function handleGameSelect() {
  const gameId = $("productGameSelect").value;
  const addCard = $("addProductCard");
  const listCard = $("productsListCard");

  if (!gameId) {
    addCard.style.display = "none";
    listCard.style.display = "none";
    return;
  }

  addCard.style.display = "block";
  listCard.style.display = "block";

  // Get game name
  const gameSnap = await db.collection(COLLECTIONS.GAMES).doc(gameId).get();
  const gameName = gameSnap.exists ? gameSnap.data().name : gameId;
  $("currentGameLabel").textContent = gameName;

  await loadProducts(gameId);
}

async function loadProducts(gameId) {
  const list = $("productsList");
  const snap = await db.collection(COLLECTIONS.PRODUCTS).doc(gameId).collection("items").get();
  const products = [];
  snap.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
  if (products.length === 0) {
    list.innerHTML = '<div class="empty-state">No products for this game yet.</div>';
    return;
  }
  list.innerHTML = products.map(p => {
    const safeId = p.id.replace(/'/g, "\\'");
    return `
    <div class="item-row" data-id="${safeId}">
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="desc">$${p.originalPrice || 0} | Badge: ${p.badge || "none"} | Sold: ${p.totalSold || 0}</div>
      </div>
      <div class="actions">
        <button class="btn btn-sm btn-danger" onclick="deleteProduct('${gameId}','${safeId}')">Delete</button>
      </div>
    </div>`;
  }).join("");
}

$("addProductBtn").addEventListener("click", async () => {
  const gameId = $("productGameSelect").value;
  if (!gameId) return showToast("Select a game first", "error");

  const name = $("productName").value.trim();
  const desc = $("productDesc").value.trim();
  const origPrice = parseFloat($("productOrigPrice").value) || 0;
  const salePrice = parseFloat($("productSalePrice").value) || origPrice;
  const badge = $("productBadge").value || null;
  const image = $("productImage").value.trim();

  if (!name) return showToast("Product name is required", "error");

  try {
    let productId = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    if (!productId) productId = "product-" + Date.now();
    await db.collection(COLLECTIONS.PRODUCTS).doc(gameId).collection("items").doc(productId).set({
      name,
      description: desc,
      image: image || `images/products/${productId}.svg`,
      originalPrice: origPrice,
      salePrice: salePrice,
      badge: badge,
      totalSold: 0
    });
    $("productName").value = "";
    $("productDesc").value = "";
    $("productOrigPrice").value = "";
    $("productSalePrice").value = "";
    $("productBadge").value = "";
    $("productImage").value = "";
    const result = await loadProducts(gameId);
    showToast(`Product "${name}" added!`);
  } catch (err) {
    showToast(err.message, "error");
  }
});

window.deleteProduct = async function (gameId, productId) {
  if (!confirm("Delete this product?")) return;
  try {
    await db.collection(COLLECTIONS.PRODUCTS).doc(gameId).collection("items").doc(productId).delete();
    await loadProducts(gameId);
    showToast("Product deleted");
  } catch (err) {
    showToast(err.message, "error");
  }
};

// ========================================
// EVENT SETTINGS
// ========================================

async function loadEventSettings() {
  const snap = await db.collection(COLLECTIONS.SETTINGS).doc("event").get();
  const data = snap.exists ? snap.data() : null;
  if (!data) {
    $("eventEnabled").checked = true;
    $("eventTitle").value = "GRAND OPENING EVENT";
    $("eventDiscount").value = 5;
    return;
  }
  $("eventEnabled").checked = data.enabled !== false;
  $("eventTitle").value = data.title || "";
  $("eventDiscount").value = data.discount || 0;
  if (data.endDate) {
    const d = new Date(data.endDate);
    $("eventEndDate").value = d.toISOString().slice(0, 16);
  }
}

$("saveEventBtn").addEventListener("click", async () => {
  const enabled = $("eventEnabled").checked;
  const title = $("eventTitle").value.trim();
  const discount = parseFloat($("eventDiscount").value) || 0;
  const endDateRaw = $("eventEndDate").value;
  const endDate = endDateRaw ? new Date(endDateRaw).toISOString() : new Date("2026-12-31").toISOString();

  try {
    await db.collection(COLLECTIONS.SETTINGS).doc("event").set({ enabled, title, discount, endDate }, { merge: true });
    showToast("Event settings saved!");
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ========================================
// HERO SETTINGS
// ========================================

async function loadHeroSettings() {
  const snap = await db.collection(COLLECTIONS.SETTINGS).doc("hero").get();
  const data = snap.exists ? snap.data() : null;
  if (!data) {
    $("heroBg").value = "images/hero-banner.svg";
    $("heroTitle").value = "Trader's Trail GameSeller";
    $("heroDesc").value = "Buy and sell gaming accounts, currencies, items and more.";
    $("heroBtnText").value = "Browse Games";
    $("heroBtnLink").value = "#games";
    return;
  }
  $("heroBg").value = data.backgroundImage || "";
  $("heroTitle").value = data.title || "";
  $("heroDesc").value = data.description || "";
  $("heroBtnText").value = data.buttonText || "";
  $("heroBtnLink").value = data.buttonLink || "";
}

$("saveHeroBtn").addEventListener("click", async () => {
  try {
    await db.collection(COLLECTIONS.SETTINGS).doc("hero").set({
      backgroundImage: $("heroBg").value.trim(),
      title: $("heroTitle").value.trim(),
      description: $("heroDesc").value.trim(),
      buttonText: $("heroBtnText").value.trim(),
      buttonLink: $("heroBtnLink").value.trim()
    }, { merge: true });
    showToast("Hero settings saved!");
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ========================================
// EXCHANGE RATE
// ========================================

async function loadExchangeRate() {
  const snap = await db.collection(COLLECTIONS.SETTINGS).doc("exchange").get();
  const data = snap.exists ? snap.data() : null;
  $("exchangeRate").value = data?.rate || 56;
}

$("saveExchangeBtn").addEventListener("click", async () => {
  const rate = parseFloat($("exchangeRate").value) || 56;
  try {
    await db.collection(COLLECTIONS.SETTINGS).doc("exchange").set({ rate }, { merge: true });
    showToast("Exchange rate saved!");
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ========================================
// DISCORD LINK
// ========================================

async function loadDiscordLink() {
  const snap = await db.collection(COLLECTIONS.SETTINGS).doc("discord").get();
  const data = snap.exists ? snap.data() : null;
  $("discordLink").value = data?.link || "https://discord.gg/YOURSERVER";
}

$("saveDiscordBtn").addEventListener("click", async () => {
  const link = $("discordLink").value.trim();
  if (!link) return showToast("Link is required", "error");
  try {
    await db.collection(COLLECTIONS.SETTINGS).doc("discord").set({ link }, { merge: true });
    showToast("Discord link saved!");
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ========================================
// PAYMENTS CRUD
// ========================================

async function loadPayments() {
  const list = $("paymentsList");
  const snap = await db.collection(COLLECTIONS.SETTINGS).doc("payments").collection("list").get();
  const payments = [];
  snap.forEach(doc => payments.push({ id: doc.id, ...doc.data() }));
  if (payments.length === 0) {
    list.innerHTML = '<div class="empty-state">No payment methods yet.</div>';
    return;
  }
  list.innerHTML = payments.map(p => `
    <div class="item-row" data-id="${p.id}">
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="desc">${p.description || ""}</div>
      </div>
      <div class="actions">
        <button class="btn btn-sm btn-danger" onclick="deletePayment('${p.id}')">Delete</button>
      </div>
    </div>
  `).join("");
}

$("addPaymentBtn").addEventListener("click", async () => {
  const name = $("paymentName").value.trim();
  const image = $("paymentImage").value.trim();
  const desc = $("paymentDesc").value.trim();
  if (!name) return showToast("Payment name is required", "error");

  try {
    const id = name.toLowerCase().replace(/\s+/g, "-");
    await db.collection(COLLECTIONS.SETTINGS).doc("payments").collection("list").doc(id).set({
      name, image, description: desc
    });
    $("paymentName").value = "";
    $("paymentImage").value = "";
    $("paymentDesc").value = "";
    await loadPayments();
    showToast(`Payment "${name}" added!`);
  } catch (err) {
    showToast(err.message, "error");
  }
});

window.deletePayment = async function (id) {
  if (!confirm("Delete this payment method?")) return;
  try {
    await db.collection(COLLECTIONS.SETTINGS).doc("payments").collection("list").doc(id).delete();
    await loadPayments();
    showToast("Payment method deleted");
  } catch (err) {
    showToast(err.message, "error");
  }
};
