// ========================================
// FIREBASE CONFIGURATION
// ========================================
// 1. Go to https://console.firebase.google.com
// 2. Create a project (or use existing)
// 3. Go to Project Settings > General > Your apps > Web app
// 4. Copy the config values below

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Only init if configured (apiKey isn't the placeholder)
if (firebaseConfig.apiKey !== "YOUR_API_KEY" && typeof firebase !== "undefined") {
  firebase.initializeApp(firebaseConfig);
  window.__firebaseReady = true;
  window.__firebaseAuth = firebase.auth();
  window.__firebaseDb = firebase.firestore();
  window.__firebaseDb.enablePersistence().catch(err => {
    console.warn("Firestore persistence:", err.code);
  });
  console.log("[Firebase] Initialized");
} else {
  console.log("[Firebase] Not configured - using local data only");
}
