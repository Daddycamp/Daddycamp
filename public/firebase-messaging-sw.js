// public/firebase-messaging-sw.js
// Dieser Service Worker muss im /public Ordner liegen.

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:            "DEIN_API_KEY",
  authDomain:        "DEIN_PROJECT.firebaseapp.com",
  databaseURL:       "https://DEIN_PROJECT-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "DEIN_PROJECT",
  storageBucket:     "DEIN_PROJECT.appspot.com",
  messagingSenderId: "DEINE_SENDER_ID",
  appId:             "DEINE_APP_ID",
});

const messaging = firebase.messaging();

// Push-Benachrichtigungen anzeigen wenn App im Hintergrund
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: icon || "/icon.png",
    badge: "/icon.png",
  });
});
