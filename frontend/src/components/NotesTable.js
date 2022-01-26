import { useEffect, useState } from "react";
import { useAuth } from '../services/firebase/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../services/firebase/firebase-config';

const NotesTable = () => {

    const { currentUser, currentUserUID } = useAuth()
    const [notesData, setNotesData] = useState([])
    const notesDataIsEmpty = notesData === ""

    async function getNotesData() {
        const docRef = doc(db, "UserNotes2", currentUserUID)
        const docSnap = await getDoc(docRef)
        let tempNotesData = []
        if (docSnap.exists()) {
            for (const i in docSnap.data()){
                tempNotesData.push(docSnap.data()[i])
            }
            setNotesData(tempNotesData)
            console.log(notesData)
        }
        else{
            console.log("No data found")
            setNotesData(tempNotesData)
        }
    }

    useEffect(() => {
        getNotesData()
    }, [])

    return (
        <table className="notes-table border-collapse w-1/2 rounded-md overflow-hidden shadow">
            <thead>
                <tr>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {!notesDataIsEmpty ? notesData.map(row => <tr>
                    {
                        <>
                            <td>{row}</td>
                        </>
                    }
                </tr>) : null}
            </tbody>
        </table>
    );
}

export default NotesTable;