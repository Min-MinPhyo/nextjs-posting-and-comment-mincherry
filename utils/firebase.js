// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   
        apiKey: "AIzaSyCCQXCSaV9ND0gBZXh_bb9gFdF1-zr-JWc",
        authDomain: "creative-post-5267b.firebaseapp.com",
        projectId: "creative-post-5267b",
        storageBucket: "creative-post-5267b.appspot.com",
        messagingSenderId: "892569696397",
        appId: "1:892569696397:web:02ebf822145affbdcacac4"
     
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);