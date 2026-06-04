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

let isSignupMode = false;

showSignup.addEventListener("click", e => {
  e.preventDefault();
  isSignupMode = !isSignupMode;
  loginBtn.textContent = isSignupMode ? "Create Account" : "Sign In";
  showSignup.textContent = isSignupMode ? "Already have an account? Sign in" : "First time? Create an account";
  loginError.style.display = "none";
});

loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  const email = $("loginEmail").value.trim();
  const password = $("loginPassword").value;
  loginError.style.display = "none";
  loginBtn.disabled = true;
  loginBtn.textContent = "Please wait...";

  try {
    if (isSignupMode) {
      await auth.createUserWithEmailAndPassword(email, password);
    } else {
      await auth.signInWithEmailAndPassword(email, password);
    }
  } catch (err) {
    loginError.textContent = err.message;
    loginError.style.display = "block";
    loginBtn.disabled = false;
    loginBtn.textContent = isSignupMode ? "Create Account" : "Sign In";
  }
});

auth.onAuthStateChanged(user => {
  loginBtn.disabled = false;
  loginBtn.textContent = isSignupMode ? "Create Account" : "Sign In";

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
// FIRESTORE HELPERS
// ========================================

async function getDoc(path) {
  const snap = await db.doc(path).get();
  return snap.exists ? snap.data() : null;
}

async function setDoc(path, data) {
  await db.doc(path).set(data, { merge: true });
}

async function deleteDoc(path) {
  await db.doc(path).delete();
}

async function getCollection(path) {
  const snap = await db.collection(path).get();
  const arr = [];
  snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
  return arr;
}

// ========================================
// INIT ADMIN - load all data
// ========================================

async function initAdmin() {
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
  const games = await getCollection(COLLECTIONS.GAMES);
  if (games.length === 0) {
    list.innerHTML = '<div class="empty-state">No games yet. Add one above!</div>';
    return;
  }
  list.innerHTML = games.map(g => `
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
    // Delete all products for this game
    const products = await getCollection(`${COLLECTIONS.PRODUCTS}/${id}/items`);
    await Promise.all(products.map(p => deleteDoc(`${COLLECTIONS.PRODUCTS}/${id}/items/${p.id}`)));
    await deleteDoc(`${COLLECTIONS.GAMES}/${id}`);
    await loadGames();
    populateGameSelect();
    // Also switch to products tab and reset
    showToast("Game deleted");
  } catch (err) {
    showToast(err.message, "error");
  }
};

// ========================================
// PRODUCTS CRUD
// ========================================

function populateGameSelect() {
  const select = $("productGameSelect");
  const currentVal = select.value;
  select.innerHTML = '<option value="">-- Select a game --</option>';
  getCollection(COLLECTIONS.GAMES).then(games => {
    games.forEach(g => {
      const opt = document.createElement("option");
      opt.value = g.id;
      opt.textContent = g.name;
      select.appendChild(opt);
    });
    select.value = currentVal;
    if (select.value) handleGameSelect();
  });
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
  const products = await getCollection(`${COLLECTIONS.PRODUCTS}/${gameId}/items`);
  if (products.length === 0) {
    list.innerHTML = '<div class="empty-state">No products for this game yet.</div>';
    return;
  }
  list.innerHTML = products.map(p => `
    <div class="item-row" data-id="${p.id}">
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="desc">$${p.originalPrice || 0} | Badge: ${p.badge || "none"} | Sold: ${p.totalSold || 0}</div>
      </div>
      <div class="actions">
        <button class="btn btn-sm btn-danger" onclick="deleteProduct('${gameId}','${p.id}')">Delete</button>
      </div>
    </div>
  `).join("");
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
    const productId = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
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
    await loadProducts(gameId);
    showToast(`Product "${name}" added!`);
  } catch (err) {
    showToast(err.message, "error");
  }
});

window.deleteProduct = async function (gameId, productId) {
  if (!confirm("Delete this product?")) return;
  try {
    await deleteDoc(`${COLLECTIONS.PRODUCTS}/${gameId}/items/${productId}`);
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
  const data = await getDoc(`${COLLECTIONS.SETTINGS}/event`);
  if (!data) {
    // Set defaults
    $("eventEnabled").checked = true;
    $("eventTitle").value = "GRAND OPENING EVENT";
    $("eventDiscount").value = 5;
    return;
  }
  $("eventEnabled").checked = data.enabled !== false;
  $("eventTitle").value = data.title || "";
  $("eventDiscount").value = data.discount || 0;
  if (data.endDate) {
    // Convert to datetime-local format
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
    await setDoc(`${COLLECTIONS.SETTINGS}/event`, { enabled, title, discount, endDate });
    showToast("Event settings saved!");
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ========================================
// HERO SETTINGS
// ========================================

async function loadHeroSettings() {
  const data = await getDoc(`${COLLECTIONS.SETTINGS}/hero`);
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
    await setDoc(`${COLLECTIONS.SETTINGS}/hero`, {
      backgroundImage: $("heroBg").value.trim(),
      title: $("heroTitle").value.trim(),
      description: $("heroDesc").value.trim(),
      buttonText: $("heroBtnText").value.trim(),
      buttonLink: $("heroBtnLink").value.trim()
    });
    showToast("Hero settings saved!");
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ========================================
// EXCHANGE RATE
// ========================================

async function loadExchangeRate() {
  const data = await getDoc(`${COLLECTIONS.SETTINGS}/exchange`);
  $("exchangeRate").value = data?.rate || 56;
}

$("saveExchangeBtn").addEventListener("click", async () => {
  const rate = parseFloat($("exchangeRate").value) || 56;
  try {
    await setDoc(`${COLLECTIONS.SETTINGS}/exchange`, { rate });
    showToast("Exchange rate saved!");
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ========================================
// DISCORD LINK
// ========================================

async function loadDiscordLink() {
  const data = await getDoc(`${COLLECTIONS.SETTINGS}/discord`);
  $("discordLink").value = data?.link || "https://discord.gg/YOURSERVER";
}

$("saveDiscordBtn").addEventListener("click", async () => {
  const link = $("discordLink").value.trim();
  if (!link) return showToast("Link is required", "error");
  try {
    await setDoc(`${COLLECTIONS.SETTINGS}/discord`, { link });
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
  const payments = await getCollection(`${COLLECTIONS.SETTINGS}/payments`);
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
    await deleteDoc(`${COLLECTIONS.SETTINGS}/payments/list/${id}`);
    await loadPayments();
    showToast("Payment method deleted");
  } catch (err) {
    showToast(err.message, "error");
  }
};
