// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCHV4uavwMINYlxa2TxF9yXOeINyz71SPw",
  authDomain: "bokningssystem-779e1.firebaseapp.com",
  projectId: "bokningssystem-779e1",
  storageBucket: "bokningssystem-779e1.firebasestorage.app",
  messagingSenderId: "202116835227",
  appId: "1:202116835227:web:829ce713d1f63a3defa33e",
  measurementId: "G-F3RNF4V9Q8"
};

const app = initializeApp(firebaseConfig);

// export Firestore database
export const db = getFirestore(app);