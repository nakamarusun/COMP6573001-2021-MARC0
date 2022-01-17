import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc} from 'firebase/firestore';

const AuthContext = createContext()

// functions for firebase
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [isPaired, setIsPaired] = useState(false)

    // sign up
    function signup(email, password, name) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setDoc(doc(db, "UserNotes", userCredential.user.uid), {
                    username: name
                })
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
            });
    }

    // sign in
    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // sign out
    function signout() {
        return signOut(auth)
    }

    // reset password
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    // to do after render
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            console.log(user)
            setCurrentUser(user)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const value = {
        currentUser,
        signup,
        signin,
        signout,
        resetPassword,
        isPaired,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}