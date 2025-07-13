// src/lib/firebase.ts

// Importe as funções necessárias do SDK do Firebase
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
// Se você habilitou o Analytics no Firebase, importe também:
// import { getAnalytics, Analytics } from "firebase/analytics";
// VITE_FIREBASE_API_KEY="AIzaSyBpjNAwAuVPMYjIgC7uBifN2nKLzIMVGOY"
//VITE_FIREBASE_AUTH_DOMAIN="apt-defense-universe-backend.firebaseapp.com"
//VITE_FIREBASE_PROJECT_ID="apt-defense-universe-backend"
//VITE_FIREBASE_STORAGE_BUCKET="apt-defense-universe-backend.firebasestorage.app"
//VITE_FIREBASE_MESSAGING_SENDER_ID="642762321834"
//VITE_FIREBASE_APP_ID="1:642762321834:web:b698a4fe34bfe5c68fc5d3"
//VITE_FIREBASE_MEASUREMENT_ID="G-S456FJSF1J" # Opcional, se você usa Analytics

//# Outras Chaves API
//VITE_VIRUSTOTAL_API_KEY="7a0cf4bdcebb42cc6d653c7de542d43ab967ee8fd6512bb212170b23ec150023"
//VITE_ABUSEIPDB_API_KEY="187cbcf831cfe2faf518946f851e7ffd3711648d8af1a14518813f567ede3d5dd383ea9600e339eb"
//VITE_SHODAN_API_KEY="SoMbiTj2cfzfKlEfbZs7KKhrY7hqmm6K"

/**
 * Configuração do seu aplicativo Firebase.
 * As credenciais são carregadas de variáveis de ambiente do Vite.
 * Certifique-se de que seu arquivo .env na raiz do projeto contenha
 * as chaves com o prefixo VITE_FIREBASE_.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  // measurementId é opcional e só é necessário se você habilitou o Google Analytics
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined,
};

// Inicializa o aplicativo Firebase com a configuração fornecida.
const app: FirebaseApp = initializeApp(firebaseConfig);

// Obtém a instância do serviço de Autenticação do Firebase.
const auth: Auth = getAuth(app);

// Obtém a instância do serviço Cloud Firestore.
const db: Firestore = getFirestore(app);

// Se você habilitou o Analytics, inicialize-o também:
// const analytics: Analytics = getAnalytics(app);

// Exporta as instâncias dos serviços para que possam ser usadas em outras partes do seu aplicativo.
export { app, auth, db };
// Se você habilitou o Analytics, exporte-o também:
// export { app, auth, db, analytics };