import { useAuth } from '../services/firebase/AuthContext';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase/firebase-config';
import { doc, getDoc } from "firebase/firestore";


const Username = () => {
    const { currentUser } = useAuth()
    const docRef = doc(db, "UserNotes", currentUser.uid)
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (currentUser !== null) {
            getDoc(docRef).then(docSnap => {
                return setUsername(docSnap.data().username)
            })
        }
    })
    return (  
        <p className='inline'>{username}</p>
    );
}
 
export default Username;