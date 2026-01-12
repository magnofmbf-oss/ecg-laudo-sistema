import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Substituir com as configurações do seu projeto Firebase
// Acesse: https://console.firebase.google.com/
// 1. Crie um novo projeto
// 2. Vá em Project Settings > General
// 3. Em "Your apps", adicione um Web App
// 4. Copie as configurações abaixo

const firebaseConfig = {
  apiKey: "AIzaSyB8eFuWQho8c-niY6gjz0SgmbWjZnDABoQ",
  authDomain: "ecg-laudo-sistema.firebaseapp.com",
  projectId: "ecg-laudo-sistema",
  storageBucket: "ecg-laudo-sistema.firebasestorage.app",
  messagingSenderId: "1095849719744",
  appId: "1:1095849719744:web:1bdab76fda2cfa62cdfa25",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Serviços
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
