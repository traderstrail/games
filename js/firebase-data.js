// ========================================
// FIREBASE DATA LOADER
// Loads data from Firestore to override defaults
// ========================================

(async function loadFirebaseData() {
  if (!window.__firebaseReady) return;

  const db = window.__firebaseDb;

  try {
    // Load event settings
    const eventSnap = await db.doc("settings/event").get();
    if (eventSnap.exists) {
      const d = eventSnap.data();
      Object.assign(window.eventSettings, {
        enabled: d.enabled !== false,
        title: d.title || window.eventSettings.title,
        discount: d.discount ?? window.eventSettings.discount,
        endDate: d.endDate || window.eventSettings.endDate
      });
    }

    // Load exchange rate
    const exchSnap = await db.doc("settings/exchange").get();
    if (exchSnap.exists && exchSnap.data().rate) {
      window.EXCHANGE_RATE = exchSnap.data().rate;
    }

    // Load discord link
    const discSnap = await db.doc("settings/discord").get();
    if (discSnap.exists && discSnap.data().link) {
      window.DISCORD_LINK = discSnap.data().link;
    }

    // Load hero settings
    const heroSnap = await db.doc("settings/hero").get();
    if (heroSnap.exists) {
      const h = heroSnap.data();
      Object.assign(window.heroSettings, {
        backgroundImage: h.backgroundImage || window.heroSettings.backgroundImage,
        title: h.title || window.heroSettings.title,
        description: h.description || window.heroSettings.description,
        buttonText: h.buttonText || window.heroSettings.buttonText,
        buttonLink: h.buttonLink || window.heroSettings.buttonLink
      });
    }

    // Load payment methods
    const paySnap = await db.collection("settings/payments/list").get();
    if (!paySnap.empty) {
      window.paymentMethods.length = 0;
      paySnap.forEach(doc => {
        const d = doc.data();
        window.paymentMethods.push({
          name: d.name,
          image: d.image,
          desc: d.description
        });
      });
    }

    // Load games
    const gamesSnap = await db.collection("games").get();
    if (!gamesSnap.empty) {
      window.games.length = 0;
      const gameMap = {};

      gamesSnap.forEach(doc => {
        const g = doc.data();
        gameMap[g.id] = g;
        window.games.push({
          id: g.id,
          name: g.name,
          page: g.page || g.id + ".html",
          image: g.image,
          description: g.description || g.name + " products"
        });
      });

      // Load products for each game
      for (const gameId of Object.keys(gameMap)) {
        const prodSnap = await db.collection("products").doc(gameId).collection("items").get();
        window.productsData[gameId] = [];
        prodSnap.forEach(doc => {
          const p = doc.data();
          window.productsData[gameId].push({
            name: p.name,
            description: p.description,
            image: p.image,
            originalPrice: p.originalPrice,
            salePrice: p.salePrice || p.originalPrice,
            badge: p.badge || null,
            totalSold: p.totalSold || 0
          });
        });
      }
    }

    // Rebuild searchable items
    window.searchableItems.length = 0;
    window.games.forEach(game => {
      window.searchableItems.push({
        name: game.name,
        type: "Game",
        page: game.page,
        image: game.image
      });
      if (window.productsData[game.id]) {
        window.productsData[game.id].forEach(product => {
          window.searchableItems.push({
            name: product.name,
            type: game.name + " Product",
            page: game.page,
            image: product.image
          });
        });
      }
    });

    // Re-render page with new data
    window.reinitSite();

    console.log("[Firebase] Data loaded from Firestore");
  } catch (err) {
    console.warn("[Firebase] Could not load data, using defaults:", err.message);
  }
})();
