// ========================================
// FIREBASE CONFIGURATION
// ========================================
// 1. Go to https://console.firebase.google.com
// 2. Create a project (or use existing)
// 3. Go to Project Settings > General > Your apps > Web app
// 4. Copy the config values below

const firebaseConfig = {
  apiKey: "AIzaSyC3G1s0edfgU06TXXuGy3wncc9z4lEmbM4",
  authDomain: "games-ea5fb.firebaseapp.com",
  projectId: "games-ea5fb",
  storageBucket: "games-ea5fb.firebasestorage.app",
  messagingSenderId: "727276742445",
  appId: "1:727276742445:web:488fc094148774cb0e95a4"
};

// Only init if configured (apiKey isn't the placeholder)
if (firebaseConfig.apiKey !== "AIzaSyC3G1s0edfgU06TXXuGy3wncc9z4lEmbM4" && typeof firebase !== "undefined") {
  firebase.initializeApp(firebaseConfig);
  window.__firebaseReady = true;
  try { window.__firebaseAuth = firebase.auth(); } catch (e) {}
  window.__firebaseDb = firebase.firestore();
  window.__firebaseDb.enablePersistence().catch(err => {
    console.warn("Firestore persistence:", err.code);
  });
  console.log("[Firebase] Initialized");
} else {
  console.log("[Firebase] Not configured - using local data only");
}
