import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
// NOTA: Estos son valores de ejemplo. Debes reemplazarlos con tu configuración real de Firebase
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "sweet-creations-app.firebaseapp.com",
  projectId: "sweet-creations-app",
  storageBucket: "sweet-creations-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

export default app;
