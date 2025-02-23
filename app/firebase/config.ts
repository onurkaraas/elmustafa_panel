import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAxkfAAbip5rYZLju6SfeyXdkDixHZjBes",
  authDomain: "elmustafatv-16d6a.firebaseapp.com",
  projectId: "elmustafatv-16d6a",
  storageBucket: "elmustafatv-16d6a.appspot.com",
  messagingSenderId: "229346874418",
  appId: "1:229346874418:web:980c55cb4013bc0a08982b",
  measurementId: "G-BZG3H9NB0M",
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// Initialize Firebase services
const auth = getAuth(app)
const db = getFirestore(app)

// Export the services
export { app, auth, db }

