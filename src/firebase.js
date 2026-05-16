import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD9c-sZ_rq1S3hE4_LmULfhKJWgE9kiZT8",
  authDomain: "daddycamp-f6eb6.firebaseapp.com",
  databaseURL: "https://daddycamp-f6eb6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "daddycamp-f6eb6",
  storageBucket: "daddycamp-f6eb6.firebasestorage.app",
  messagingSenderId: "257270196595",
  appId: "1:257270196595:web:95034c97906a25e6f83d06"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set };
