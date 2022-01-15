// import react, firebase
import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from './firebase-config'

// create context
const AuthContext = React.createContext()

// export context
export function useAuth() {
    return useContext(AuthContext)
}

// functions for firebase
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // sign up
    function signup(email, password, name) {
        return auth.createUserWithEmailAndPassword(email, password).then(cred => {
            return db.collection('users').doc(cred.user.uid).set({
                username: name
            })
        })
    }

    // sign in
    function signin(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    // sign out
    function signout() {
        return auth.signOut()
    }

    // reset password
    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    // to do after render
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])
 
    // set constants
    const value = {
        currentUser,
        signup,
        signin,
        signout,
        resetPassword
    }

    // to put in App.js html, import to all children
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}