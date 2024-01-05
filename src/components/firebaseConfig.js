// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl1TOoo1B3vHDN_4JwHcH0IhcARxYUMyc",
  authDomain: "qaychi-az.firebaseapp.com",
  projectId: "qaychi-az",
  storageBucket: "qaychi-az.appspot.com",
  messagingSenderId: "538459113232",
  appId: "1:538459113232:web:aa1cde204b4a1cff6d8795",
  measurementId: "G-NLR851NHNK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
