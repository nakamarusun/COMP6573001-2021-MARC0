import { useEffect, useState } from "react";
import { useAuth } from '../services/firebase/AuthContext'
import { useNavigate } from 'react-router-dom';
 
const Recordings = () => {
    const {currentUser} = useAuth();
    const [videos, setVideos] = useState({})
    const navigate = useNavigate();

    useEffect(() => {

        currentUser.getIdToken().then(token => {
            console.log(token);
            fetch("http://marc0.jasoncoding.com/videos/videos", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(async (data) => {
                console.log("Bruhhh")
                console.log(await data.text())
            });
        })
    }, [])

    const asfd = [5, 2];

    console.log(videos)

    return <div className="divide-y space-y-4">
        {asfd.map((x) => {
            return <div 
            className="flex flex-row items-center h-24 px-4 py-2 hover:bg-gray-200 active:bg-gray-400"
            onClick={() => {
                navigate("/recordings/hjufkkssadlfs");
            }}>
                <i class="fas fa-film text-5xl mr-4"></i>
                <div className="h-full flex flex-col justify-start space-y-2">
                    <h1 className="font-bold text-lg">VIDEO_NAME</h1>
                    <h2 className="text-sm text-gray-600">VIDEO_DATE</h2>
                </div>
            </div>
        })}
    </div>
}

export default Recordings;