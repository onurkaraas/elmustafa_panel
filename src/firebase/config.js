import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAxkfAAbip5rYZLju6SfeyXdkDixHZjBes',
  authDomain: 'elmustafatv-16d6a.firebaseapp.com',
  projectId: 'elmustafatv-16d6a',
  storageBucket: 'elmustafatv-16d6a.firebasestorage.app',
  messagingSenderId: '229346874418',
  appId: '1:229346874418:web:980c55cb4013bc0a08982b',
  measurementId: 'G-BZG3H9NB0M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
