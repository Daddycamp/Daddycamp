// Root.jsx – Einstiegspunkt: Login prüfen, dann App starten

import { useState, useEffect, createContext, useContext } from "react";
import LoginScreen, { FAMILY_PINS }  from "./LoginScreen.jsx";
import { registerPushToken, usePushMessages } from "./useFirebase.js";
import App from "./App.jsx";

// ─── Kontext: eingeloggter Nutzer ─────────────────────────────────────────
export const UserCtx = createContext(null);
export const useUser = () => useContext(UserCtx);

// ─── Toast-Benachrichtigung ───────────────────────────────────────────────
function Toast({ msg, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [msg]);

  if (!msg) return null;
  return (
    <div style={{
      position:"fixed", top:16, left:"50%", transform:"translateX(-50%)",
      background:"#1E2D3E", border:"1px solid #F0B429",
      borderRadius:12, padding:"12px 20px", zIndex:9999,
      fontSize:13, color:"#ECF2F8", fontFamily:"Nunito, sans-serif",
      boxShadow:"0 4px 24px rgba(0,0,0,.5)", maxWidth:"90vw", textAlign:"center",
    }}>
      🔔 {msg}
    </div>
  );
}

export default function Root() {
  const STORAGE_KEY = "daddycamp_user";

  // Beim Start: gespeicherten Login laden
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [toast, setToast] = useState("");

  // Nach Login: Token registrieren
  useEffect(() => {
    if (user) {
      registerPushToken(user.id).catch(console.warn);
    }
  }, [user?.id]);

  // Push-Benachrichtigungen empfangen (wenn App offen)
  usePushMessages(({ title, body }) => {
    setToast(body || title);
  });

  function handleLogin(userData) {
    setUser(userData);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(userData)); } catch {}
  }

  function handleLogout() {
    setUser(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <UserCtx.Provider value={{ user, logout: handleLogout }}>
      <Toast msg={toast} onClose={() => setToast("")} />
      <App currentUser={user} />
    </UserCtx.Provider>
  );
}
