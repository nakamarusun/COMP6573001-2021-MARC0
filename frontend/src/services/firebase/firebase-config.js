import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const app = initializeApp({
    apiKey: "AIzaSyBnUNHtlSgwuaEO6Yi4bUkbf3fB_fPdEFE",
    authDomain: "marc1robot.firebaseapp.com",
    projectId: "marc1robot",
    storageBucket: "marc1robot.appspot.com",
    messagingSenderId: "141568471620",
    appId: "1:141568471620:web:bdd9b3683690d2c45ac211",
})

export const auth = getAuth(app)
export const db = getFirestore()

export default app