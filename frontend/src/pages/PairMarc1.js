import { Link, Navigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../services/firebase/AuthContext';
import { db } from '../services/firebase/firebase-config';
import { doc, getDoc } from "firebase/firestore";
import { robot } from '../services/export/exportAssets'
import { useNavigate } from 'react-router'



const PairMarc1 = () => {

    const { currentUser } = useAuth()
    const uuidRef = useRef()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
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

    function pairMarci(){

    }


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await pairMarci()
            alert('Paired Successfully')
            setError('')
            navigate("/mainmenu")
        }
        catch {
            setError('Failed to pair with your M')
        }
        setLoading(false)
    }

    return (
        <div className="w-full mt-20 text-center">
            <div className='w-3/4 flex flex-col items-center justify-center m-auto'>
                <p className='text-lg'>Hey {username}!&#9995;</p>
                <img className='mt-12' src={robot} alt='robot'></img>
                <h2 className='font-bold text-2xl my-6'>Pair your M4rc1!</h2>
                <form onSubmit={handleSubmit}>
                    <input className="w-3/4 shadow-sm p-2 ring-1 ring-gray-200 rounded" type="password" ref={uuidRef} placeholder="M4rc1 UUID" required />
                    {error && <div className="mt-3">{error}</div>}
                    <button disabled={loading} className='w-3/4 bg-blue-crayola text-cultured p-2 rounded-md mt-6' type='submit' value="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default PairMarc1;