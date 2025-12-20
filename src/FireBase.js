import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "API",
  authDomain: "ai-oyunu-odev.firebaseapp.com",
  projectId: "ai-oyunu-odev",
  storageBucket: "ai-oyunu-odev.appspot.com",
  messagingSenderId: "05959",
  appId: "1:05959:web:abcdef"
};


const app = initializeApp(firebaseConfig);

export const veritabani = getFirestore(app);