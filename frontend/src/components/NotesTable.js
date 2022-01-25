import { useEffect } from "react";
import { useAuth } from '../services/firebase/AuthContext';


const NotesTable = () => {

    const { currentUser } = useAuth()
    
    useEffect(() => {
        if (currentUser !== null) {
            const token = currentUser.getIdToken().then(token =>
                // To be replace with api.chess-webapp.com in deployment
                fetch('https://api.chess-webapp.com/user/history', {
                    method: 'GET',
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                })
                    .then(res => res.json())
                    .then(
                        // List from firebase is here, use it as you will
                        data => {
                            console.log(data)
                            console.log(data.history)  // data is an object that has the history property which
                            // contains array of objects
                            setHistoryData(data.history) //data.history array of objects
                        }
                    )
            );
        }
    })

    return (

        <table className="border-collapse w-3/4 rounded-md overflow-hidden shadow">
            <thead>
                <tr>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {!historyDataIsEmpty ? historyData.map(row => <tr>
                    {
                        <>
                            <td>{row.enemy}</td>
                            <td>{row.result}</td>
                            <td>{row.side}</td>
                        </>
                    }
                </tr>) : null}
            </tbody>
        </table>
    );
}

export default NotesTable;