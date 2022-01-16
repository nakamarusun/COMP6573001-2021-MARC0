import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail ,onAuthStateChanged } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// firebase configuration
const app = initializeApp({
    apiKey: "AIzaSyBnUNHtlSgwuaEO6Yi4bUkbf3fB_fPdEFE",
    authDomain: "marc1robot.firebaseapp.com",
    projectId: "marc1robot",
    storageBucket: "marc1robot.appspot.com",
    messagingSenderId: "141568471620",
    appId: "1:141568471620:web:bdd9b3683690d2c45ac211",
})

// make instance for auth, database
export const auth = getAuth(app)
export const db = getFirestore(app)
export { createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged };

// export app
export default app