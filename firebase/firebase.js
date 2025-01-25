// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaMjQ0Y7d3zhEjX3VNOx4h4wnp1SWi1Ow",
  authDomain: "ndhimages-d6c0a.firebaseapp.com",
  projectId: "ndhimages-d6c0a",
  storageBucket: "ndhimages-d6c0a.firebasestorage.app",
  messagingSenderId: "63858347105",
  appId: "1:63858347105:web:c5a0a9cbe7c778786eee20",
  measurementId: "G-Z9LDRSJKEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);