// ============================================================
// CONFIGURAÇÃO DO FIREBASE — preencha com os dados do SEU projeto
// ============================================================
// Como conseguir esses valores: veja o arquivo CONFIGURAR-FIREBASE.md
// na raiz do site, passo a passo (leva uns 5 minutinhos, é grátis).
//
// Esses valores (apiKey, projectId etc.) NÃO são secretos — o Firebase
// foi feito para que esse arquivo fique público no site. Quem protege
// os dados de verdade são as "regras de segurança" do Firestore, que
// também estão explicadas no CONFIGURAR-FIREBASE.md.
// ============================================================

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOWOn-5tCo5ROinV7qTNIQoI4FDt0Ulz4",
  authDomain: "amarelo-cac48.firebaseapp.com",
  projectId: "amarelo-cac48",
  storageBucket: "amarelo-cac48.firebasestorage.app",
  messagingSenderId: "188593354295",
  appId: "1:188593354295:web:4124310a8e0a68a7d8f1b2",
  measurementId: "G-70L1MPYHTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);