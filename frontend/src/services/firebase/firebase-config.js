// import firebase services
import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"

// firebase configuration
const app = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}) 

// make instance for auth, database
export const auth = app.auth()
export const db = app.firestore()

// export app
export default app