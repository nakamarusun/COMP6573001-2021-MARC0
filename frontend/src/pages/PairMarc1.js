import { Link, Navigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../services/firebase/AuthContext';
import { db } from '../services/firebase/firebase-config';
import { doc, getDoc } from "firebase/firestore"; 


const PairMarc1 = () => {

    const { currentUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')

    useEffect(() => {
        if(currentUser !== null){
            getDoc(doc(db, "UserNotes", currentUser.uid).then(doc => {
                return setUsername(doc.data().username)
            }))
        }
    })

    return ( 
        <div className="w-full mt-20">
            <p>Hey {username}!&#9995;</p>
        </div>
    );
}
 
export default PairMarc1;