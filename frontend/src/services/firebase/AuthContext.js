// import react, firebase
import React, { useContext, useEffect, useState } from 'react'
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from './firebase-config'

// create context
const AuthContext = React.createContext()

// functions for firebase
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // sign up
    function signup(email, password, name) {
        console.log('bruh')
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return db.collection('users').doc(userCredential.user.uid).set({
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
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        signin,
        signout,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

// export context
export function useAuth() {
    return useContext(AuthContext)
}