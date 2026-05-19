import { useState, useEffect, useRef } from "react";
import { db, ref as fbRef, onValue, set } from "./firebase.js";

const P25="./photo25.jpg";
const P24="./photo24.jpg";
const P23="./photo23.jpg";
const P22="./photo22.jpg";
const P21="./photo21.jpg";
const P20="./photo20.jpg";
const P19="./photo19.jpg";

const TOUR = new Date(2026,8,4);
const DEADLINE = new Date(2026,4,18);
const G = "#F0B429";


const DADS = ["Stefan","Rainer","Andre","Janos","Kai","Stevie","Guido","Basti","Michele","Adrian","Tuna"];

const FAM0 = [
  {id:1, first:"Stefan",  last:"Lindt",    dSt:"yes", reg:false, paid:false, kids:[{first:"Raphael",g:"👦",st:"yes"},{first:"Amelie",g:"👧",st:"yes"}]},
  {id:2, first:"Rainer",  last:"Kamps",    dSt:"yes", reg:false, paid:false, kids:[{first:"Marie",g:"👧",st:"yes"},{first:"Charlotte",g:"👧",st:"yes"}]},
  {id:3, first:"Andre",   last:"Doehn",    dSt:"yes", reg:false, paid:false, kids:[{first:"Lenja",g:"👧",st:"yes"}]},
  {id:4, first:"Janos",   last:"Stand",    dSt:"yes", reg:false, paid:false, kids:[{first:"Max",g:"👦",st:"yes"}]},
  {id:5, first:"Kai",     last:"Oberländer", dSt:"yes", reg:false, paid:false, kids:[{first:"Lu",g:"👧",st:"yes"},{first:"Toni",g:"👧",st:"yes"},{first:"Lenny",g:"👦",st:"yes"}]},
  {id:6, first:"Stevie",  last:"Rüßmann", dSt:"yes", reg:false, paid:false, kids:[{first:"Marlene",g:"👧",st:"yes"},{first:"Pepe",g:"👦",st:"yes"}]},
  {id:7, first:"Guido",   last:"Bosche",   dSt:"yes", reg:false, paid:false, kids:[{first:"Bruno",g:"👦",st:"yes"},{first:"Leni",g:"👧",st:"yes"}]},
  {id:8, first:"Basti",   last:"Nollau",   dSt:"yes", reg:false, paid:false, kids:[{first:"Clara",g:"👧",st:"yes"},{first:"Niki",g:"👦",st:"yes"},{first:"Livia",g:"👧",st:"yes"}]},
  {id:9, first:"Michele", last:"Lauricella", dSt:"yes", reg:false, paid:false, kids:[{first:"Aurelio",g:"👦",st:"yes"},{first:"Luisa",g:"👧",st:"yes"}]},
  {id:10,first:"Adrian",  last:"Hotz",     dSt:"yes", reg:false, paid:false, kids:[{first:"Sophie",g:"👧",st:"yes"},{first:"Oskar",g:"👦",st:"yes"},{first:"Lilly",g:"👧",st:"yes"}]},
  {id:11,first:"Tuna",    last:"Acar",     dSt:"yes", reg:true,  paid:true,  kids:[{first:"Batu",g:"👦",st:"yes"},{first:"Bengi",g:"👧",st:"yes"},{first:"Tan",g:"👦",st:"yes"}]},
];

const SHOPS0 = [
  {g:"Mobiliar", items:["Bierzeltgarnitur","Pavillon","Musikbox","Kühlbox","Eiswürfelmaschine","Steckdosen Adapter","Induktionskochfeld","Kontaktgrill"]},
  {g:"Grill",    items:["Grill","Fleischthermometer","Salz & Pfeffer"]},
  {g:"Fleisch",  items:["Fleisch","Grillwürstchen","Veggie-Alternativen"]},
  {g:"Getränke",items:["Bier","Wein","Eiswürfel","Slushy"]},
  {g:"Frühstück",items:["Nutella","Kaffee","Nespresso","Milchaufschäumer","Brot","Marshmallows"]},
  {g:"Lebensmittel",items:["Ketchup","Gemüse","Obst","Müllbeutel"]},
  {g:"Sonstiges",items:["Wespenfallen"]},
];

const PACK0 = [
  {cat:"Schlafen", icon:"🛏️", items:["Schlafsack","Kissen","Isomatte","Handtücher"]},
  {cat:"Kleidung", icon:"👕", items:["Regenjacke","Fleece","Wanderschuhe","Wechselkleidung","Badehose"]},
  {cat:"Essen",    icon:"🍖", items:["Grillgut","Brot & Aufschnitt","Frühstück","Getränke","Kaffee"]},
  {cat:"Kids",     icon:"🎮", items:["Fußball","Frisbee","Kartenspiele","Taschenlampe","Gummistiefel"]},
  {cat:"Erste Hilfe",icon:"🩺",items:["Erste-Hilfe-Set","Zeckenentferner","Sonnencreme","Insektenspray"]},
];

const DESTS = [
  {id:1,name:"Holland - Camping Terspegelt",emoji:"🌊",flag:"🇳🇱",desc:"3 Seen, Wasserpark, Kids-Paradies",
   addr:"Postelseweg 88, 5521 RD Eersel, NL",nav:"https://maps.google.com/?q=Terspegelt+Eersel",
   hp:"https://www.terspegelt.nl/de/",dist:"~2,5 Std.",
   detail:"Drei Badeseen, Indoorpool mit Rutschen, BMX, Beachvolleyball, Restaurant.",
   hl:["3 Seen + Pool","Rutschen","Fahrradverleih","Restaurant"],
   prices:[{l:"Komfort Plus Wochenende ~2 Fam. inkl. Strom",p:"~150 EUR",b:true}],
   votes:0,ab:false},
  {id:2,name:"Westerwald - Schönerlen",emoji:"🌲",flag:"🇩🇪",desc:"Naturcamp, Teich, Esel-Trekking",
   addr:"Hofgut-Schönerlen 2, 56244 Steinen",nav:"https://maps.google.com/?q=Hofgut+Schönerlen+Steinen",
   hp:"https://www.camping-westerwald.de/",dist:"~1,5 Std.",
   detail:"Idyllischer Naturcamp im Westerwald am Teich. Esel-Trekking, Broetchenservice. Heimat des Daddycamps 2020-2024!",
   hl:["Esel-Trekking","Brötchenservice","Naturstellplätze","Teich"],
   prices:[{l:"Stellplatz",p:"13 EUR",b:true},{l:"Erw. ab 12",p:"8 EUR",b:false},{l:"Kinder",p:"4 EUR",b:false},{l:"Strom/kWh",p:"0,75 EUR",b:false}],
   votes:0,ab:false},
  {id:3,name:"Eifel - Freilinger See",emoji:"🏕",flag:"🇩🇪",desc:"Direkter Seezugang, Angeln",
   addr:"Am Freilinger See 1, 53945 Blankenheim",nav:"https://maps.google.com/?q=Freilinger+See+Blankenheim",
   hp:"https://eifel-camp.freizeit-oasen.de/",dist:"~1 Std.",
   detail:"Direkt am Natursee. Angeln, SUP, Restaurant. 2026 ausgebucht – für 2027 abstimmbar!",
   hl:["Badesee","Angeln","SUP","Restaurant"],
   prices:[{l:"Komfortstellplatz",p:"20-24 EUR",b:true},{l:"Erw./Nacht",p:"8 EUR",b:false},{l:"Kind/Nacht",p:"7,50 EUR",b:false}],
   votes:0,ab:false,ab2026:true},
  {id:4,name:"Haider Bergsee Brühl",emoji:"⛰",flag:"🇩🇪",desc:"Bergsee, Natur pur",
   addr:"Haider Bergseeweg, 50321 Brühl",nav:"https://maps.google.com/?q=Haider+Bergsee+Brühl",
   hp:null,dist:"~30 Min.",
   detail:"Bergsee in Brühl. Ruhige Waldlage, Baden, Angeln. Für 2026 ausgebucht.",
   hl:["Bergsee","Angeln","Waldlage","30 Min."],
   prices:[],votes:0,ab:false,ab2026:true},
];

const REGISTRATIONS = {
  1: {
    name: "Camping Terspegelt",
    info: "Bitte direkt über die Homepage buchen.",
    hp: "https://www.terspegelt.nl/de/",
    fields: null,
  },
  2: {
    name: "Hofgut Schönerlen",
    form: true,
    iban: "DE27 5739 1800 0065 1246 02",
    bic: "GENODE51WW1",
    bank: "Westerwaldbank eG Hachenburg",
    email: "camping-kopper@t-online.de",
    zeitraum: "04.09.2026 bis 06.09.2026",
    gebuehr: "25,00 EUR",
    kennwort: "Daddycamp2026",
    pdfUrl: "./anmeldung.pdf",
  },
  3: {
    name: "Eifel-Camp Freilinger See",
    info: "Für 2026 bereits ausgebucht – keine Anmeldung möglich.",
    hp: "https://eifel-camp.freizeit-oasen.de/",
    fields: null,
  },
  4: {
    name: "Haider Bergsee Brühl",
    info: "Für 2026 bereits ausgebucht – keine Anmeldung möglich.",
    fields: null,
  },
};

const AUSFLUGS = {
  1:[{e:"🎢",n:"Efteling",t:"Freizeitpark",d:"30 km",url:"https://maps.google.com/?q=Efteling"},
     {e:"🐾",n:"Beekse Bergen Safari",t:"Safari-Zoo",d:"25 km",url:"https://maps.google.com/?q=Beekse+Bergen"},
     {e:"🚴",n:"Nationaal Park Kempen",t:"Natur",d:"5 km",url:"https://maps.google.com/?q=Nationaal+Park+Kempen"}],
  2:[{e:"🏊",n:"Freibad Hachenburg",t:"Freibad",d:"12 km",url:"https://maps.google.com/?q=Freibad+Hachenburg"},
     {e:"🏰",n:"Schloss Montabaur",t:"Ausflug",d:"18 km",url:"https://maps.google.com/?q=Schloss+Montabaur"},
     {e:"🧗",n:"Kletterwald Westerwald",t:"Kletterpark",d:"15 km",url:"https://maps.google.com/?q=Kletterwald+Westerwald"},
     {e:"🦌",n:"Wildpark Neustadt/Wied",t:"Wildpark",d:"25 km",url:"https://maps.google.com/?q=Wildpark+Neustadt+Wied"}],
  3:[{e:"🌋",n:"Maar-Seen Eifel",t:"Natur",d:"20 km",url:"https://maps.google.com/?q=Gemundener+Maar"},
     {e:"🏰",n:"Burg Blankenheim",t:"Ausflug",d:"3 km",url:"https://maps.google.com/?q=Burg+Blankenheim"}],
  4:[{e:"🎡",n:"Phantasialand Brühl",t:"Freizeitpark",d:"5 km",url:"https://maps.google.com/?q=Phantasialand"},
     {e:"🐘",n:"Kölner Zoo",t:"Zoo",d:"18 km",url:"https://maps.google.com/?q=Koelner+Zoo"}],
};

const SCHED0 = [
  {day:"Freitag",e:"🏁",slots:[{id:"fr1",t:"15:00",l:"Anreise",i:"🚗"},{id:"fr2",t:"17:00",l:"Begrüßungsbier",i:"🍺"},{id:"fr3",t:"19:00",l:"Großes Grillen",i:"🔥"},{id:"fr4",t:"22:00",l:"Lagerfeuer",i:"🪵"}]},
  {day:"Samstag",e:"⭐",slots:[{id:"sa1",t:"08:30",l:"Frühstück",i:"☕"},{id:"sa2",t:"10:00",l:"Ausflug",i:"🥾"},{id:"sa3",t:"13:00",l:"Mittag",i:"🥪"},{id:"sa4",t:"15:00",l:"Kids-Programm",i:"⚽"},{id:"sa5",t:"18:00",l:"Abendessen",i:"🍽"},{id:"sa6",t:"20:00",l:"Spieleabend",i:"🃏"}]},
  {day:"Sonntag",e:"🏠",slots:[{id:"so1",t:"09:00",l:"Frühstück & Aufräumen",i:"🧹"},{id:"so2",t:"11:00",l:"Abschlussrunde",i:"📸"},{id:"so3",t:"12:00",l:"Abreise",i:"👋"}]},
];

const MEMS = [
  {yr:2025,photo:P25,loc:"Holland - Camping TerSpegelt",note:"Am See - die Legenden unter sich",   who:["Stefan","Rainer","Andre","Janos","Kai","Stevie","Basti","Michele","Adrian","Tuna"]},
  {yr:2024,photo:P24,loc:"Westerwald - Schönerlen",note:"Entspannter Abend am See",               who:["Stefan","Rainer","Andre","Kai","Stevie","Basti","Adrian"]},
  {yr:2023,photo:P23,loc:"Westerwald - Schönerlen",note:"Sehr verregnet - Regenschirme und gute Laune!",who:["Stefan","Rainer","Andre","Janos","Kai","Stevie","Basti","Michele"]},
  {yr:2022,photo:P22,loc:"Westerwald - Schönerlen",note:"Sommerhitze am See",                     who:["Stefan","Rainer","Andre","Kai","Stevie","Guido","Basti","Michele","Adrian"]},
  {yr:2021,photo:P21,loc:"Westerwald - Schönerlen",note:"Nachmittag am Teich",                    who:["Stefan","Kai","Stevie","Basti","Michele","Adrian"]},
  {yr:2020,photo:P20,loc:"Westerwald - Schönerlen",note:"Hitzesommer - Giraffen-Ring",            who:["Stefan","Rainer","Kai","Basti","Michele","Adrian","Malte"]},
  {yr:2019,photo:P19,loc:"Westerwald - Schönerlen",note:"Das erste Daddycamp - der Anfang einer Tradition!",who:["Basti","Adrian","Kai","Malte"]},
];

