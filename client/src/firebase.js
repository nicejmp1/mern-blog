// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-419cc.firebaseapp.com",
    projectId: "mern-blog-419cc",
    storageBucket: "mern-blog-419cc.appspot.com",
    messagingSenderId: "110085570212",
    appId: "1:110085570212:web:b9815ede262861d831b031"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);