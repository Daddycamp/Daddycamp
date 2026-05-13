// ─── firebase.js ──────────────────────────────────────────────────────────
// SCHRITT 1: Ersetze diese Werte mit deinen eigenen Firebase-Zugangsdaten.
// Anleitung: https://console.firebase.google.com
//   → Neues Projekt → Web-App hinzufügen → Konfiguration kopieren

import { initializeApp } from "firebase/app";
import { getDatabase }   from "firebase/database";
import { getMessaging }  from "firebase/messaging";

const firebaseConfig = {
  apiKey:            "AIzaSyD9c-sZ_rq1S3hE4_LmULfhKJWgE9kiZT8",
  authDomain:        "daddycamp-f6eb6.firebaseapp.com",
  databaseURL:       "https://daddycamp-f6eb6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "daddycamp-f6eb6",
  storageBucket:     "daddycamp-f6eb6.firebasestorage.app",
  messagingSenderId: "257270196595",
  appId:             "1:257270196595:web:95034c97906a25e6f83d06",
};

const app       = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Messaging nur im Browser (nicht bei SSR)
export const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

// VAPID-Key für Push-Benachrichtigungen (aus Firebase Console → Cloud Messaging)
export const VAPID_KEY = "DEIN_VAPID_KEY";
