import { useEffect, useState } from "react";
import { useAuth } from '../services/firebase/AuthContext'
import { useNavigate } from 'react-router-dom';
import { host } from "../config";
 
const Recordings = () => {
    const {currentUser} = useAuth();
    const [videos, setVideos] = useState({})
    const navigate = useNavigate();

    useEffect(() => {

        currentUser.getIdToken().then(token => {
            fetch(`${host}/videos/videos`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(data => data.json()).then((data) => {
                setVideos(data);
            });
        })
    }, [currentUser])

    return <div className="divide-y space-y-4">
        {Object.keys(videos).map((k, i) => {
            console.log(`/mainmenu/recordings/${k}`);
            return <div 
            className="flex flex-row items-center h-24 px-4 py-2 hover:bg-gray-200 active:bg-gray-400 cursor-pointer"
            key={i}
            onClick={() => {
                navigate(`/mainmenu/recordings/${k}`);
            }}>
                <i className="fas fa-film text-5xl mr-4"></i>
                <div className="h-full flex flex-col justify-start space-y-2">
                    <h1 className="font-bold text-lg">{videos[k].name}</h1>
                    <h2 className="text-sm text-gray-600">{new Date(videos[k].date._seconds * 1000).toUTCString()}</h2>
                </div>
            </div>
        })}
    </div>
}

export default Recordings;