// LoginScreen.jsx
import { useState } from "react";

// PIN pro Familie – du kannst diese ändern bevor du die App deployest
export const FAMILY_PINS = {
  1:  "1111",  // Stefan Lindt
  2:  "2222",  // Rainer Kamps
  3:  "3333",  // Andre Doehn
  4:  "4444",  // Janos Stand
  5:  "5555",  // Kai Oberlaender
  6:  "6666",  // Stevie Ruessmann
  7:  "7777",  // Guido Bosche
  8:  "8888",  // Basti Nollau
  9:  "9999",  // Michele Lauricella Ninotta
  10: "1222",  // Adrian Hotz
  11: "1333",  // Tuna Acar
};

// Familie ID 1 (Stefan) ist Admin
export const ADMIN_ID = 1;

const FAMILIES_LOGIN = [
  { id:1,  name:"Stefan Lindt"             },
  { id:2,  name:"Rainer Kamps"             },
  { id:3,  name:"Andre Doehn"              },
  { id:4,  name:"Janos Stand"              },
  { id:5,  name:"Kai Oberlaender"          },
  { id:6,  name:"Stevie Ruessmann"         },
  { id:7,  name:"Guido Bosche"             },
  { id:8,  name:"Basti Nollau"             },
  { id:9,  name:"Michele Lauricella"       },
  { id:10, name:"Adrian Hotz"              },
  { id:11, name:"Tuna Acar"               },
];

export default function LoginScreen({ onLogin }) {
  const [selected, setSelected] = useState(null);
  const [pin,      setPin]      = useState("");
  const [error,    setError]    = useState("");

  const G  = "#F0B429";
  const bg = "#1E2D3E";
  const C  = {
    bgL:"#263545", bgC:"rgba(255,255,255,.11)",
    bo:"rgba(255,255,255,.2)", boL:"rgba(255,255,255,.12)",
    tx:"#ECF2F8", txM:"rgba(236,242,248,.6)", txF:"rgba(236,242,248,.35)",
    teal:"#10B981", red:"#EF4444",
  };

  function handleLogin() {
    if (!selected) { setError("Bitte zuerst deine Familie auswählen."); return; }
    if (FAMILY_PINS[selected] !== pin) { setError("Falscher PIN. Bitte nochmal versuchen."); setPin(""); return; }
    setError("");
    const fam = FAMILIES_LOGIN.find(f => f.id === selected);
    onLogin({ id: selected, name: fam.name, isAdmin: selected === ADMIN_ID });
  }

  function handleKey(k) {
    if (k === "⌫") { setPin(p => p.slice(0, -1)); return; }
    if (pin.length >= 4) return;
    const next = pin + k;
    setPin(next);
    if (next.length === 4) {
      // Auto-submit after 4 digits
      setTimeout(() => {
        if (!selected) { setError("Bitte zuerst Familie auswählen."); setPin(""); return; }
        if (FAMILY_PINS[selected] !== next) { setError("Falscher PIN."); setPin(""); return; }
        const fam = FAMILIES_LOGIN.find(f => f.id === selected);
        onLogin({ id: selected, name: fam.name, isAdmin: selected === ADMIN_ID });
      }, 200);
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px 16px", fontFamily:"Nunito, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* Logo */}
      <div style={{ textAlign:"center", marginBottom:32 }}>
        <div style={{ fontSize:52, fontFamily:"Oswald, sans-serif", fontWeight:700, letterSpacing:8, color:"#fff", textShadow:"0 2px 24px rgba(0,0,0,.65)", textTransform:"uppercase" }}>
          Daddy<span style={{ color:G }}>camp</span>
        </div>
        <div style={{ fontSize:13, letterSpacing:3, color:"rgba(255,255,255,.6)", textTransform:"uppercase", marginTop:4 }}>
          04. – 06. September 2026
        </div>
      </div>

      <div style={{ width:"100%", maxWidth:360 }}>

        {/* Step 1: Familie wählen */}
        <div style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.15)", borderRadius:16, padding:16, marginBottom:16 }}>
          <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:3, color:G, fontWeight:700, marginBottom:12 }}>
            1. Wer bist du?
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {FAMILIES_LOGIN.map(f => (
              <button key={f.id} onClick={() => { setSelected(f.id); setPin(""); setError(""); }}
                style={{ padding:"9px 8px", borderRadius:10, border:"1px solid " + (selected === f.id ? G : C.boL), background: selected === f.id ? "rgba(240,180,41,.18)" : "rgba(255,255,255,.05)", color: selected === f.id ? G : C.txM, fontSize:12, fontWeight: selected === f.id ? 800 : 500, cursor:"pointer", fontFamily:"Nunito, sans-serif", textAlign:"left", transition:"all .15s" }}>
                {f.id === 1 ? "👑 " : ""}{f.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: PIN eingeben */}
        {selected && (
          <div style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.15)", borderRadius:16, padding:16, marginBottom:16 }}>
            <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:3, color:G, fontWeight:700, marginBottom:16 }}>
              2. PIN eingeben
            </div>

            {/* PIN dots */}
            <div style={{ display:"flex", justifyContent:"center", gap:12, marginBottom:20 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ width:14, height:14, borderRadius:"50%", background: pin.length > i ? G : "rgba(255,255,255,.2)", transition:"background .2s" }} />
              ))}
            </div>

            {/* Numpad */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((k, i) => (
                k === "" ? <div key={i} /> :
                <button key={i} onClick={() => handleKey(k)}
                  style={{ padding:"14px", borderRadius:12, border:"1px solid rgba(255,255,255,.15)", background:"rgba(255,255,255,.08)", color:C.tx, fontSize: k === "⌫" ? 18 : 20, fontWeight:700, cursor:"pointer", fontFamily:"Nunito, sans-serif", transition:"all .1s", active:{background:"rgba(255,255,255,.2)"} }}>
                  {k}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ background:"rgba(239,68,68,.12)", border:"1px solid rgba(239,68,68,.4)", borderRadius:10, padding:"10px 14px", marginBottom:12, fontSize:13, color:"#FCA5A5", textAlign:"center" }}>
            {error}
          </div>
        )}

        {/* Login button */}
        {!selected && (
          <button onClick={handleLogin} style={{ width:"100%", padding:"14px", borderRadius:12, background:"rgba(212,146,10,.25)", border:"1px solid " + G, color:G, fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"Nunito, sans-serif" }}>
            Familie auswählen →
          </button>
        )}
      </div>

      <div style={{ marginTop:24, fontSize:11, color:"rgba(255,255,255,.25)", textAlign:"center" }}>
        PIN vergessen? Frag Stefan.
      </div>
    </div>
  );
}
