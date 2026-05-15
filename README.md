# ⛺ Daddycamp App – Firebase Version

Echtzeit-synchronisierte Web-App für das jährliche Daddycamp.
Alle Teilnehmer sehen Änderungen sofort – RSVP, Einkauf, Abstimmungen, etc.

## 🚀 Lokal starten

```bash
npm install
npm run dev
```

## 📦 Deployment (Vercel)

1. Diesen Ordner als neues GitHub Repository hochladen
2. Auf [vercel.com](https://vercel.com) → "Add New Project" → Repository wählen
3. Deploy klicken – Vite wird automatisch erkannt

## 🔥 Firebase Datenbank

Bereits konfiguriert. Alle Echtzeit-Daten werden unter:
`daddycamp-f6eb6.europe-west1.firebasedatabase.app/daddycamp/`
gespeichert.

Synchronisierte Felder:
- RSVP & Anmeldestatus aller Familien
- Ort-Abstimmung
- Einkaufsliste & Zuweisungen
- Abstimmungen & Trophäen-Votes
- Verbrauch-Counter
- Lied des Jahres
- Statistiken (Anwesenheit)
- Ablaufplan
- Packliste-Extras
