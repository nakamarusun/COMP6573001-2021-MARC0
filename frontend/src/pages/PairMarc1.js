import { Link, Navigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../services/firebase/AuthContext';
import { db } from '../services/firebase/firebase-config';
import { doc, getDoc } from "firebase/firestore";


const PairMarc1 = () => {

    const { currentUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const docRef = doc(db, "UserNotes", currentUser.uid)
    // const docSnap = async () => await getDoc(docRef)

    useEffect(() => {
        if (currentUser !== null) {
            // console.log(getDoc(doc(db, "UserNotes", currentUser.uid)).data().username)
            getDoc(docRef).then(docSnap => {
                return setUsername(docSnap.data().username)
            })

        }
    })

    return (
        <div className="w-full mt-20 text-center">
            <div className='w-3/4 flex flex-col items-center justify-center m-auto'>
                <p className='text-lg'>Hey {username}!&#9995;</p>
            </div>
        </div>
    );
}

export default PairMarc1;