
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAP4O7OutLsQA7rRsgacSvPz1V0IewAGmc",
    authDomain: "cleaner-community.firebaseapp.com",
    projectId: "cleaner-community",
    storageBucket: "cleaner-community.appspot.com",
    messagingSenderId: "706578173358",
    appId: "1:706578173358:web:444c91d81b347c800d0c3f",
    measurementId: "G-9S3K1EJYYX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };