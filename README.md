# ⛺ Daddycamp App

Eine private Web-App für die jährliche Daddycamp-Auszeit.

## 🚀 Lokal starten

```bash
npm install
npm run dev
```

Dann im Browser: http://localhost:5173

## 📦 Deployment auf Vercel (empfohlen)

### Option A – Direkt via Vercel Website (einfachster Weg)

1. Gehe zu [vercel.com](https://vercel.com) und melde dich an (kostenlos, mit GitHub)
2. Klicke **"Add New Project"**
3. Wähle dein GitHub-Repository aus
4. Vercel erkennt Vite automatisch – einfach auf **"Deploy"** klicken
5. Fertig! Deine App ist unter `daddycamp.vercel.app` erreichbar

### Option B – Via Vercel CLI

```bash
npm install -g vercel
vercel
```

## 📁 Projektstruktur

```
daddycamp/
├── src/
│   ├── App.jsx       # Komplette App (alle Daten + UI)
│   └── main.jsx      # React-Einstiegspunkt
├── public/
│   └── tent.svg      # Favicon
├── index.html
├── vite.config.js
└── package.json
```

## 🔧 Technologie

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- Keine externe Datenbank – alle Daten sind in der App eingebettet
- Deployment: [Vercel](https://vercel.com) (kostenlos)

## 📱 Features

- ⛺ Camp – Countdown, Anmeldungen, Rückblicke
- 👨‍👧 Crew – RSVP, Anmeldestatus, Formular
- 🗺 Ausflug – Ort & Abstimmung, Plan, Daddycamp Termine
- 📦 Org – Packliste, Einkauf & Zuweisung
- 🎉 Fun – Trophäen, Abstimmungen, Statistiken, Lied des Jahres, Verbrauch-Counter
