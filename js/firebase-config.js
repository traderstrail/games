// ========================================
// FIREBASE CONFIGURATION
// ========================================
// 1. Go to https://console.firebase.google.com
// 2. Create a project (or use existing)
// 3. Go to Project Settings > General > Your apps > Web app
// 4. Copy the config values below

const firebaseConfig = {
  apiKey: "AIzaSyCDfmMC8ErcWGb1pPelO2FsYUS6hWBCu7g",
  authDomain: "elmerrivas-fcfc8.firebaseapp.com",
  projectId: "elmerrivas-fcfc8",
  storageBucket: "elmerrivas-fcfc8.firebasestorage.app",
  messagingSenderId: "234225943618",
  appId: "1:234225943618:web:6ac4da6d0fd68c7e2599db"
};

// Only init if configured (apiKey isn't the placeholder)
if (firebaseConfig.apiKey !== "YOUR_API_KEY" && typeof firebase !== "undefined") {
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
