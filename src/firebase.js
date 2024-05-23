// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAphDnVr7NPMChp9VKgpsINdrTr7yDEJ8A",
  authDomain: "nuzlocketracker-81c43.firebaseapp.com",
  projectId: "nuzlocketracker-81c43",
  storageBucket: "nuzlocketracker-81c43.appspot.com",
  messagingSenderId: "379321578248",
  appId: "1:379321578248:web:ff27515946dc2ed4e832bd",
  measurementId: "G-GQM8VZBR3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;