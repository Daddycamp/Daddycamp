// useFirebase.js – Alle Firebase-Datenbankoperationen

import { useEffect, useCallback } from "react";
import { ref, set, get, onValue, update } from "firebase/database";
import { getToken, onMessage }             from "firebase/messaging";
import { db, messaging, VAPID_KEY }        from "./firebase";

// ─── Hilfsfunktionen ──────────────────────────────────────────────────────

// Schreibt einen Wert in die Datenbank
export function dbSet(path, value) {
  return set(ref(db, path), value);
}

// Aktualisiert Felder ohne alles zu überschreiben
export function dbUpdate(path, value) {
  return update(ref(db, path), value);
}

// Liest einmalig
export function dbGet(path) {
  return get(ref(db, path)).then(snap => snap.exists() ? snap.val() : null);
}

// ─── Hook: Live-Daten hören ────────────────────────────────────────────────
// Gibt einen Wert zurück und aktualisiert bei jeder Änderung automatisch

export function useDbValue(path, setState, defaultValue = null) {
  useEffect(() => {
    const r = ref(db, path);
    const unsub = onValue(r, snap => {
      setState(snap.exists() ? snap.val() : defaultValue);
    });
    return () => unsub();
  }, [path]);
}

// ─── Push-Benachrichtigungen ───────────────────────────────────────────────

// Fragt Erlaubnis für Push-Benachrichtigungen und speichert Token
export async function registerPushToken(userId) {
  if (!messaging) return;
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (token) {
      await dbSet(`pushTokens/${userId}`, token);
      console.log("Push-Token registriert:", token);
    }
  } catch (err) {
    console.warn("Push-Registrierung fehlgeschlagen:", err);
  }
}

// Hört auf Benachrichtigungen wenn App offen ist
export function usePushMessages(onNotification) {
  useEffect(() => {
    if (!messaging) return;
    const unsub = onMessage(messaging, payload => {
      onNotification({
        title: payload.notification?.title || "Daddycamp",
        body:  payload.notification?.body  || "",
      });
    });
    return () => unsub();
  }, []);
}

// ─── Benachrichtigung senden (wird über Firebase Functions ausgelöst) ──────
// In der Realtime Database schreiben → Firebase Function liest es und sendet Push

export async function sendNotification(type, message, fromUser) {
  const notification = {
    type,
    message,
    from:      fromUser,
    timestamp: Date.now(),
  };
  await dbSet(`notifications/${Date.now()}`, notification);
}

// ─── Datenbankpfade ───────────────────────────────────────────────────────
export const DB = {
  families:    "families",
  shopGrps:    "shopGroups",
  extras:      "shopExtras",
  assignments: "assignments",
  packChk:     "packChecklist",
  polls:       "polls",
  trophies:    "trophyVotes",
  playlist:    "playlist",
  attendance:  "attendance",
  dests:       "destinations",
  myVote:      "destinationVote",
  notifications: "notifications",
};
