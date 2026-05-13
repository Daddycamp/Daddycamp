# 🏕️ Daddycamp App – Setup-Anleitung

## Was du einmalig tun musst (ca. 15 Min.)

---

## SCHRITT 1 – Firebase-Projekt erstellen

1. Geh auf https://console.firebase.google.com
2. Klick **„Projekt erstellen"** → Name: `daddycamp2026`
3. Google Analytics: **deaktivieren** (nicht nötig)
4. Klick **„Projekt erstellen"**

---

## SCHRITT 2 – Realtime Database aktivieren

1. Im linken Menü: **„Realtime Database"**
2. Klick **„Datenbank erstellen"**
3. Region: **europe-west1** (Belgien, am nächsten)
4. Regeln: **Testmodus** auswählen (30 Tage offen, danach anpassen)
5. Klick **„Aktivieren"**

---

## SCHRITT 3 – Web-App registrieren + Config kopieren

1. Oben auf das Zahnrad → **„Projekteinstellungen"**
2. Runterscrollen zu **„Deine Apps"** → Klick auf **`</>`** (Web)
3. App-Nickname: `daddycamp` → **„App registrieren"**
4. Du siehst jetzt ein `firebaseConfig`-Objekt. **Kopiere es.**
5. Öffne die Datei **`src/firebase.js`** und ersetze die Platzhalterwerte.

---

## SCHRITT 4 – Push-Benachrichtigungen einrichten

1. Projekteinstellungen → Tab **„Cloud Messaging"**
2. Runterscrollen zu **„Web-Push-Zertifikate"**
3. Klick **„Schlüsselpaar generieren"**
4. Kopiere den **VAPID-Key** und trage ihn in `src/firebase.js` ein.
5. Trage denselben VAPID-Key auch in `public/firebase-messaging-sw.js` ein.

⚠️ Denk daran: In `public/firebase-messaging-sw.js` müssen die gleichen
   Firebase-Werte stehen wie in `src/firebase.js`!

---

## SCHRITT 5 – PINs der Familien ändern (optional)

Öffne `src/LoginScreen.jsx` und ändere die PINs:

```js
export const FAMILY_PINS = {
  1:  "1234",  // Stefan  → dein gewünschter PIN
  2:  "5678",  // Rainer
  // ...
};
```

Teile jeden PIN persönlich mit der jeweiligen Familie mit.

---

## SCHRITT 6 – Auf GitHub hochladen

1. Konto erstellen auf https://github.com
2. **„New repository"** → Name: `daddycamp` → **„Create repository"**
3. Klick **„uploading an existing file"**
4. **Alle Dateien aus diesem ZIP** in das Fenster ziehen
5. Klick **„Commit changes"**

---

## SCHRITT 7 – Mit Vercel deployen

1. Konto erstellen auf https://vercel.com mit **„Continue with GitHub"**
2. Klick **„Add New Project"**
3. Dein `daddycamp`-Repository auswählen
4. Klick **„Deploy"** – fertig!

Nach ~1 Minute bekommst du eine URL wie:
**`daddycamp-2026.vercel.app`**

Diese URL per WhatsApp an alle Väter schicken. Fertig! 🎉

---

## Datenbankregeln (nach 30 Tagen anpassen)

In Firebase → Realtime Database → Regeln:

```json
{
  "rules": {
    ".read":  true,
    ".write": true
  }
}
```

Für mehr Sicherheit später auf Authentifizierung umstellen.

---

## Fragen?

Frag Stefan – oder ChatClaude nochmal 😄