const STATS0 = [
  {yr:2019,wx:"Sonnig",         loc:"Westerwald - Schönerlen", note:"Das erste Daddycamp - der Anfang einer Tradition!", who:{Basti:1,Adrian:1,Kai:1},ex:["Malte"]},
  {yr:2020,wx:"Hitzesommer",    loc:"Westerwald - Schönerlen", note:"Hitzesommer - Giraffen-Ring", who:{Stefan:1,Rainer:1,Kai:1,Basti:1,Michele:1,Adrian:1},ex:["Claudius","Norman","Malte"]},
  {yr:2021,wx:"Wechselhaft",    loc:"Westerwald - Schönerlen", note:"Nachmittag am Teich", who:{Stefan:1,Kai:1,Stevie:1,Basti:1,Michele:1,Adrian:1},ex:[]},
  {yr:2022,wx:"Sonnig & heiß",  loc:"Westerwald - Schönerlen", note:"Sommerhitze am See", who:{Stefan:1,Rainer:1,Andre:1,Kai:1,Stevie:1,Guido:1,Basti:1,Michele:1,Adrian:1},ex:[]},
  {yr:2023,wx:"Sehr verregnet", loc:"Westerwald - Schönerlen", note:"Sehr verregnet - Regenschirme und gute Laune!", who:{Stefan:1,Rainer:1,Andre:1,Janos:1,Kai:1,Stevie:1,Basti:1,Michele:1},ex:["Norman"]},
  {yr:2024,wx:"Teils bewölkt",  loc:"Westerwald - Schönerlen", note:"Entspannter Abend am See", who:{Stefan:1,Rainer:1,Andre:1,Kai:1,Stevie:1,Basti:1,Adrian:1},ex:[]},
  {yr:2025,wx:"Bewölkt",        loc:"Holland - Camping TerSpegelt", note:"Am See - die Legenden unter sich", who:{Stefan:1,Rainer:1,Andre:1,Janos:1,Kai:1,Stevie:1,Basti:1,Michele:1,Adrian:1,Tuna:1},ex:[]},
];

const LIEDER0 = [
  {yr:"2019",song:"Old Town Road",artist:"Lil Nas X"},
  {yr:"2020",song:"Blinding Lights",artist:"The Weeknd"},
  {yr:"2021",song:"Levitating",artist:"Dua Lipa"},
  {yr:"2022",song:"As It Was",artist:"Harry Styles"},
  {yr:"2023",song:"Flowers",artist:"Miley Cyrus"},
  {yr:"2024",song:"Espresso",artist:"Sabrina Carpenter"},
];

const TROPHIES = ["Grillmeister","Mutigster Kletterer","Frühschläfer-Award","Stimmungskanone","Bester Fotograf","Kids-Held"];
const CTRS0 = [{key:"bier",label:"Bierkisten",unit:"Kisten"},{key:"wein",label:"Weinflaschen",unit:"Fl."},{key:"sekt",label:"Sektflaschen",unit:"Fl."},{key:"hard",label:"Harter Stoff",unit:"Fl."},{key:"fleisch",label:"Fleischstücke",unit:"Stk."}];
const POLLS0 = [{id:1,q:"Samstagsausflug um 10 Uhr?",ja:0,nein:0},{id:2,q:"Frühstück am Sonntag gemeinsam?",ja:0,nein:0}];

const ST = {
  yes:  {l:"Dabei", s:"✓", bg:"rgba(16,185,129,.18)", c:"#10B981", b:"rgba(16,185,129,.4)"},
  no:   {l:"Absage",s:"✗", bg:"rgba(239,68,68,.15)",  c:"#EF4444", b:"rgba(239,68,68,.4)"},
  open: {l:"Offen", s:"?", bg:"rgba(245,158,11,.15)", c:"#F59E0B", b:"rgba(245,158,11,.4)"},
};
const cyc = s => s==="yes"?"no":s==="no"?"open":"yes";
function fst(f){const a=[f.dSt,...f.kids.map(k=>k.st)];if(a.every(x=>x==="yes"))return"yes";if(a.every(x=>x==="no"))return"no";return"open";}
function cntdown(t){const d=t-new Date();if(d<=0)return{D:0,H:0,M:0,S:0};return{D:Math.floor(d/864e5),H:Math.floor(d%864e5/36e5),M:Math.floor(d%36e5/6e4),S:Math.floor(d%6e4/1e3)};}
const p2 = n => String(n).padStart(2,"0");

