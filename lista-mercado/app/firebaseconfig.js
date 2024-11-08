// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMoeQhhwA7Y1A7vrXC7yQGPsuKetAXgMk",
  authDomain: "lista-de-compras-99a21.firebaseapp.com",
  projectId: "lista-de-compras-99a21",
  storageBucket: "lista-de-compras-99a21.firebasestorage.app",
  messagingSenderId: "329581256332",
  appId: "1:329581256332:web:3a397fe7327d50451e25a9",
  measurementId: "G-29F8W4531J"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando o Firestore e Analytics
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
