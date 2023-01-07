import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBgHxg8ZrAApV-rPlJ2m5e8Phrpcamd4AU",
  authDomain: "stressboard-d17fb.firebaseapp.com",
  projectId: "stressboard-d17fb",
  storageBucket: "stressboard-d17fb.appspot.com",
  messagingSenderId: "1056873554170",
  appId: "1:1056873554170:web:41295613c15ad786756943",
  measurementId: "G-TZYLY0P6V9"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