export default function App(){
  const C={bg:"#1E2D3E",bgL:"#263545",bc:"rgba(255,255,255,.11)",bo:"rgba(255,255,255,.2)",bl:"rgba(255,255,255,.12)",tx:"#ECF2F8",tm:"rgba(236,242,248,.6)",tf:"rgba(236,242,248,.35)",tl:"#10B981",rd:"#EF4444",gd:"#D4920A"};
  const sT={fontSize:11,textTransform:"uppercase",letterSpacing:3,color:G,fontWeight:700,marginBottom:14};
  const sC={background:C.bc,border:"1px solid "+C.bo,borderRadius:14,padding:16,marginBottom:12};

  // Tabs: Camp | Crew | Ausflug (Ort+Plan) | Org (Pack+Einkauf) | Fun
  const [tab,setTab]   = useState("home");
  const [ausflugTab,setAusflugTab] = useState("ort");
  const [orgTab,setOrgTab]  = useState("pack");
  const [packCat,setPackCat] = useState(null);
  const [funTab,setFunTab]  = useState("trophies");

  const [clock,setClock] = useState(cntdown(TOUR));
  const [fams,setFams]   = useState(FAM0);
  const [dests,setDests] = useState(DESTS);
  const [myVote,setMyVote] = useState(null);
  const [expFam,setExpFam] = useState(null);
  const [expDest,setExpDest] = useState(null);
  const [expAusfl,setExpAusfl] = useState(null);
  const [expStatYr,setExpStatYr] = useState(null);
  const [memYr,setMemYr] = useState(null);

  const [shops,setShops] = useState(SHOPS0);
  const [shopExtras,setShopExtras] = useState([]);
  const [newShopItem,setNewShopItem] = useState("");
  const [asgn,setAsgn]   = useState({});
  const [openAsgn,setOpenAsgn] = useState(null);
  const [delConf,setDelConf] = useState(null);

  const [pkChk,setPkChk] = useState({});
  const [packExtra,setPackExtra] = useState({});
  const [newPackItem,setNewPackItem] = useState({});

  const [polls,setPolls] = useState(POLLS0);
  const [newQ,setNewQ]   = useState("");
  const [tVotes,setTVotes] = useState({});
  const [myTV,setMyTV]   = useState({});
  const [ctrs,setCtrs]   = useState({bier:0,wein:0,sekt:0,hard:0,fleisch:0});
  const [custCtrs,setCustCtrs] = useState([]);
  const [newCtrName,setNewCtrName] = useState("");
  const [lieder,setLieder] = useState(LIEDER0);
  const [newLiedYr,setNewLiedYr] = useState("");
  // Foto-Abstimmung
  const [fotoVotes,setFotoVotes] = useState({}); // {photoId: {url, caption, votes:[], submittedBy}}
  const [myFotoVote,setMyFotoVote] = useState(null);
  const [newFotoCaption,setNewFotoCaption] = useState("");
  // Aufgaben
  const [aufgaben,setAufgaben] = useState([
    {id:"a1",title:"Zelt aufbauen",icon:"⛺",assignee:null,done:false},
    {id:"a2",title:"Brötchen kaufen (Sa)",icon:"🥐",assignee:null,done:false},
    {id:"a3",title:"Brötchen kaufen (So)",icon:"🥐",assignee:null,done:false},
    {id:"a4",title:"Lagerfeuer machen",icon:"🔥",assignee:null,done:false},
    {id:"a5",title:"Grill anzünden",icon:"🔥",assignee:null,done:false},
    {id:"a6",title:"Pavillon aufstellen",icon:"⛱️",assignee:null,done:false},
    {id:"a7",title:"Müll entsorgen",icon:"🗑️",assignee:null,done:false},
    {id:"a8",title:"Abschluss-Foto",icon:"📸",assignee:null,done:false},
  ]);
  const [newAufgabe,setNewAufgabe] = useState("");
  const [aufgabeAssigning,setAufgabeAssigning] = useState(null);
  const [tricountDone,setTricountDone] = useState({});
  const [sched,setSched] = useState(SCHED0);
  const [editSlot,setEditSlot] = useState(null);
  const [editVal,setEditVal] = useState({t:"",l:""});
  const [newLiedSong,setNewLiedSong] = useState("");
  const [newLiedArtist,setNewLiedArtist] = useState("");

  const [att,setAtt] = useState(() => {
    const r = {};
    STATS0.forEach(s => { r[s.yr] = {who:{...s.who}, ex:[...s.ex]}; });
    return r;
  });

  useEffect(() => {
    const iv = setInterval(() => setClock(cntdown(TOUR)), 1000);
    return () => clearInterval(iv);
  }, []);



  const fbSet = (key, val) => set(fbRef(db, "daddycamp/" + key), val).catch(e => console.error("FB:", e));

  // ── Firebase realtime listeners ────────────────────────────────────────────
  useEffect(() => {
    const unsubs = [];
    const listen = (key, setter) => {
      const u = onValue(fbRef(db, "daddycamp/" + key), snap => {
        const v = snap.val();
        if (v !== null && v !== undefined) setter(v);
      }, err => console.warn("FB:", key, err));
      unsubs.push(u);
    };
    listen("fams",         setFams);
    listen("dests",        setDests);
    listen("myVote",       setMyVote);
    listen("asgn",         setAsgn);
    listen("shops",        setShops);
    listen("shopExtras",   setShopExtras);
    listen("polls",        setPolls);
    listen("tVotes",       setTVotes);
    listen("myTV",         setMyTV);
    listen("ctrs",         setCtrs);
    listen("custCtrs",     setCustCtrs);
    listen("lieder",       setLieder);
    listen("tricountDone", setTricountDone);
    listen("att",          setAtt);
    listen("pkChk",        setPkChk);
    listen("packExtra",    setPackExtra);
    listen("sched",        setSched);
    listen("fotoVotes",    setFotoVotes);
    listen("myFotoVote",   setMyFotoVote);
    listen("aufgaben",     setAufgaben);
    return () => unsubs.forEach(u => u());
  }, []);

  // ── Push Notifications ─────────────────────────────────────────────────────
  const notify = (title, body) => {
    if (typeof Notification === "undefined") return;
    if (Notification.permission === "granted") {
      new Notification("⛺ Daddycamp – " + title, {body, icon:"/tent.svg"});
    }
  };
  const requestNotifPermission = () => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };



  // ── Synced setters ──────────────────────────────────────────────────────
  const syncFams         = v => { setFams(v);         fbSet("fams", v); };
  const syncDests  = v => { setDests(v); /* votes local */ };
  const syncMyVote       = v => { setMyVote(v);       fbSet("myVote", v); };
  const syncAsgn         = v => { setAsgn(v);         fbSet("asgn", v); };
  const syncShops        = v => { setShops(v);        fbSet("shops", v); };
  const syncShopExtras   = v => { setShopExtras(v);   fbSet("shopExtras", v); };
  const syncPolls        = v => { setPolls(v);        fbSet("polls", v); };
  const syncTVotes       = v => { setTVotes(v);       fbSet("tVotes", v); };
  const syncMyTV         = v => { setMyTV(v);         fbSet("myTV", v); };
  const syncCtrs         = v => { setCtrs(v);         fbSet("ctrs", v); };
  const syncCustCtrs     = v => { setCustCtrs(v);     fbSet("custCtrs", v); };
  const syncLieder       = v => { setLieder(v);       fbSet("lieder", v); };
  const syncTricountDone = v => { setTricountDone(v); fbSet("tricountDone", v); };
  const syncAtt          = v => { setAtt(v);          fbSet("att", v); };
  const syncPkChk        = v => { setPkChk(v);        fbSet("pkChk", v); };
  const syncPackExtra    = v => { setPackExtra(v);    fbSet("packExtra", v); };
  const syncSched        = v => { setSched(v);        fbSet("sched", v); };
  const syncFotoVotes  = v => { setFotoVotes(v);  fbSet("fotoVotes",v);   };
  const syncMyFotoVote = v => { setMyFotoVote(v); fbSet("myFotoVote",v);  };
  const syncAufgaben   = v => { setAufgaben(v);   fbSet("aufgaben",v);    };

  function addLied() {
    const s=newLiedSong.trim(), a=newLiedArtist.trim(), y=newLiedYr.trim();
    if(!s || !y) return;
    syncLieder([...lieder.filter(x=>x.yr!==y), {yr:y,song:s,artist:a}].sort((a,b)=>Number(b.yr)-Number(a.yr)));
    setNewLiedSong(""); setNewLiedArtist(""); setNewLiedYr("");
  }

  // ── Deadline ─────────────────────────────────────────────
  const now = new Date();
  const dlDiff = Math.ceil((DEADLINE - now) / 864e5);
  const dlPast = dlDiff < 0;

  // ── ShopRow ───────────────────────────────────────────────
  function ShopRow({item, isExtra}) {
    const ass = getA(item);
    const isO = openAsgn===item;
    const isCf = delConf===item;
    return (
      <div>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:"1px solid "+C.bl}}>
          <div onClick={()=>setOpenAsgn(isO?null:item)} style={{display:"flex",alignItems:"center",gap:8,flex:1,cursor:"pointer",minWidth:0}}>
            <div style={{width:18,height:18,borderRadius:4,flexShrink:0,border:"2px solid "+(ass.length?C.tl:C.bo),background:ass.length?C.tl:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {ass.length>0 && <span style={{color:"#fff",fontSize:9,fontWeight:900}}>✓</span>}
            </div>
            <span style={{flex:1,fontSize:13,color:ass.length?C.tm:C.tx,textDecoration:ass.length?"line-through":"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item}</span>
            {ass.length>0 && <div style={{display:"flex",gap:2,flexShrink:0}}>{ass.slice(0,3).map(d=><span key={d} style={{fontSize:9,background:"rgba(16,185,129,.2)",border:"1px solid rgba(16,185,129,.4)",borderRadius:20,padding:"1px 5px",color:C.tl,fontWeight:700}}>{d}</span>)}</div>}
            <span style={{fontSize:9,color:C.tf,flexShrink:0}}>{isO?"▲":"▼"}</span>
          </div>
          {isCf ? (
            <div style={{display:"flex",gap:3,flexShrink:0}}>
              <button onClick={e=>{e.stopPropagation();delShopItem(item,isExtra);}} style={{width:24,height:24,borderRadius:5,border:"none",background:C.rd,color:"#fff",cursor:"pointer",fontFamily:"Nunito,sans-serif",fontSize:11}}>✓</button>
              <button onClick={e=>{e.stopPropagation();setDelConf(null);}} style={{width:24,height:24,borderRadius:5,border:"1px solid "+C.bo,background:"transparent",color:C.tm,cursor:"pointer",fontFamily:"Nunito,sans-serif",fontSize:12}}>✕</button>
            </div>
          ) : (
            <button onClick={e=>{e.stopPropagation();setDelConf(item);}} style={{width:24,height:24,borderRadius:5,border:"1px solid "+C.bl,background:"transparent",color:C.tf,cursor:"pointer",fontSize:14,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
          )}
        </div>
        {isO && (
          <div style={{background:"rgba(255,255,255,.06)",borderRadius:8,padding:"8px 10px",marginTop:2,marginBottom:2}}>
            <div style={{fontSize:10,color:C.tm,marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Wer bringt es?</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {DADS.map(d => {
                const sel = ass.includes(d);
                return (
                  <button key={d} onClick={e=>{e.stopPropagation();togA(item,d);}} style={{padding:"4px 10px",borderRadius:20,border:"1px solid "+(sel?C.tl:C.bo),background:sel?"rgba(16,185,129,.2)":"rgba(255,255,255,.07)",color:sel?C.tl:C.tx,fontSize:11,fontWeight:sel?700:400,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{d}</button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  const TABS = [
    {id:"home",   icon:"⛺", label:"Camp"},
    {id:"crew",   icon:"👨‍👧", label:"Crew"},
    {id:"ausflug",icon:"🗺", label:"Ausflug"},
    {id:"org",    icon:"📦", label:"Org"},
    {id:"fun",    icon:"🎉", label:"Fun"},
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet"/>

      <div style={{minHeight:"100vh",background:C.bg,fontFamily:"Nunito,sans-serif",color:C.tx,paddingBottom:80}}>

        {/* HERO */}
        <div style={{position:"relative",height:tab==="home"?440:130,transition:"height .4s",overflow:"hidden"}}>
          <img src={P25} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 75%"}}/>
          <div style={{position:"absolute",inset:0,background:tab==="home"?"linear-gradient(to bottom,rgba(30,45,62,.6) 0%,rgba(30,45,62,.1) 25%,rgba(30,45,62,.05) 50%,rgba(30,45,62,.8) 85%,rgba(30,45,62,1) 100%)":"linear-gradient(to bottom,rgba(30,45,62,.5),rgba(30,45,62,.95))"}}/>
          <div style={{position:"absolute",top:tab==="home"?"12%":"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",width:"100%"}}>
            <div style={{fontSize:tab==="home"?50:26,fontFamily:"Oswald,sans-serif",fontWeight:700,letterSpacing:tab==="home"?8:5,color:"#fff",textTransform:"uppercase",textShadow:"0 2px 20px rgba(0,0,0,.6)"}}>Daddy<span style={{color:G}}>camp</span></div>
            {tab==="home" && <>
              <div style={{fontSize:12,letterSpacing:3,color:"rgba(255,255,255,.75)",textTransform:"uppercase",marginTop:4}}>Väter. Kinder. Legenden.</div>
              <button onClick={requestNotifPermission} style={{marginTop:8,background:"rgba(0,0,0,.3)",border:"1px solid rgba(255,255,255,.2)",borderRadius:20,padding:"3px 12px",fontSize:9,color:"rgba(255,255,255,.7)",cursor:"pointer",fontFamily:"Nunito,sans-serif",letterSpacing:1}}>
                {typeof Notification !== "undefined" && Notification.permission === "granted" ? "🔔 Aktiv" : "🔕 Benachrichtigungen"}
              </button>
            </>}
          </div>
          {tab==="home" && <div style={{position:"absolute",bottom:18,left:"50%",transform:"translateX(-50%)",background:"rgba(30,45,62,.8)",border:"1px solid "+G,borderRadius:30,padding:"6px 20px",fontSize:12,fontWeight:700,letterSpacing:2,color:G,backdropFilter:"blur(10px)",whiteSpace:"nowrap"}}>04. - 06. September 2026</div>}
        </div>

        <div style={{padding:"16px 14px",maxWidth:600,margin:"0 auto"}}>

        {/* ══ CAMP ════════════════════════════════════════════ */}
        {tab==="home" && (
          <div>
            {/* Countdown */}
            <div style={{display:"flex",gap:7,marginBottom:16}}>
              {[{l:"Tage",v:clock.D},{l:"Std",v:clock.H},{l:"Min",v:clock.M},{l:"Sek",v:clock.S}].map(x => (
                <div key={x.l} style={{flex:1,background:C.bgL,border:"1px solid "+C.bo,borderRadius:12,padding:"12px 5px",textAlign:"center"}}>
                  <div style={{fontSize:30,fontWeight:800,fontFamily:"Oswald,sans-serif",color:G}}>{p2(x.v)}</div>
                  <div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:2,marginTop:2}}>{x.l}</div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
              <div style={{...sC,padding:"12px 6px",textAlign:"center",marginBottom:0}}><div style={{fontSize:18}}>👨</div><div style={{fontSize:20,fontWeight:800,color:G,fontFamily:"Oswald,sans-serif"}}>{cD}/{tD}</div><div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:1,marginTop:1}}>Väter</div></div>
              <div style={{...sC,padding:"12px 6px",textAlign:"center",marginBottom:0}}><div style={{fontSize:18}}>👧</div><div style={{fontSize:20,fontWeight:800,color:G,fontFamily:"Oswald,sans-serif"}}>{cK}/{tK}</div><div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:1,marginTop:1}}>Kinder</div><div style={{fontSize:10,color:C.tf,marginTop:3}}>{"👦"+boys+" 👧"+girls}</div></div>
              <div style={{...sC,padding:"12px 6px",textAlign:"center",marginBottom:0}}><div style={{fontSize:18}}>🌙</div><div style={{fontSize:20,fontWeight:800,color:G,fontFamily:"Oswald,sans-serif"}}>2</div><div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:1,marginTop:1}}>Nächte</div></div>
            </div>

            {/* Deadline banner */}
            <div style={{background:dlPast?"rgba(16,185,129,.08)":"rgba(239,68,68,.09)",border:"1px solid "+(dlPast?"rgba(16,185,129,.3)":"rgba(239,68,68,.3)"),borderRadius:10,padding:"8px 14px",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{fontSize:11,color:dlPast?C.tl:C.rd,fontWeight:700}}>{dlPast?"✅ Anmeldefrist abgelaufen":"⏰ Anmeldefrist: 18. Mai 2026"}</div>
              {!dlPast && <div style={{fontSize:11,fontWeight:800,color:C.rd,background:"rgba(239,68,68,.15)",borderRadius:20,padding:"2px 10px"}}>{dlDiff} {dlDiff===1?"Tag":"Tage"}</div>}
            </div>

            {/* Anmeldungen */}
            <div onClick={()=>setTab("crew")} style={{background:rC===tD?"rgba(16,185,129,.12)":"rgba(212,146,10,.1)",border:"2px solid "+(rC===tD?"rgba(16,185,129,.55)":"rgba(212,146,10,.35)"),borderRadius:14,padding:"12px 14px",marginBottom:12,cursor:"pointer"}}>
              {rC===tD ? (
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:38,height:38,borderRadius:"50%",background:"rgba(16,185,129,.25)",border:"2px solid "+C.tl,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>✅</div>
                  <div><div style={{fontWeight:800,fontSize:14,color:C.tl}}>Alle Familien angemeldet!</div><div style={{fontSize:11,color:C.tm,marginTop:1}}>Alle {tD} Familien: Anmeldung & Anzahlung geleistet.</div></div>
                </div>
              ) : (
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontWeight:800,fontSize:13,color:G}}>📋 Anmeldungen</span><span style={{fontWeight:800,fontSize:12,color:G}}>{rC}/{tD}</span></div>
                  <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{fams.map(f=><span key={f.id} style={{fontSize:10,background:f.reg&&f.paid?"rgba(16,185,129,.15)":"rgba(255,255,255,.07)",border:"1px solid "+(f.reg&&f.paid?"rgba(16,185,129,.4)":C.bl),borderRadius:20,padding:"2px 7px",color:f.reg&&f.paid?C.tl:C.tm}}>{f.reg&&f.paid?"✓ ":""}{f.first}</span>)}</div>
                </div>
              )}
            </div>

            {/* Einkäufe */}
            {unassigned.length>0 ? (
              <div onClick={()=>{setTab("org");setOrgTab("einkauf");}} style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.35)",borderRadius:14,padding:"12px 14px",marginBottom:12,cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                  <div style={{fontWeight:700,fontSize:11,color:G,textTransform:"uppercase",letterSpacing:2}}>🛒 Einkäufe</div>
                  <div style={{display:"flex",gap:6}}>
                    <span style={{fontSize:11,background:"rgba(16,185,129,.2)",color:C.tl,padding:"2px 9px",borderRadius:20,fontWeight:700}}>✓ {allShopItems.length-unassigned.length} vergeben</span>
                    <span style={{fontSize:11,background:"rgba(239,68,68,.2)",color:C.rd,padding:"2px 9px",borderRadius:20,fontWeight:700}}>⚠️ {unassigned.length}</span>
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}><span style={{fontWeight:800,fontSize:13,color:C.rd}}>Noch nicht zugewiesen:</span></div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{unassigned.slice(0,5).map(i=><span key={i} style={{fontSize:10,background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.25)",borderRadius:20,padding:"2px 7px",color:"rgba(255,200,200,.9)"}}>{i}</span>)}{unassigned.length>5&&<span style={{fontSize:10,color:"rgba(239,68,68,.6)"}}>+{unassigned.length-5} mehr</span>}</div>
              </div>
            ) : (
              <div onClick={()=>{setTab("org");setOrgTab("einkauf");}} style={{background:"rgba(16,185,129,.12)",border:"2px solid rgba(16,185,129,.55)",borderRadius:14,padding:"12px 14px",marginBottom:12,cursor:"pointer"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:38,height:38,borderRadius:"50%",background:"rgba(16,185,129,.25)",border:"2px solid "+C.tl,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🛒</div>
                  <div style={{flex:1}}><div style={{fontWeight:800,fontSize:14,color:C.tl}}>Alle Einkäufe vergeben!</div><div style={{fontSize:11,color:C.tm,marginTop:1}}>Jede Sache hat einen Verantwortlichen.</div></div>
                  <div style={{background:"rgba(16,185,129,.25)",border:"1px solid "+C.tl,borderRadius:20,padding:"3px 12px",textAlign:"center"}}>
                    <div style={{fontFamily:"Oswald,sans-serif",fontSize:18,fontWeight:700,color:C.tl,lineHeight:1}}>{allShopItems.length}</div>
                    <div style={{fontSize:8,color:C.tl,letterSpacing:1}}>vergeben</div>
                  </div>
                </div>
              </div>
            )}

            {/* Rückblicke */}
            <div style={sC}>
              <div style={sT}>🎞️ Rückblicke</div>
              <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:5}}>
                {MEMS.map(m => (
                  <div key={m.yr} onClick={()=>setMemYr(memYr===m.yr?null:m.yr)} style={{flexShrink:0,width:76,borderRadius:10,overflow:"hidden",border:"1px solid "+(memYr===m.yr?G:C.bo),cursor:"pointer",background:C.bgL}}>
                    <img src={m.photo} alt="" style={{width:"100%",height:56,objectFit:"cover",objectPosition:"center top",background:"#1a2a3a",display:"block"}}/>
                    <div style={{padding:"3px 0",textAlign:"center",fontSize:11,fontWeight:800,color:memYr===m.yr?G:C.tx}}>{m.yr}</div>
                  </div>
                ))}
              </div>
              {memYr!==null && (()=>{
                const m = MEMS.find(x=>x.yr===memYr);
                if(!m) return null;
                return (
                  <div style={{marginTop:10,borderRadius:10,overflow:"hidden",border:"1px solid "+C.bo}}>
                    <img src={m.photo} alt="" style={{width:"100%",maxHeight:320,objectFit:"cover",objectPosition:"center top",background:"#111e2b",display:"block"}}/>
                    <div style={{padding:"10px 12px",background:C.bgL}}>
                      <div style={{fontWeight:800,fontSize:13}}>Daddycamp {m.yr}</div>
                      {m.loc && <div style={{fontSize:11,color:C.tm,marginTop:2}}>📍 {m.loc}</div>}
                      {m.note && <div style={{fontSize:11,color:C.tm,marginTop:3,fontStyle:"italic"}}>{m.note}</div>}
                      {m.who && m.who.length>0 && (
                        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>
                          {m.who.map(n=><span key={n} style={{fontSize:10,background:"rgba(240,180,41,.12)",border:"1px solid rgba(240,180,41,.3)",borderRadius:20,padding:"2px 8px",color:G,fontWeight:600}}>{n}</span>)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
              <div onClick={()=>{setTab("fun");setFunTab("stats");}} style={{marginTop:10,padding:"9px 14px",background:"rgba(212,146,10,.1)",border:"1px solid rgba(212,146,10,.35)",borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div><div style={{fontSize:12,fontWeight:700,color:G}}>📊 Wer war wann dabei?</div><div style={{fontSize:10,color:C.tm,marginTop:1}}>Zur Teilnehmer-Statistik</div></div>
                <div style={{color:G,fontSize:16}}>→</div>
              </div>
            </div>

            {/* Zielort */}
            

            {/* Tricount */}
            <div style={{background:"linear-gradient(135deg,rgba(212,146,10,.18),rgba(212,146,10,.05))",border:"1px solid "+G,borderRadius:14,padding:"14px 16px",marginBottom:0}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <div><div style={{fontWeight:800,fontSize:14,color:G}}>💰 Ausgaben & Abrechnung</div><div style={{fontSize:11,color:C.tm,marginTop:2}}>Kosten teilen via Tricount</div></div>
                <a href="https://tricount.com/tOWIhxKYqapuYQVFqh" target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
                  <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(212,146,10,.2)",border:"1px solid "+G,display:"flex",alignItems:"center",justifyContent:"center",color:G,fontSize:16}}>→</div>
                </a>
              </div>
              <div style={{borderTop:"1px solid rgba(212,146,10,.25)",paddingTop:10}}>
                <div style={{fontWeight:800,fontSize:13,color:G,marginBottom:6}}>Endabrechnung 2026</div>
                <div style={{fontSize:10,color:C.tm,textTransform:"uppercase",letterSpacing:2,fontWeight:700,marginBottom:8}}>Wer hat eingetragen & abgerechnet?</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                  {DADS.map(dad => {
                    const done = tricountDone[dad];
                    return (
                      <div key={dad} onClick={()=>(()=>{const v={...tricountDone,[dad]:!tricountDone[dad]};syncTricountDone(v);if(!tricountDone[dad])notify("Abrechnung",dad+" hat eingetragen & abgerechnet!");})()} style={{display:"flex",alignItems:"center",gap:3,padding:"2px 7px",borderRadius:20,background:done?"rgba(16,185,129,.18)":"transparent",cursor:"pointer"}}>
                        <span style={{fontSize:9,color:done?"#10B981":"rgba(255,255,255,.2)"}}>{done?"✓":"○"}</span>
                        <span style={{fontSize:10,fontWeight:done?700:400,color:done?"#10B981":C.tf}}>{dad}</span>
                      </div>
                    );
                  })}
                </div>
                {Object.values(tricountDone).filter(Boolean).length === DADS.length && (
                  <div style={{marginTop:8,fontSize:11,color:"#10B981",fontWeight:700,textAlign:"center"}}>✅ Alle haben eingetragen und abgerechnet!</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══ CREW ════════════════════════════════════════════ */}
        {tab==="crew" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:12}}>
              <div style={sT}>👨‍👧‍👦 Die Crew</div>
              <div style={{fontSize:10,color:C.tm,textTransform:"uppercase",letterSpacing:2}}>Tippen = ändern</div>
            </div>
            {fams.map(f => {
              const fs=fst(f), cfg=ST[fs]||ST.open, isO=expFam===f.id;
              return (
                <div key={f.id} style={{marginBottom:9}}>
                  <div style={{background:C.bc,border:"1px solid "+C.bo,borderLeft:"3px solid "+cfg.c,borderRadius:isO?"14px 14px 0 0":14,padding:"11px 13px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:9}}>
                      <button onClick={()=>setExpFam(isO?null:f.id)} style={{background:"none",border:"none",color:C.tf,cursor:"pointer",fontSize:10,padding:"2px 5px",fontFamily:"Nunito,sans-serif"}}>{isO?"▲":"▼"}</button>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:800,fontSize:13}}>{f.id===1?"👑 ":""}{f.first} {f.last}{f.reg&&f.paid?" ✅":""}</div>
                        <div style={{fontSize:10,color:C.tm,marginTop:1}}>{f.kids.length} {f.kids.length===1?"Kind":"Kinder"}</div>
                      </div>
                      <button onClick={e=>{e.stopPropagation();const ns=cyc(fs);syncFams(fams.map(x=>x.id!==f.id?x:{...x,dSt:ns,kids:x.kids.map(k=>({...k,st:ns}))}));}} style={{background:cfg.bg,border:"1px solid "+cfg.b,color:cfg.c,borderRadius:20,padding:"4px 12px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{cfg.l}</button>
                    </div>
                  </div>
                  {isO && (
                    <div style={{background:C.bgL,border:"1px solid "+C.bo,borderTop:"none",borderRadius:"0 0 14px 14px",padding:"3px 13px 11px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:9,padding:"8px 0",borderBottom:"1px solid "+C.bl}}>
                        <div style={{width:26,height:26,borderRadius:"50%",background:"rgba(240,180,41,.18)",border:"1px solid "+G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>👨</div>
                        <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700}}>{f.first} {f.last}</div></div>
                        <button onClick={e=>{e.stopPropagation();syncFams(fams.map(x=>x.id!==f.id?x:{...x,dSt:cyc(x.dSt)}));}} style={{background:ST[f.dSt].bg,border:"1px solid "+ST[f.dSt].b,color:ST[f.dSt].c,borderRadius:20,padding:"2px 9px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{ST[f.dSt].s}</button>
                      </div>
                      {f.kids.map((kid,ki) => (
                        <div key={ki} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 0",borderBottom:ki<f.kids.length-1?"1px solid "+C.bl:"none"}}>
                          <div style={{width:26,height:26,borderRadius:"50%",background:"rgba(16,185,129,.12)",border:"1px solid rgba(16,185,129,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{kid.g}</div>
                          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600}}>{kid.first}</div></div>
                          <button onClick={e=>{e.stopPropagation();syncFams(fams.map(x=>x.id!==f.id?x:{...x,kids:x.kids.map((k,i)=>i===ki?{...k,st:cyc(k.st)}:k)}));}} style={{background:ST[kid.st].bg,border:"1px solid "+ST[kid.st].b,color:ST[kid.st].c,borderRadius:20,padding:"2px 9px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{ST[kid.st].s}</button>
                          <button onClick={e=>{e.stopPropagation();syncFams(fams.map(x=>x.id!==f.id?x:{...x,kids:x.kids.filter((_,i)=>i!==ki)}));}} style={{width:22,height:22,borderRadius:5,border:"1px solid rgba(239,68,68,.3)",background:"transparent",color:"rgba(239,68,68,.6)",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                        </div>
                      ))}
                      <div style={{marginTop:9,paddingTop:9,borderTop:"1px solid "+C.bl}}>
                        <div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:1.5,marginBottom:7,fontWeight:700}}>Anmeldung & Bezahlung</div>
                        <div style={{display:"flex",gap:8}}>
                          <div onClick={()=>syncFams(fams.map(x=>x.id!==f.id?x:{...x,reg:!x.reg}))} style={{display:"flex",alignItems:"center",gap:6,flex:1,background:f.reg?"rgba(16,185,129,.12)":"rgba(255,255,255,.06)",border:"1px solid "+(f.reg?"rgba(16,185,129,.35)":C.bl),borderRadius:9,padding:"7px 10px",cursor:"pointer"}}>
                            <div style={{width:17,height:17,borderRadius:4,border:"2px solid "+(f.reg?C.tl:C.bo),background:f.reg?C.tl:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{f.reg&&<span style={{color:"#fff",fontSize:9,fontWeight:900}}>✓</span>}</div>
                            <span style={{fontSize:11,fontWeight:600,color:f.reg?C.tl:C.tm}}>Anmeldung</span>
                          </div>
                          <div onClick={()=>syncFams(fams.map(x=>x.id!==f.id?x:{...x,paid:!x.paid}))} style={{display:"flex",alignItems:"center",gap:6,flex:1,background:f.paid?"rgba(16,185,129,.12)":"rgba(255,255,255,.06)",border:"1px solid "+(f.paid?"rgba(16,185,129,.35)":C.bl),borderRadius:9,padding:"7px 10px",cursor:"pointer"}}>
                            <div style={{width:17,height:17,borderRadius:4,border:"2px solid "+(f.paid?C.tl:C.bo),background:f.paid?C.tl:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{f.paid&&<span style={{color:"#fff",fontSize:9,fontWeight:900}}>✓</span>}</div>
                            <span style={{fontSize:11,fontWeight:600,color:f.paid?C.tl:C.tm}}>Anzahlung</span>
                          </div>
                        </div>
                        {f.reg&&f.paid&&<div style={{marginTop:6,fontSize:11,color:C.tl,fontWeight:700,textAlign:"center"}}>✅ Vollständig!</div>}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{background:"rgba(212,146,10,.09)",border:"1px solid rgba(212,146,10,.28)",borderRadius:14,padding:13,marginTop:4}}>
              <div style={{textAlign:"center",color:G,fontWeight:800,fontSize:12,marginBottom:10}}>{tD} Väter · {tK} Kinder</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                <button onClick={()=>syncFams(fams.map(f=>({...f,reg:true})))} style={{padding:"8px",borderRadius:9,border:"1px solid rgba(16,185,129,.4)",background:"rgba(16,185,129,.1)",color:C.tl,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>☑️ Alle Anmeldungen</button>
                <button onClick={()=>syncFams(fams.map(f=>({...f,paid:true})))} style={{padding:"8px",borderRadius:9,border:"1px solid rgba(16,185,129,.4)",background:"rgba(16,185,129,.1)",color:C.tl,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>💶 Alle Anzahlungen</button>
              </div>
            </div>
            {(() => {
              const CAMP_YEAR = 2026;
              const regId = CAMP_YEAR === 2026 ? 2 : (myVote || null);
              const reg = regId ? REGISTRATIONS[regId] : null;
              const dest = DESTS.find(d=>d.id===regId);
              if(!reg && !regId) return (
                <div style={{background:"rgba(59,130,246,.08)",border:"1px solid rgba(59,130,246,.3)",borderRadius:14,padding:14,marginTop:12}}>
                  <div style={{fontWeight:800,fontSize:12,color:"#60A5FA",marginBottom:6}}>📋 Anmeldung {CAMP_YEAR+1}</div>
                  <div style={{fontSize:11,color:C.tm}}>Bitte zuerst unter Ausflug für {CAMP_YEAR+1} abstimmen – dann erscheinen hier die Anmeldedaten.</div>
                </div>
              );
              if(!reg) return null;
              const yearLabel = CAMP_YEAR === 2026 ? "2026" : String(CAMP_YEAR+1);
              return (
                <div style={{background:"rgba(59,130,246,.08)",border:"1px solid rgba(59,130,246,.3)",borderRadius:14,padding:14,marginTop:12}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:9}}>
                    <div style={{fontWeight:800,fontSize:12,color:"#60A5FA"}}>📋 Anmeldung {yearLabel}: {reg.name}</div>
                    {CAMP_YEAR!==2026 && <span style={{fontSize:9,background:"rgba(59,130,246,.2)",color:"#60A5FA",padding:"2px 7px",borderRadius:20,fontWeight:700}}>Abstimmungsergebnis</span>}
                  </div>
                  {reg.form ? (
                    <div>
                      {[
                        {n:"1",t:"Formular herunterladen & ausfüllen",d:"Alle Felder ausfüllen, Zeitraum: " + reg.zeitraum + ", Gruppenkennwort: " + reg.kennwort},
                        {n:"2",t:reg.gebuehr + " überweisen",d:"IBAN: "+reg.iban+" · BIC: "+reg.bic+" · "+reg.bank},
                        {n:"3",t:"Formular zurückschicken",d:"Scan per E-Mail: "+reg.email},
                      ].map(s => (
                        <div key={s.n} style={{display:"flex",gap:9,alignItems:"flex-start",marginBottom:8}}>
                          <div style={{width:20,height:20,borderRadius:"50%",background:"rgba(59,130,246,.25)",border:"1px solid rgba(59,130,246,.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:"#60A5FA",flexShrink:0,marginTop:1}}>{s.n}</div>
                          <div><div style={{fontSize:11,fontWeight:700}}>{s.t}</div><div style={{fontSize:10,color:C.tm}}>{s.d}</div></div>
                        </div>
                      ))}
                      <a href={reg.pdfUrl} download="Anmeldung_Schönerlen_2026.pdf" style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"rgba(59,130,246,.15)",border:"1px solid rgba(59,130,246,.5)",borderRadius:10,textDecoration:"none",marginBottom:10}}>
                        <div style={{width:36,height:36,borderRadius:9,background:"rgba(59,130,246,.25)",border:"1px solid rgba(59,130,246,.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>📄</div>
                        <div>
                          <div style={{fontSize:12,fontWeight:800,color:"#60A5FA"}}>Anmeldeformular herunterladen</div>
                          <div style={{fontSize:10,color:C.tm,marginTop:1}}>Anmeldung_Schönerlen_2026.pdf</div>
                        </div>
                        <div style={{marginLeft:"auto",color:"#60A5FA",fontSize:16,flexShrink:0}}>↓</div>
                      </a>
                      <div style={{padding:"8px 12px",background:"rgba(255,255,255,.05)",borderRadius:8,fontSize:10,color:C.tm,lineHeight:1.5}}>
                        Anmeldung ohne Zahlung gilt als nicht erfolgt. Die 25 EUR werden beim Aufenthalt angerechnet. Bei Nichterscheinen verfällt die Gebühr.
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{fontSize:11,color:C.tm,marginBottom:reg.hp?10:0}}>{reg.info}</div>
                      {reg.hp && <a href={reg.hp} target="_blank" rel="noreferrer" style={{fontSize:11,color:C.tl,fontWeight:700,textDecoration:"none"}}>🌐 Zur Homepage →</a>}
                    </div>
                  )}
                </div>
              );
            })()}
            
          </div>
        )}

        {/* ══ AUSFLUG (Ort + Plan) ═════════════════════════════ */}
        {tab==="ausflug" && (
          <div>
            <div style={{display:"flex",gap:7,marginBottom:16}}>
              {[{id:"ort",l:"🗳️ Ort & Abstimmung"},{id:"plan",l:"📅 Plan & Ausflüge"},{id:"termine",l:"📆 Daddycamp Termine"},{id:"wetter",l:"🌤️ Wetter"}].map(x => (
                <button key={x.id} onClick={()=>setAusflugTab(x.id)} style={{flex:1,padding:"8px 4px",borderRadius:10,border:"1px solid "+(ausflugTab===x.id?G:C.bo),background:ausflugTab===x.id?"rgba(212,146,10,.16)":C.bc,color:ausflugTab===x.id?G:C.tm,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{x.l}</button>
              ))}
            </div>

            {/* ORT SUB-TAB */}
            {ausflugTab==="ort" && (
              <div>
                {/* 2026 result banner */}
                <div style={{background:"rgba(16,185,129,.12)",border:"2px solid rgba(16,185,129,.5)",borderRadius:14,padding:"14px 16px",marginBottom:18,display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(16,185,129,.25)",border:"2px solid "+C.tl,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🌲</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:15,color:C.tl}}>Daddycamp 2026: Westerwald!</div>
                    <div style={{fontSize:11,color:C.tm,marginTop:2}}>Alle 11 Väter haben abgestimmt – einstimmiges Ergebnis.</div>
                  </div>
                  <div style={{textAlign:"center",flexShrink:0}}>
                    <div style={{fontFamily:"Oswald,sans-serif",fontSize:26,fontWeight:700,color:C.tl,lineHeight:1}}>11</div>
                    <div style={{fontSize:9,color:C.tm}}>Stimmen</div>
                  </div>
                </div>

                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                  <div style={sT}>🗳️ Abstimmung 2027</div>
                  <div style={{fontSize:10,color:C.tm,fontStyle:"italic",marginBottom:14}}>Wohin nächstes Jahr?</div>
                </div>
                {dests.map(d => {
                  const maxV=Math.max(...dests.map(x=>x.votes),1), pct=Math.round(d.votes/maxV*100), isV=myVote===d.id, isE=expDest===d.id;
                  const wasAb2026 = d.ab2026===true;
                  return (
                    <div key={d.id} style={{marginBottom:9}}>
                      <div onClick={()=>setExpDest(isE?null:d.id)} style={{background:wasAb2026?"rgba(245,158,11,.06)":isV?"rgba(212,146,10,.14)":C.bc,border:"1px solid "+(wasAb2026?"rgba(245,158,11,.3)":isV?G:C.bo),borderRadius:isE?"14px 14px 0 0":14,padding:"13px 14px",cursor:"pointer",opacity:1}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <div style={{display:"flex",gap:10,alignItems:"center"}}>
                            <span style={{fontSize:24}}>{d.emoji}</span>
                            <div>
                              <div style={{fontWeight:800,fontSize:12}}>{d.flag} {d.name}</div>
                              <div style={{fontSize:10,color:C.tm,marginTop:1}}>{d.desc} · {d.dist}</div>
                            </div>
                          </div>
                          <div style={{textAlign:"right",minWidth:55,flexShrink:0}}>
                            {wasAb2026 ? <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><div style={{fontSize:9,background:"rgba(245,158,11,.2)",color:"#F59E0B",padding:"2px 6px",borderRadius:20,fontWeight:700,whiteSpace:"nowrap"}}>2026 ausgebucht</div><div style={{fontSize:10,fontWeight:800,color:G}}>{d.votes>0?d.votes+' ★':'' }</div></div> : <><div style={{fontSize:12,fontWeight:800,color:G}}>{isV?"★":""}{d.votes}</div><div style={{fontSize:9,color:C.tf}}>Stimmen</div></>}
                          </div>
                        </div>
                        <div style={{marginTop:8,background:"rgba(255,255,255,.1)",borderRadius:3,height:4}}><div style={{width:pct+"%",height:"100%",borderRadius:3,background:isV?G:C.tl,transition:"width .5s"}}/></div>
                      </div>
                      {isE && (
                        <div style={{background:C.bgL,border:"1px solid "+(d.ab?"rgba(239,68,68,.3)":isV?G:C.bo),borderTop:"none",borderRadius:"0 0 14px 14px"}}>
                          <div style={{padding:"12px 14px"}}>
                            <p style={{fontSize:11,color:C.tm,lineHeight:1.6,margin:"0 0 10px"}}>{d.detail}</p>
                            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>{d.hl.map((h,i)=><span key={i} style={{fontSize:10,background:"rgba(255,255,255,.09)",border:"1px solid "+C.bo,borderRadius:20,padding:"3px 9px"}}>{h}</span>)}</div>
                            <div style={{display:"flex",gap:8,marginBottom:10}}>
                              <a href={d.nav} target="_blank" rel="noreferrer" style={{flex:1,display:"block",textAlign:"center",fontSize:10,color:G,fontWeight:700,textDecoration:"none",background:"rgba(212,146,10,.12)",border:"1px solid "+G,borderRadius:8,padding:"6px 10px"}}>🗺️ Maps</a>
                              {d.hp && <a href={d.hp} target="_blank" rel="noreferrer" style={{flex:1,display:"block",textAlign:"center",fontSize:10,color:C.tl,fontWeight:700,textDecoration:"none",background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.4)",borderRadius:8,padding:"6px 10px"}}>🌐 Homepage</a>}
                            </div>
                            {d.prices.length>0 && (
                              <div style={{background:"rgba(255,255,255,.05)",border:"1px solid "+C.bl,borderRadius:10,padding:"9px 12px",marginBottom:10}}>
                                <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:2,color:G,fontWeight:700,marginBottom:7}}>Preise</div>
                                {d.prices.map((r,i) => (
                                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:i<d.prices.length-1?"1px solid "+C.bl:"none"}}>
                                    <div style={{fontSize:10,color:r.b?C.tx:C.tm,fontWeight:r.b?700:400,flex:1,paddingRight:8}}>{r.l}</div>
                                    <div style={{fontSize:11,fontWeight:800,color:G,flexShrink:0}}>{r.p}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                            {wasAb2026 && <div style={{fontSize:10,color:"#F59E0B",fontWeight:600,marginBottom:6,padding:"5px 10px",background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.3)",borderRadius:8}}>ℹ️ War 2026 ausgebucht – für 2027 abstimmbar</div>}
                            {(
                              <button onClick={()=>{if(myVote===d.id)return;syncDests(dests.map(x=>({...x,votes:x.id===d.id?x.votes+1:x.votes})));syncMyVote(d.id);notify("Neue Abstimmung",d.name+" wurde gewählt");}} style={{width:"100%",padding:"9px",borderRadius:9,background:isV?G:"rgba(212,146,10,.17)",border:"1px solid "+G,color:isV?"#1E2D3E":G,fontWeight:800,cursor:"pointer",fontSize:13,fontFamily:"Nunito,sans-serif"}}>{isV?"✓ Dein Votum für 2027":"Für 2027 stimmen"}</button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* PLAN SUB-TAB */}
            {ausflugTab==="termine" && (
              <div>
                <div style={sT}>📆 Zukünftige Daddycamps</div>
                <p style={{fontSize:13,color:C.tm,marginBottom:16}}>Die nächsten Jahre sind bereits reserviert – save the date!</p>
                {[
                  {yr:2026, start:new Date(2026,8,4),  dates:"04. – 06. September 2026", days:"Fr – So", highlight:true},
                  {yr:2027, start:new Date(2027,8,3),  dates:"03. – 05. September 2027", days:"Fr – So", highlight:false},
                  {yr:2028, start:new Date(2028,7,25), dates:"25. – 27. August 2028",    days:"Fr – So", highlight:false},
                  {yr:2029, start:new Date(2029,7,17), dates:"17. – 19. August 2029",    days:"Fr – So", highlight:false},
                  {yr:2030, start:new Date(2030,7,9),  dates:"09. – 11. August 2030",    days:"Fr – So", highlight:false},
                ].map((t,i) => {
                  const msLeft = t.start - new Date();
                  const daysLeft = Math.max(0, Math.ceil(msLeft / 864e5));
                  const weeksLeft = Math.floor(daysLeft / 7);
                  const monthsLeft = Math.round(msLeft / (1000*60*60*24*30.44));
                  const already = msLeft < 0;
                  const kidYears = [2015, 2017, 2020, 2025];
                  return (
                    <div key={t.yr} style={{background:t.highlight?"rgba(212,146,10,.14)":C.bc,border:"1px solid "+(t.highlight?G:C.bo),borderRadius:14,padding:"14px 16px",marginBottom:10}}>
                      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                        <div style={{width:52,height:52,borderRadius:12,background:t.highlight?"rgba(212,146,10,.2)":"rgba(255,255,255,.07)",border:"1px solid "+(t.highlight?G:C.bl),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <div style={{fontFamily:"Oswald,sans-serif",fontWeight:700,fontSize:20,color:t.highlight?G:C.tm,lineHeight:1}}>{t.yr}</div>
                          {t.highlight && <div style={{fontSize:7,color:G,letterSpacing:1,marginTop:2}}>DIESES JAHR</div>}
                        </div>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:800,fontSize:14,color:t.highlight?G:C.tx}}>{t.dates}</div>
                          <div style={{fontSize:11,color:C.tm,marginTop:2}}>🗓️ {t.days} · Daddycamp {t.yr}</div>
                        </div>
                        {i===0 && <div style={{fontSize:22}}>⛺</div>}
                      </div>
                      {/* Countdown */}
                      <div style={{background:"rgba(255,255,255,.06)",borderRadius:10,padding:"8px 12px",marginBottom:8}}>
                        {already ? (
                          <div style={{fontSize:11,color:C.tl,fontWeight:700,textAlign:"center"}}>✅ Bereits stattgefunden</div>
                        ) : daysLeft <= 30 ? (
                          <div style={{display:"flex",gap:12,justifyContent:"center"}}>
                            {[{v:Math.floor(daysLeft/7),l:"Wochen"},{v:daysLeft%7,l:"Tage"}].map(x=>(
                              <div key={x.l} style={{textAlign:"center"}}>
                                <div style={{fontFamily:"Oswald,sans-serif",fontSize:26,fontWeight:700,color:G,lineHeight:1}}>{x.v}</div>
                                <div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:1}}>{x.l}</div>
                              </div>
                            ))}
                          </div>
                        ) : daysLeft <= 365 ? (
                          <div style={{display:"flex",gap:12,justifyContent:"center"}}>
                            {[{v:Math.floor(daysLeft/30),l:"Monate"},{v:daysLeft%30,l:"Tage"}].map(x=>(
                              <div key={x.l} style={{textAlign:"center"}}>
                                <div style={{fontFamily:"Oswald,sans-serif",fontSize:26,fontWeight:700,color:t.highlight?G:C.tm,lineHeight:1}}>{x.v}</div>
                                <div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:1}}>{x.l}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{display:"flex",gap:16,justifyContent:"center",alignItems:"center"}}>
                            {[{v:Math.floor(daysLeft/365),l:"Jahre"},{v:Math.floor((daysLeft%365)/30),l:"Monate"},{v:daysLeft%30,l:"Tage"}].map(x=>(
                              <div key={x.l} style={{textAlign:"center"}}>
                                <div style={{fontFamily:"Oswald,sans-serif",fontSize:22,fontWeight:700,color:C.tm,lineHeight:1}}>{x.v}</div>
                                <div style={{fontSize:9,color:C.tf,textTransform:"uppercase",letterSpacing:1}}>{x.l}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Child ages */}
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        {kidYears.map(born => {
                          const age = t.yr - born;
                          const emoji = age < 10 ? "👶" : age < 14 ? "🧒" : age < 18 ? "👦" : "🧑";
                          return (
                            <div key={born} style={{display:"flex",alignItems:"center",gap:4,background:"rgba(255,255,255,.07)",border:"1px solid "+C.bl,borderRadius:20,padding:"3px 10px"}}>
                              <span style={{fontSize:13}}>{emoji}</span>
                              <div>
                                <span style={{fontSize:10,color:C.tm}}>Jg. {born}: </span>
                                <span style={{fontSize:11,fontWeight:700,color:C.tx}}>{age} J.</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                <div style={{background:"rgba(255,255,255,.05)",border:"1px solid "+C.bl,borderRadius:12,padding:"10px 14px",marginTop:4}}>
                  <div style={{fontSize:10,color:C.tf,textAlign:"center",lineHeight:1.6}}>Alle Termine immer Freitag bis Sonntag · Anreise ab 15:00 Uhr · Abreise bis 12:00 Uhr</div>
                </div>
              </div>
            )}


            {/* PLAN SUB-TAB */}
            {ausflugTab==="plan" && (
              <div>
                <div style={sT}>📅 Ablaufplan</div>
                {sched.map(day => (
                  <div key={day.day} style={{marginBottom:22}}>
                    <div style={{fontSize:12,fontWeight:800,textTransform:"uppercase",letterSpacing:2,color:G,marginBottom:10,paddingBottom:7,borderBottom:"1px solid rgba(212,146,10,.28)"}}>{day.e} {day.day}</div>
                    <div style={{position:"relative",paddingLeft:20}}>
                      <div style={{position:"absolute",left:6,top:3,bottom:3,width:2,background:C.bl,borderRadius:2}}/>
                      {day.slots.map((s,i) => (
                        <div key={i} style={{display:"flex",gap:12,marginBottom:10,position:"relative"}}>
                          <div style={{position:"absolute",left:-17,top:7,width:9,height:9,borderRadius:"50%",background:G,border:"2px solid "+C.bg}}/>
                          {editSlot===s.id ? (
                            <div style={{display:"flex",gap:6,flex:1,alignItems:"center"}}>
                              <input value={editVal.t} onChange={e=>setEditVal(p=>({...p,t:e.target.value}))} style={{width:52,background:"rgba(255,255,255,.12)",border:"1px solid "+G,borderRadius:7,padding:"6px 7px",color:C.tx,fontSize:11,fontFamily:"Nunito,sans-serif",outline:"none"}}/>
                              <input value={editVal.l} onChange={e=>setEditVal(p=>({...p,l:e.target.value}))} style={{flex:1,background:"rgba(255,255,255,.12)",border:"1px solid "+G,borderRadius:7,padding:"6px 9px",color:C.tx,fontSize:11,fontFamily:"Nunito,sans-serif",outline:"none"}} onKeyDown={e=>{if(e.key==="Enter"){syncSched(sched.map(d=>({...d,slots:d.slots.map(sl=>sl.id===s.id?{...sl,t:editVal.t,l:editVal.l}:sl)})));setEditSlot(null);}}}/>
                              <button onClick={()=>{syncSched(sched.map(d=>({...d,slots:d.slots.map(sl=>sl.id===s.id?{...sl,t:editVal.t,l:editVal.l}:sl)})));setEditSlot(null);}} style={{width:28,height:28,borderRadius:7,border:"none",background:C.tl,color:"#fff",cursor:"pointer",fontFamily:"Nunito,sans-serif",fontSize:11,fontWeight:800,flexShrink:0}}>✓</button>
                              <button onClick={()=>setEditSlot(null)} style={{width:28,height:28,borderRadius:7,border:"1px solid "+C.bo,background:"transparent",color:C.tm,cursor:"pointer",fontFamily:"Nunito,sans-serif",fontSize:12,flexShrink:0}}>✕</button>
                            </div>
                          ) : (
                            <div style={{display:"flex",gap:10,flex:1,alignItems:"center"}}>
                              <div style={{minWidth:40,fontSize:11,color:G,fontWeight:700}}>{s.t}</div>
                              <div onClick={()=>{setEditSlot(s.id);setEditVal({t:s.t,l:s.l});}} style={{background:C.bc,border:"1px solid "+C.bo,borderRadius:10,padding:"8px 12px",flex:1,display:"flex",alignItems:"center",gap:9,cursor:"pointer"}}>
                                <span style={{fontSize:16}}>{s.i}</span><span style={{fontSize:13,flex:1}}>{s.l}</span><span style={{fontSize:9,color:C.tf}}>✏️</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={sT}>🗺️ Ausflugsziele 2026 – Westerwald</div>
                {(AUSFLUGS[2]||[]).map((a,i) => {
                  const isO = expAusfl===i;
                  return (
                    <div key={i} style={{marginBottom:8}}>
                      <div onClick={()=>setExpAusfl(isO?null:i)} style={{background:C.bc,border:"1px solid "+C.bo,borderRadius:isO?"14px 14px 0 0":14,padding:"11px 13px",cursor:"pointer"}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>{a.e}</span><div style={{flex:1}}><div style={{fontWeight:800,fontSize:12}}>{a.n}</div><div style={{fontSize:10,color:C.tm}}>{a.t} · {a.d}</div></div><span style={{fontSize:9,color:C.tf}}>{isO?"▲":"▼"}</span></div>
                      </div>
                      {isO && <div style={{background:C.bgL,border:"1px solid "+C.bo,borderTop:"none",borderRadius:"0 0 14px 14px",padding:"10px 13px"}}><a href={a.url} target="_blank" rel="noreferrer" style={{fontSize:10,color:G,fontWeight:700,textDecoration:"none",background:"rgba(212,146,10,.12)",border:"1px solid "+G,borderRadius:7,padding:"5px 12px"}}>In Maps öffnen →</a></div>}
                    </div>
                  );
                })}
                
              </div>
            )}
          </div>
        )}

        {tab==="ausflug" && ausflugTab==="wetter" && (
          <div style={{padding:"0 0"}}>
            <div style={sT}>🌤️ Wetterübersicht – Westerwald</div>
            <div style={{background:"rgba(59,130,246,.08)",border:"1px solid rgba(59,130,246,.25)",borderRadius:12,padding:"10px 14px",marginBottom:14}}>
              <div style={{fontSize:11,color:"#60A5FA",marginBottom:4}}>📍 Hofgut Schönerlen, Steinen · 04.–06. September 2026</div>
              <div style={{fontSize:10,color:C.tm}}>Wettervorschau näher am Termin präziser. Basierend auf Klimadaten September Westerwald.</div>
            </div>
            {[
              {day:"Freitag, 04.09.",icon:"⛅",temp:"19°C",low:"13°C",rain:"20%",wind:"12 km/h",desc:"Wechselnd bewölkt"},
              {day:"Samstag, 05.09.",icon:"🌤️",temp:"21°C",low:"14°C",rain:"10%",wind:"8 km/h",desc:"Überwiegend sonnig"},
              {day:"Sonntag, 06.09.",icon:"🌥️",temp:"18°C",low:"12°C",rain:"30%",wind:"15 km/h",desc:"Bewölkt, etwas Regen"},
            ].map((w,i) => (
              <div key={i} style={{background:C.bc,border:"1px solid "+C.bo,borderRadius:14,padding:"14px 16px",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                  <div><div style={{fontWeight:800,fontSize:13}}>{w.day}</div><div style={{fontSize:11,color:C.tm,marginTop:2}}>{w.desc}</div></div>
                  <div style={{fontSize:38,lineHeight:1}}>{w.icon}</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:7}}>
                  {[{l:"Max",v:w.temp,c:G},{l:"Min",v:w.low,c:"#60A5FA"},{l:"Regen",v:w.rain,c:"#60A5FA"},{l:"Wind",v:w.wind,c:C.tm}].map(x=>(
                    <div key={x.l} style={{background:"rgba(255,255,255,.06)",borderRadius:9,padding:"7px 4px",textAlign:"center"}}>
                      <div style={{fontSize:12,fontWeight:800,color:x.c}}>{x.v}</div>
                      <div style={{fontSize:9,color:C.tf,textTransform:"uppercase",letterSpacing:1,marginTop:1}}>{x.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{background:"rgba(255,255,255,.05)",border:"1px solid "+C.bl,borderRadius:10,padding:"9px 13px"}}>
              <div style={{fontSize:10,color:C.tf,lineHeight:1.5}}>💡 Aktuelle Vorhersage kurz vor dem Camp: wetter.de → Steinen, Westerwald</div>
            </div>
          </div>
        )}

        {/* ══ ORG (Pack + Einkauf) ════════════════════════════ */}
        {tab==="org" && (
          <div>
            <div style={{display:"flex",gap:7,marginBottom:16}}>
              {[{id:"pack",l:"🎒 Packliste"},{id:"einkauf",l:"🛒 Einkauf"},{id:"aufgaben",l:"📋 Aufgaben"}].map(x => (
                <button key={x.id} onClick={()=>setOrgTab(x.id)} style={{flex:1,padding:"8px 4px",borderRadius:10,border:"1px solid "+(orgTab===x.id?G:C.bo),background:orgTab===x.id?"rgba(212,146,10,.16)":C.bc,color:orgTab===x.id?G:C.tm,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{x.l}</button>
              ))}
            </div>

            {/* PACK SUB-TAB */}
            {orgTab==="pack" && (
              <div>
                <div style={sT}>🎒 Persönliche Ausrüstung</div>
                {PACK0.map(cat => {
                  const extras = packExtra[cat.cat] || [];
                  const allItems = [...cat.items, ...extras];
                  const cc = allItems.filter(item => pkChk[cat.cat+"_"+item]).length;
                  const done = cc === allItems.length && allItems.length > 0;
                  return (
                    <div key={cat.cat} style={{...sC,borderColor:done?"rgba(16,185,129,.45)":C.bo}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                        <div style={{fontWeight:800,fontSize:13}}>{cat.icon} {cat.cat}</div>
                        <div style={{fontSize:10,color:done?C.tl:C.tf,fontWeight:700}}>{cc}/{allItems.length}{done?" ✓":""}</div>
                      </div>
                      {allItems.map((item,idx) => {
                        const k = cat.cat+"_"+item;
                        const ic = pkChk[k];
                        const isExtra = idx >= cat.items.length;
                        return (
                          <div key={item} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:"1px solid "+C.bl}}>
                            <div onClick={()=>syncPkChk({...pkChk,[k]:!pkChk[k]})} style={{display:"flex",alignItems:"center",gap:10,flex:1,cursor:"pointer"}}>
                              <div style={{width:18,height:18,borderRadius:5,flexShrink:0,border:"2px solid "+(ic?C.tl:C.bo),background:ic?C.tl:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{ic&&<span style={{color:"#fff",fontSize:10,fontWeight:900}}>✓</span>}</div>
                              <span style={{fontSize:13,color:ic?C.tm:C.tx,textDecoration:ic?"line-through":"none"}}>{item}</span>
                            </div>
                            {isExtra && <button onClick={()=>()=>{const n={...packExtra};n[cat.cat]=(n[cat.cat]||[]).filter(x=>x!==item);syncPackExtra(n);}} style={{width:20,height:20,borderRadius:5,border:"1px solid rgba(239,68,68,.3)",background:"transparent",color:"rgba(239,68,68,.5)",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button>}
                          </div>
                        );
                      })}
                      <div style={{display:"flex",gap:6,marginTop:8}}>
                        <input value={newPackItem[cat.cat]||""} onChange={e=>setNewPackItem(p=>({...p,[cat.cat]:e.target.value}))} onKeyDown={e=>{if(e.key==="Enter"){const v=(newPackItem[cat.cat]||"").trim();if(v){syncPackExtra({...packExtra,[cat.cat]:[...(packExtra[cat.cat]||[]),v]});setNewPackItem(p=>({...p,[cat.cat]:""}));}}}} placeholder="+ Hinzufügen..." style={{flex:1,background:"rgba(255,255,255,.07)",border:"1px solid "+C.bl,borderRadius:7,padding:"5px 10px",color:C.tx,fontSize:11,fontFamily:"Nunito,sans-serif",outline:"none"}}/>
                        <button onClick={()=>{const v=(newPackItem[cat.cat]||"").trim();if(v){syncPackExtra({...packExtra,[cat.cat]:[...(packExtra[cat.cat]||[]),v]});setNewPackItem(p=>({...p,[cat.cat]:""}));} }} style={{padding:"5px 10px",borderRadius:7,background:"rgba(212,146,10,.2)",border:"1px solid rgba(212,146,10,.4)",color:G,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* EINKAUF SUB-TAB */}
            {orgTab==="einkauf" && (
              <div>
                <div style={{display:"flex",gap:7,marginBottom:14}}>
                  {[{id:"list",l:"🛒 Liste"},{id:"overview",l:"📋 Übersicht"}].map(x => (
                    <button key={x.id} onClick={()=>setPackCat(x.id)} style={{flex:1,padding:"7px 4px",borderRadius:9,border:"1px solid "+(packCat===x.id?G:C.bo),background:packCat===x.id?"rgba(212,146,10,.16)":C.bc,color:packCat===x.id?G:C.tm,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{x.l}</button>
                  ))}
                </div>

                {(packCat===null || packCat==="list") && (
                  <div>
                    {shops.filter(g=>g.items.length>0).map(g => (
                      <div key={g.g} style={sC}>
                        <div style={{fontWeight:800,fontSize:12,marginBottom:9}}>{g.g}</div>
                        {g.items.map(item => <ShopRow key={item} item={item} isExtra={false}/>)}
                      </div>
                    ))}
                    <div style={sC}>
                      <div style={{fontWeight:800,fontSize:12,marginBottom:9}}>Weitere Sachen</div>
                      {shopExtras.map(e => <ShopRow key={e.id} item={e.n} isExtra={true}/>)}
                      <div style={{display:"flex",gap:7,marginTop:10}}>
                        <input value={newShopItem} onChange={e=>setNewShopItem(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newShopItem.trim()){syncShopExtras([...shopExtras,{id:Date.now(),n:newShopItem.trim()}]);setNewShopItem("");}}} placeholder="Neuer Artikel..." style={{flex:1,background:"rgba(255,255,255,.09)",border:"1px solid "+C.bo,borderRadius:9,padding:"8px 12px",color:C.tx,fontSize:12,fontFamily:"Nunito,sans-serif",outline:"none"}}/>
                        <button onClick={()=>{if(newShopItem.trim()){syncShopExtras([...shopExtras,{id:Date.now(),n:newShopItem.trim()}]);setNewShopItem("");}}} style={{padding:"8px 14px",borderRadius:9,background:C.gd,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:12,fontFamily:"Nunito,sans-serif"}}>+</button>
                      </div>
                    </div>
                    {unassigned.length>0 && <div style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.22)",borderRadius:12,padding:"10px 14px",marginBottom:12}}><div style={{fontWeight:800,fontSize:11,color:C.rd,marginBottom:6}}>Noch nicht vergeben ({unassigned.length})</div>{unassigned.map(i=><div key={i} style={{fontSize:11,color:C.tm,padding:"2px 0"}}>• {i}</div>)}</div>}
                    <div style={{background:"rgba(255,255,255,.05)",border:"1px solid "+C.bl,borderRadius:11,padding:"11px 13px"}}>
                      <div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:2,fontWeight:700,marginBottom:7}}>Schnellzuweisung</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>{DADS.map(d=><button key={d} onClick={()=>{const nextAsgn={...asgn};allShopItems.forEach(item=>{const k=aKey(item);const c=asgn[k]||[];if(!c.includes(d))nextAsgn[k]=[...c,d];});syncAsgn(nextAsgn);}} style={{padding:"4px 10px",borderRadius:20,border:"1px solid "+C.bl,background:"rgba(255,255,255,.07)",color:C.tm,fontSize:10,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{d}</button>)}</div>
                      <button onClick={()=>syncAsgn({})} style={{width:"100%",padding:"6px",borderRadius:9,border:"1px solid rgba(239,68,68,.35)",background:"transparent",color:"rgba(239,68,68,.6)",fontSize:10,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>Alle Zuweisungen zurücksetzen</button>
                    </div>
                  </div>
                )}

                {packCat==="overview" && (
                  <div>
                    {DADS.map(d => {
                      const items = dadItems(d);
                      return (
                        <div key={d} style={{...sC,borderLeft:"3px solid "+(items.length?C.tl:C.bl)}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:items.length?8:0}}>
                            <div style={{fontWeight:800,fontSize:13}}>{d}</div>
                            <div style={{fontSize:10,color:items.length?C.tl:C.tf,fontWeight:700,background:items.length?"rgba(16,185,129,.12)":"rgba(255,255,255,.06)",border:"1px solid "+(items.length?"rgba(16,185,129,.3)":C.bl),borderRadius:20,padding:"2px 9px"}}>{items.length} Artikel</div>
                          </div>
                          {items.length ? <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{items.map(i=><span key={i} style={{fontSize:10,background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.25)",borderRadius:20,padding:"3px 9px"}}>{i}</span>)}</div> : <div style={{fontSize:11,color:C.tf,fontStyle:"italic"}}>Noch nichts zugewiesen</div>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══ AUFGABEN ══ */}
        {tab==="org" && orgTab==="aufgaben" && (
          <div>
            <div style={sT}>📋 Aufgaben am Camp</div>
            <p style={{fontSize:12,color:C.tm,marginBottom:14}}>Wer macht was? Tippe zum Zuweisen.</p>
            {aufgaben.map(a => {
              const isAssigning = aufgabeAssigning===a.id;
              return (
                <div key={a.id} style={{background:a.done?"rgba(16,185,129,.1)":C.bc,border:"1px solid "+(a.done?"rgba(16,185,129,.4)":C.bo),borderRadius:14,padding:"12px 14px",marginBottom:9}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div onClick={()=>syncAufgaben(aufgaben.map(x=>x.id!==a.id?x:{...x,done:!x.done}))} style={{width:22,height:22,borderRadius:6,border:"2px solid "+(a.done?"#10B981":C.bo),background:a.done?"#10B981":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
                      {a.done&&<span style={{color:"#fff",fontSize:11,fontWeight:900}}>✓</span>}
                    </div>
                    <span style={{fontSize:18}}>{a.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:700,color:a.done?C.tm:C.tx,textDecoration:a.done?"line-through":"none"}}>{a.title}</div>
                      {a.assignee && <div style={{fontSize:10,color:C.tl,marginTop:2}}>👤 {a.assignee}</div>}
                    </div>
                    <button onClick={()=>setAufgabeAssigning(isAssigning?null:a.id)} style={{padding:"4px 10px",borderRadius:20,border:"1px solid "+(a.assignee?C.tl:C.bo),background:a.assignee?"rgba(16,185,129,.15)":"rgba(255,255,255,.07)",color:a.assignee?C.tl:C.tm,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>
                      {a.assignee?"✓ "+a.assignee:"Zuweisen"}
                    </button>
                  </div>
                  {isAssigning && (
                    <div style={{marginTop:10,background:"rgba(255,255,255,.06)",borderRadius:9,padding:"8px 10px"}}>
                      <div style={{fontSize:10,color:C.tm,marginBottom:7,textTransform:"uppercase",letterSpacing:1}}>Wer übernimmt es?</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                        {DADS.map(d=>(
                          <button key={d} onClick={()=>{syncAufgaben(aufgaben.map(x=>x.id!==a.id?x:{...x,assignee:a.assignee===d?null:d}));setAufgabeAssigning(null);}} style={{padding:"4px 10px",borderRadius:20,border:"1px solid "+(a.assignee===d?C.tl:C.bo),background:a.assignee===d?"rgba(16,185,129,.2)":"rgba(255,255,255,.07)",color:a.assignee===d?C.tl:C.tx,fontSize:11,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{d}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{background:"rgba(255,255,255,.05)",border:"1px solid "+C.bl,borderRadius:12,padding:"10px 13px",marginTop:4}}>
              <div style={{fontSize:9,color:C.tm,textTransform:"uppercase",letterSpacing:2,fontWeight:700,marginBottom:7}}>Neue Aufgabe</div>
              <div style={{display:"flex",gap:7}}>
                <input value={newAufgabe} onChange={e=>setNewAufgabe(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newAufgabe.trim()){syncAufgaben([...aufgaben,{id:"u"+Date.now(),title:newAufgabe.trim(),icon:"✅",assignee:null,done:false}]);setNewAufgabe("");}}} placeholder="Aufgabe eingeben..." style={{flex:1,background:"rgba(255,255,255,.09)",border:"1px solid "+C.bo,borderRadius:9,padding:"7px 10px",color:C.tx,fontSize:12,fontFamily:"Nunito,sans-serif",outline:"none"}}/>
                <button onClick={()=>{if(newAufgabe.trim()){syncAufgaben([...aufgaben,{id:"u"+Date.now(),title:newAufgabe.trim(),icon:"✅",assignee:null,done:false}]);setNewAufgabe("");}}} style={{padding:"7px 14px",borderRadius:9,background:C.gd,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:12,fontFamily:"Nunito,sans-serif"}}>+</button>
              </div>
            </div>
            <div style={{marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 14px",background:"rgba(16,185,129,.08)",border:"1px solid rgba(16,185,129,.25)",borderRadius:10}}>
              <div style={{fontSize:11,color:C.tm}}>{aufgaben.filter(a=>a.done).length}/{aufgaben.length} Aufgaben erledigt</div>
              <div style={{height:6,width:120,background:"rgba(255,255,255,.1)",borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:(aufgaben.filter(a=>a.done).length/Math.max(aufgaben.length,1)*100)+"%",background:C.tl,borderRadius:3,transition:"width .5s"}}/>
              </div>
            </div>
          </div>
        )}

        {/* ══ FUN ═════════════════════════════════════════════ */}
        {tab==="fun" && (
          <div>
            <div style={{display:"flex",gap:5,marginBottom:16,flexWrap:"wrap"}}>
              {[{id:"trophies",l:"🏆 Trophäen"},{id:"polls",l:"📢 Abstimmungen"},{id:"stats",l:"📊 Statistiken"},{id:"chart",l:"📊 Diagramm"},{id:"foto",l:"📸 Foto-Vote"},{id:"lied",l:"🎵 Lied"},{id:"ctr",l:"🍺 Verbrauch"}].map(x => (
                <button key={x.id} onClick={()=>setFunTab(x.id)} style={{padding:"6px 11px",borderRadius:9,border:"1px solid "+(funTab===x.id?G:C.bo),background:funTab===x.id?"rgba(212,146,10,.16)":C.bc,color:funTab===x.id?G:C.tm,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{x.l}</button>
              ))}
            </div>

            {funTab==="trophies" && (
              <div>
                <div style={sT}>🏆 Trophäen 2026</div>
                {TROPHIES.map(cat => {
                  const k = cat.replace(/\s/g,"_");
                  const vs = tVotes[k] || {};
                  const myV = myTV[cat];
                  const sorted = Object.entries(vs).sort((a,b)=>b[1]-a[1]);
                  return (
                    <div key={cat} style={sC}>
                      <div style={{fontWeight:800,fontSize:13,marginBottom:9}}>{cat}</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:7}}>
                        {DADS.map(d => {
                          const cnt=vs[d]||0, isV=myV===d;
                          return (
                            <button key={d} onClick={()=>{if(myTV[cat])return;syncTVotes({...tVotes,[k]:{...(tVotes[k]||{}),[d]:((tVotes[k]||{})[d]||0)+1}});syncMyTV({...myTV,[cat]:d});}} disabled={!!myV&&!isV} style={{padding:"5px 12px",borderRadius:20,border:"1px solid "+(isV?G:cnt?"rgba(16,185,129,.4)":C.bl),background:isV?"rgba(212,146,10,.2)":cnt?"rgba(16,185,129,.12)":"rgba(255,255,255,.05)",color:isV?G:cnt?C.tl:C.tm,fontSize:11,fontWeight:isV||cnt?700:400,cursor:myV&&!isV?"default":"pointer",fontFamily:"Nunito,sans-serif",opacity:myV&&!isV?.5:1}}>
                              {d}{cnt?" ("+cnt+")":""}
                            </button>
                          );
                        })}
                      </div>
                      {sorted.length>0 && <div style={{fontSize:10,color:C.tm}}>Führend: {sorted[0][0]} ({sorted[0][1]})</div>}
                    </div>
                  );
                })}
              </div>
            )}

            {funTab==="polls" && (
              <div>
                <div style={sT}>📢 Abstimmungen</div>
                {polls.map(poll => {
                  const tot = poll.ja+poll.nein;
                  return (
                    <div key={poll.id} style={sC}>
                      <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>{poll.q}</div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                        <button onClick={()=>syncPolls(polls.map(x=>x.id!==poll.id?x:{...x,ja:x.ja+1}))} style={{padding:"9px",borderRadius:9,border:"1px solid "+C.tl,background:"rgba(16,185,129,.12)",color:C.tl,fontWeight:800,cursor:"pointer",fontSize:13,fontFamily:"Nunito,sans-serif"}}>Ja {poll.ja>0?"("+poll.ja+")":""}</button>
                        <button onClick={()=>syncPolls(polls.map(x=>x.id!==poll.id?x:{...x,nein:x.nein+1}))} style={{padding:"9px",borderRadius:9,border:"1px solid rgba(239,68,68,.4)",background:"rgba(239,68,68,.1)",color:C.rd,fontWeight:800,cursor:"pointer",fontSize:13,fontFamily:"Nunito,sans-serif"}}>Nein {poll.nein>0?"("+poll.nein+")":""}</button>
                      </div>
                      {tot>0 && <div style={{marginTop:8,height:5,borderRadius:3,background:"rgba(255,255,255,.08)",overflow:"hidden"}}><div style={{height:"100%",width:Math.round(poll.ja/tot*100)+"%",background:C.tl,transition:"width .5s"}}/></div>}
                    </div>
                  );
                })}
                <div style={sC}>
                  <input value={newQ} onChange={e=>setNewQ(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newQ.trim()){syncPolls([...polls,{id:Date.now(),q:newQ.trim(),ja:0,nein:0}]);notify("Neue Abstimmung",newQ.trim());setNewQ("");}}}
 placeholder="Neue Abstimmungsfrage..." style={{width:"100%",background:"rgba(255,255,255,.09)",border:"1px solid "+C.bo,borderRadius:9,padding:"8px 12px",color:C.tx,fontSize:12,fontFamily:"Nunito,sans-serif",outline:"none",boxSizing:"border-box",marginBottom:7}}/>
                  <button onClick={()=>{if(newQ.trim()){syncPolls([...polls,{id:Date.now(),q:newQ.trim(),ja:0,nein:0}]);notify("Neue Abstimmung",newQ.trim());setNewQ("");}}}
 style={{width:"100%",padding:"8px",borderRadius:9,background:C.gd,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:12,fontFamily:"Nunito,sans-serif"}}>Abstimmung erstellen</button>
                </div>
              </div>
            )}

            {funTab==="stats" && (
              <div>
                <div style={sT}>📊 Daddycamp Statistiken</div>
                {STATS0.map(s => {
                  const yd = att[s.yr] || {who:{},ex:[]};
                  const tot = DADS.filter(d=>yd.who[d]).length + (yd.ex||[]).length;
                  const isE = expStatYr===s.yr;
                  return (
                    <div key={s.yr} style={{marginBottom:8}}>
                      <div onClick={()=>setExpStatYr(isE?null:s.yr)} style={{background:C.bc,border:"1px solid "+C.bo,borderRadius:isE?"14px 14px 0 0":14,padding:"11px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
                        <div style={{width:44,height:44,borderRadius:9,background:"rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><div style={{fontFamily:"Oswald,sans-serif",fontWeight:700,fontSize:15,color:C.tm}}>{s.yr}</div></div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:11,fontWeight:700,marginBottom:2}}>{s.wx}</div>
                          {s.loc && <div style={{fontSize:9,color:C.tf,marginBottom:3}}>📍 {s.loc}</div>}
                          <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                            {DADS.filter(d=>yd.who[d]).map(d=><span key={d} style={{fontSize:8,background:"rgba(16,185,129,.2)",border:"1px solid rgba(16,185,129,.4)",borderRadius:20,padding:"1px 5px",color:C.tl,fontWeight:700}}>{d}</span>)}
                            {(yd.ex||[]).map((x,i)=><span key={i} style={{fontSize:8,background:"rgba(16,185,129,.2)",border:"1px solid rgba(16,185,129,.4)",borderRadius:20,padding:"1px 5px",color:C.tl,fontWeight:700}}>{x}</span>)}
                          </div>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:18,fontWeight:800,color:tot>0?G:C.tf,fontFamily:"Oswald,sans-serif"}}>{tot}</div><div style={{fontSize:8,color:C.tf}}>Familien</div></div>
                      </div>
                      {isE && (
                        <div style={{background:C.bgL,border:"1px solid "+C.bo,borderTop:"none",borderRadius:"0 0 14px 14px",padding:"10px 13px"}}>
                          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
                            {DADS.filter(d=>yd.who[d]).map(d=><span key={d} style={{fontSize:11,background:"rgba(16,185,129,.15)",border:"1px solid rgba(16,185,129,.4)",borderRadius:20,padding:"4px 10px",color:C.tl,fontWeight:600}}>{d}</span>)}
                            {(yd.ex||[]).map((x,i)=>(
                              <div key={i} style={{display:"flex",alignItems:"center",gap:4,background:"rgba(16,185,129,.12)",border:"1px solid rgba(16,185,129,.4)",borderRadius:20,padding:"4px 10px",fontSize:11,color:C.tl,fontWeight:600}}>
                                {x}<span onClick={()=>{const attCopy={...att};attCopy[s.yr]={...(att[s.yr]||{who:{},ex:[]})};attCopy[s.yr].ex=(att[s.yr]?.ex||[]).filter((_,j)=>j!==i);syncAtt(attCopy);}} style={{cursor:"pointer",opacity:.7,marginLeft:3,fontSize:10}}>✕</span>
                              </div>
                            ))}
                          </div>
                          {s.note && <div style={{fontSize:10,color:C.tm,fontStyle:"italic",marginBottom:8,padding:"6px 10px",background:"rgba(255,255,255,.05)",borderRadius:7}}>{s.note}</div>}
                          <div style={{display:"flex",gap:7}}>
                            <input id={"ax"+s.yr} placeholder="Weitere Familie..." style={{flex:1,background:"rgba(255,255,255,.08)",border:"1px solid "+C.bo,borderRadius:7,padding:"6px 10px",color:C.tx,fontSize:11,fontFamily:"Nunito,sans-serif",outline:"none"}} onKeyDown={e=>{if(e.key==="Enter"&&e.target.value.trim()){const attKD={...att,[s.yr]:{...(att[s.yr]||{who:{},ex:[]}),...att[s.yr],ex:[...(att[s.yr]?.ex||[]),e.target.value.trim()]}};syncAtt(attKD);e.target.value="";}}}/>
                            <button onClick={()=>{const inp=document.getElementById("ax"+s.yr);if(inp&&inp.value.trim()){const attBtn={...att,[s.yr]:{...(att[s.yr]||{who:{},ex:[]}),...att[s.yr],ex:[...(att[s.yr]?.ex||[]),inp.value.trim()]}};syncAtt(attBtn);inp.value="";}}} style={{padding:"6px 12px",borderRadius:7,background:C.gd,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:11,fontFamily:"Nunito,sans-serif"}}>+</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div style={{...sC,marginTop:6}}>
                  <div style={{fontWeight:800,fontSize:13,marginBottom:10}}>Teilnahmen 2019-2025</div>
                  {DADS.map(d => {
                    const cnt = STATS0.filter(s=>(att[s.yr]||{}).who?.[d]).length;
                    const pct = Math.round(cnt/STATS0.length*100);
                    return (
                      <div key={d} style={{display:"flex",alignItems:"center",gap:9,padding:"6px 0",borderBottom:"1px solid "+C.bl}}>
                        <div style={{minWidth:65,fontSize:12,fontWeight:600}}>{d}</div>
                        <div style={{flex:1,height:5,background:"rgba(255,255,255,.1)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:pct+"%",background:cnt>=5?G:cnt>=3?C.tl:"rgba(255,255,255,.2)",borderRadius:3,transition:"width .5s"}}/></div>
                        <div style={{minWidth:55,textAlign:"right"}}><span style={{fontSize:12,fontWeight:800,color:cnt>=5?G:cnt>=3?C.tl:C.tf}}>{cnt}x</span><span style={{fontSize:9,color:C.tf}}> ({pct}%)</span></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {funTab==="lied" && (
              <div>
                <div style={sT}>🎵 Lied des Jahres</div>
                <p style={{fontSize:12,color:C.tm,marginBottom:14}}>Das Lied das euren Sommer geprägt hat.</p>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
                  {lieder.sort((a,b)=>Number(b.yr)-Number(a.yr)).map(ls => (
                    <div key={ls.yr} style={sC}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{fontFamily:"Oswald,sans-serif",fontWeight:700,fontSize:20,color:G,minWidth:44,flexShrink:0}}>{ls.yr}</div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:13,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ls.song}</div>
                          <div style={{fontSize:11,color:C.tm}}>{ls.artist}</div>
                        </div>
                        <div style={{display:"flex",gap:6,flexShrink:0}}>
                          <a href={"https://music.apple.com/search?term="+encodeURIComponent(ls.song+" "+ls.artist)} target="_blank" rel="noreferrer" style={{width:30,height:30,borderRadius:8,background:"rgba(255,255,255,.08)",border:"1px solid "+C.bl,display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",fontSize:16}}>🍎</a>
                          <a href={"https://open.spotify.com/search/"+encodeURIComponent(ls.song+" "+ls.artist)} target="_blank" rel="noreferrer" style={{width:30,height:30,borderRadius:8,background:"rgba(30,215,96,.1)",border:"1px solid rgba(30,215,96,.3)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",fontSize:16}}>🟢</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{...sC,background:"rgba(212,146,10,.08)",border:"1px solid rgba(212,146,10,.3)"}}>
                  <div style={{fontWeight:800,fontSize:12,color:G,marginBottom:10}}>+ Lied des Jahres eintragen</div>
                  <div style={{display:"flex",gap:7,marginBottom:8}}>
                    <input value={newLiedYr} onChange={e=>setNewLiedYr(e.target.value)} placeholder="Jahr" style={{width:72,flexShrink:0,background:"rgba(255,255,255,.09)",border:"1px solid "+C.bo,borderRadius:9,padding:"8px 10px",color:C.tx,fontSize:12,fontFamily:"Nunito,sans-serif",outline:"none"}}/>
                    <input value={newLiedSong} onChange={e=>setNewLiedSong(e.target.value)} placeholder="Titel..." style={{flex:1,background:"rgba(255,255,255,.09)",border:"1px solid "+C.bo,borderRadius:9,padding:"8px 10px",color:C.tx,fontSize:12,fontFamily:"Nunito,sans-serif",outline:"none"}}/>
                  </div>
                  <div style={{display:"flex",gap:7}}>
                    <input value={newLiedArtist} onChange={e=>setNewLiedArtist(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")addLied();}} placeholder="Künstler..." style={{flex:1,background:"rgba(255,255,255,.09)",border:"1px solid "+C.bo,borderRadius:9,padding:"8px 10px",color:C.tx,fontSize:12,fontFamily:"Nunito,sans-serif",outline:"none"}}/>
                    <button onClick={addLied} style={{padding:"8px 16px",borderRadius:9,background:C.gd,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:12,fontFamily:"Nunito,sans-serif",flexShrink:0}}>Speichern</button>
                  </div>
                </div>
              </div>
            )}

            {funTab==="ctr" && (
              <div>
                <div style={sT}>🍺 Verbrauch-Counter</div>
                {CTRS0.map(x => (
                  <div key={x.key} style={{...sC,display:"flex",alignItems:"center",gap:10}}>
                    <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{x.label}</div><div style={{fontSize:10,color:C.tf,marginTop:1}}>{x.unit}</div></div>
                    <div style={{display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
                      <button onClick={()=>syncCtrs({...ctrs,[x.key]:Math.max(0,ctrs[x.key]-1)})} style={{width:36,height:36,borderRadius:9,border:"1px solid "+C.bo,background:"rgba(255,255,255,.08)",color:C.tx,fontSize:22,cursor:"pointer",fontFamily:"Nunito,sans-serif",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <div style={{minWidth:34,textAlign:"center",fontSize:26,fontWeight:800,color:G,fontFamily:"Oswald,sans-serif"}}>{ctrs[x.key]}</div>
                      <button onClick={()=>syncCtrs({...ctrs,[x.key]:ctrs[x.key]+1})} style={{width:36,height:36,borderRadius:9,border:"1px solid "+C.tl,background:"rgba(16,185,129,.15)",color:C.tl,fontSize:22,cursor:"pointer",fontFamily:"Nunito,sans-serif",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    </div>
                  </div>
                ))}
                {custCtrs.map((c,i) => (
                  <div key={c.id} style={{...sC,display:"flex",alignItems:"center",gap:10}}>
                    <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{c.n}</div></div>
                    <div style={{display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
                      <button onClick={()=>syncCustCtrs(custCtrs.map((x,j)=>j===i?{...x,v:Math.max(0,x.v-1)}:x))} style={{width:36,height:36,borderRadius:9,border:"1px solid "+C.bo,background:"rgba(255,255,255,.08)",color:C.tx,fontSize:22,cursor:"pointer",fontFamily:"Nunito,sans-serif",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <div style={{minWidth:34,textAlign:"center",fontSize:26,fontWeight:800,color:G,fontFamily:"Oswald,sans-serif"}}>{c.v}</div>
                      <button onClick={()=>syncCustCtrs(custCtrs.map((x,j)=>j===i?{...x,v:x.v+1}:x))} style={{width:36,height:36,borderRadius:9,border:"1px solid "+C.tl,background:"rgba(16,185,129,.15)",color:C.tl,fontSize:22,cursor:"pointer",fontFamily:"Nunito,sans-serif",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                      <button onClick={()=>syncCustCtrs(custCtrs.filter((_,j)=>j!==i))} style={{width:26,height:26,borderRadius:6,border:"1px solid rgba(239,68,68,.3)",background:"transparent",color:"rgba(239,68,68,.6)",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                    </div>
                  </div>
                ))}
                <div style={{background:"rgba(255,255,255,.05)",border:"1px solid "+C.bl,borderRadius:12,padding:"11px 13px"}}>
                  <div style={{fontSize:9,color:C.tm,marginBottom:7,fontWeight:700,textTransform:"uppercase",letterSpacing:2}}>Eigenen Zähler hinzufügen</div>
                  <div style={{display:"flex",gap:7}}>
                    <input value={newCtrName} onChange={e=>setNewCtrName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newCtrName.trim()){syncCustCtrs([...custCtrs,{id:Date.now(),n:newCtrName.trim(),v:0}]);setNewCtrName("");}}} placeholder="z.B. Softdrinks..." style={{flex:1,background:"rgba(255,255,255,.09)",border:"1px solid "+C.bo,borderRadius:9,padding:"8px 12px",color:C.tx,fontSize:12,fontFamily:"Nunito,sans-serif",outline:"none"}}/>
                    <button onClick={()=>{if(newCtrName.trim()){syncCustCtrs([...custCtrs,{id:Date.now(),n:newCtrName.trim(),v:0}]);setNewCtrName("");}}} style={{padding:"8px 14px",borderRadius:9,background:C.gd,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:12,fontFamily:"Nunito,sans-serif"}}>+</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── DIAGRAMM ── */}
        {tab==="fun" && funTab==="chart" && (
          <div>
            <div style={sT}>📊 Teilnahmen visualisiert</div>
            <p style={{fontSize:12,color:C.tm,marginBottom:14}}>Wer war wie oft dabei – 2019 bis 2025</p>
            <div style={sC}>
              {DADS.map(d => {
                const cnt = STATS0.filter(s=>(att[s.yr]||s).who?.[d]).length;
                const pct = Math.round(cnt/STATS0.length*100);
                const color = cnt>=6?G:cnt>=4?"#10B981":cnt>=2?"#60A5FA":"rgba(255,255,255,.3)";
                return (
                  <div key={d} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{minWidth:68,fontSize:12,fontWeight:600}}>{d}</div>
                    <div style={{flex:1,position:"relative"}}>
                      <div style={{height:22,background:"rgba(255,255,255,.08)",borderRadius:5,overflow:"hidden"}}>
                        <div style={{height:"100%",width:pct+"%",background:color,borderRadius:5,transition:"width .8s",display:"flex",alignItems:"center",paddingLeft:8}}>
                          {pct>25&&<span style={{fontSize:10,fontWeight:800,color:"#1E2D3E"}}>{cnt}x</span>}
                        </div>
                      </div>
                      {pct<=25&&<span style={{position:"absolute",left:"calc("+pct+"% + 6px)",top:"50%",transform:"translateY(-50%)",fontSize:10,fontWeight:700,color:color}}>{cnt}x</span>}
                    </div>
                    <div style={{minWidth:32,fontSize:10,color:C.tf,textAlign:"right"}}>{pct}%</div>
                  </div>
                );
              })}
            </div>
            <div style={sT}>🌦️ Wetterkarte der Jahre</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              {STATS0.map(s=>{
                const wx=s.wx;
                const emoji=wx.includes("Sonnig")||wx.includes("heiß")?"☀️":wx.includes("verregnet")||wx.includes("Regen")?"🌧️":wx.includes("Hitzesommer")?"🔥":wx.includes("Wechsel")?"⛅":"🌥️";
                const tot=Object.keys(s.who).length+(s.ex||[]).length;
                return(
                  <div key={s.yr} style={{background:C.bc,border:"1px solid "+C.bo,borderRadius:12,padding:"10px 12px",display:"flex",alignItems:"center",gap:8}}>
                    <div style={{fontSize:28}}>{emoji}</div>
                    <div>
                      <div style={{fontFamily:"Oswald,sans-serif",fontWeight:700,fontSize:16,color:G}}>{s.yr}</div>
                      <div style={{fontSize:10,color:C.tm,marginTop:1}}>{wx}</div>
                      <div style={{fontSize:9,color:C.tf,marginTop:1}}>{tot} Familien</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── FOTO-VOTE ── */}
        {tab==="fun" && funTab==="foto" && (
          <div>
            <div style={sT}>📸 Foto-Abstimmung</div>
            <p style={{fontSize:12,color:C.tm,marginBottom:14}}>Nach dem Camp: Jeder lädt sein Lieblingsfoto hoch, alle stimmen ab.</p>
            {Object.keys(fotoVotes).length===0 && (
              <div style={{textAlign:"center",padding:"28px 16px",background:C.bc,border:"1px solid "+C.bo,borderRadius:14,marginBottom:14}}>
                <div style={{fontSize:40,marginBottom:8}}>📷</div>
                <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>Noch keine Fotos</div>
                <div style={{fontSize:12,color:C.tm}}>Nach dem Camp können alle ihr Lieblingsfoto hochladen.</div>
              </div>
            )}
            {Object.entries(fotoVotes).sort((a,b)=>b[1].votes.length-a[1].votes.length).map(([id,foto])=>{
              const hasVoted=myFotoVote!==null;
              const isMyVote=myFotoVote===id;
              return(
                <div key={id} style={{background:isMyVote?"rgba(212,146,10,.14)":C.bc,border:"1px solid "+(isMyVote?G:C.bo),borderRadius:14,overflow:"hidden",marginBottom:12}}>
                  {foto.url&&<img src={foto.url} alt="" style={{width:"100%",maxHeight:200,objectFit:"cover",display:"block"}} onError={e=>e.target.style.display="none"}/>}
                  <div style={{padding:"10px 13px"}}>
                    {foto.caption&&<div style={{fontSize:12,fontStyle:"italic",color:C.tm,marginBottom:7}}>"{foto.caption}"</div>}
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{fontSize:11,color:C.tf}}>von {foto.submittedBy} · {foto.votes.length} Stimme{foto.votes.length!==1?"n":""}</div>
                      <button onClick={()=>{if(hasVoted)return;const up={...fotoVotes,[id]:{...foto,votes:[...foto.votes,"vote"]}};syncFotoVotes(up);syncMyFotoVote(id);}} style={{padding:"5px 14px",borderRadius:20,background:isMyVote?G:"rgba(212,146,10,.17)",border:"1px solid "+G,color:isMyVote?"#1E2D3E":G,fontWeight:800,cursor:hasVoted?"default":"pointer",fontSize:11,fontFamily:"Nunito,sans-serif",opacity:hasVoted&&!isMyVote?.5:1}}>
                        {isMyVote?"★ Mein Votum":"Abstimmen"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{...sC,background:"rgba(212,146,10,.08)",border:"1px solid rgba(212,146,10,.3)"}}>
              <div style={{fontWeight:800,fontSize:12,color:G,marginBottom:10}}>📤 Foto hinzufügen</div>
              <div style={{fontSize:11,color:C.tm,marginBottom:10}}>Bild-URL einfügen (iCloud, Google Photos, Dropbox etc.):</div>
              <input id="fotoUrl" placeholder="https://... (direkte Bild-URL)" style={{width:"100%",background:"rgba(255,255,255,.09)",border:"1px solid "+C.bo,borderRadius:9,padding:"8px 10px",color:C.tx,fontSize:12,fontFamily:"Nunito,sans-serif",outline:"none",boxSizing:"border-box",marginBottom:7}}/>
              <input value={newFotoCaption} onChange={e=>setNewFotoCaption(e.target.value)} placeholder="Bildunterschrift (optional)..." style={{width:"100%",background:"rgba(255,255,255,.09)",border:"1px solid "+C.bo,borderRadius:9,padding:"8px 10px",color:C.tx,fontSize:12,fontFamily:"Nunito,sans-serif",outline:"none",boxSizing:"border-box",marginBottom:7}}/>
              <div style={{display:"flex",gap:7}}>
                <select id="fotoWho" style={{flex:1,background:"rgba(255,255,255,.09)",border:"1px solid "+C.bo,borderRadius:9,padding:"8px 10px",color:C.tx,fontSize:12,fontFamily:"Nunito,sans-serif",outline:"none"}}>
                  {DADS.map(d=><option key={d} value={d}>{d}</option>)}
                </select>
                <button onClick={()=>{const url=document.getElementById("fotoUrl")?.value?.trim();const who=document.getElementById("fotoWho")?.value||"Unbekannt";if(!url)return;const id="f"+Date.now();syncFotoVotes({...fotoVotes,[id]:{url,caption:newFotoCaption.trim(),submittedBy:who,votes:[]}});setNewFotoCaption("");const el=document.getElementById("fotoUrl");if(el)el.value="";}} style={{padding:"8px 16px",borderRadius:9,background:C.gd,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:12,fontFamily:"Nunito,sans-serif"}}>Hochladen</button>
              </div>
            </div>
          </div>
        )}

        </div>

        {/* NAV */}
        <nav style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(28,43,58,.97)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,.18)",display:"flex",justifyContent:"space-around",padding:"7px 0 13px",zIndex:100}}>
          {TABS.map(t => {
            const a = tab===t.id;
            return (
              <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",color:a?G:"rgba(236,242,248,.35)",display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"3px 6px",fontFamily:"Nunito,sans-serif",fontSize:9,letterSpacing:1,textTransform:"uppercase",fontWeight:a?800:500,borderBottom:a?"2px solid "+G:"2px solid transparent"}}>
                <span style={{fontSize:22}}>{t.icon}</span>{t.label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
