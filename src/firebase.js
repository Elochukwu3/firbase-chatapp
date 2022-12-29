
import { initializeApp } from "firebase/app";
import { getAuth }  from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBgbkmo-Nnleb0fDLpE55lqbI5MSoTNYww",
    authDomain: "chat-application-20924.firebaseapp.com",
    projectId: "chat-application-20924",
    storageBucket: "chat-application-20924.appspot.com",
    messagingSenderId: "401749753962",
    appId: "1:401749753962:web:ff9b54c2ba75a59556ca13"
  };
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db =getFirestore();
