# ⛺ Daddycamp App

Private Web-App für das jährliche Daddycamp – mit Echtzeit-Synchronisation via Firebase.

## Features
- ⛺ **Camp** – Countdown, Anmeldefrist, RSVP-Status, Rückblicke, Tricount-Abrechnung
- 👨‍👧 **Crew** – RSVP & Anmeldestatus für alle 11 Familien, Anmeldeformular-Download
- 🗺 **Ausflug** – Ort-Abstimmung 2027, Ablaufplan (editierbar), Daddycamp-Termine 2026–2030
- 📦 **Org** – Packliste mit eigenen Artikeln, Einkaufsliste mit Zuweisung
- 🎉 **Fun** – Trophäen, Abstimmungen, Statistiken 2019–2025, Lied des Jahres, Verbrauch-Counter

## Lokal starten

```bash
npm install
npm run dev
```

Dann: http://localhost:5173

## Deployment auf Vercel

1. Dieses Repository auf GitHub hochladen
2. Auf [vercel.com](https://vercel.com) mit GitHub anmelden
3. **Add New Project** → Repository auswählen → **Deploy**
4. Fertig – Vite wird automatisch erkannt

## Firebase Echtzeit-Sync

Alle gemeinsamen Daten werden live synchronisiert:
RSVP · Ort-Abstimmung · Einkaufsliste · Trophäen-Votes · Abstimmungen · Verbrauch-Counter · Lied des Jahres · Ablaufplan · Statistiken
