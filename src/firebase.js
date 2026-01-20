
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBSfjfT0hDHfn_dPH4IFFZcKGqgnY82_M",
  authDomain: "healthcare-c98ce.firebaseapp.com",
  projectId: "healthcare-c98ce",
  storageBucket: "healthcare-c98ce.firebasestorage.app",
  messagingSenderId: "397970345869",
  appId: "1:397970345869:web:1a76cb8d648cf6733e77c4"
};

const   App = initializeApp(firebaseConfig);
export const db = getFirestore(App);
