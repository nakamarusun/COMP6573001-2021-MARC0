import { useEffect, useState } from "react";
import { useAuth } from '../services/firebase/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../services/firebase/firebase-config';

const NotesTable = () => {

    const { currentUser, currentUserUID } = useAuth()
    const [notesData, setNotesData] = useState([])
    const notesDataIsEmpty = notesData === ""

    async function getNotesData() {
        const docRef = doc(db, "UserNotes", currentUserUID)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setNotesData(docSnap.data())
        }
        else{
            console.log("No data found")
        }
    }

    useEffect(() =>[
        getNotesData()
    ], [])

    return (

        <table className="border-collapse w-3/4 rounded-md overflow-hidden shadow">
            <thead>
                <tr>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {!notesData ? notesData.map(row => <tr>
                    {
                        <>
                            <td>{row.content}</td>
                        </>
                    }
                </tr>) : null}
            </tbody>
        </table>
    );
}

export default NotesTable;