// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIAvJfchTi_tVwLL1VOoUuc_tPd-XC3tI",
  authDomain: "netflixgpt-93cff.firebaseapp.com",
  projectId: "netflixgpt-93cff",
  storageBucket: "netflixgpt-93cff.appspot.com",
  messagingSenderId: "217760982228",
  appId: "1:217760982228:web:e8627ad1fe45a426e1c741",
  measurementId: "G-9XLNTMX7KC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

export {
    app,
    analytics,
    auth
}