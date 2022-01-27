import { useState, useEffect } from "react";
import { useAuth } from '../services/firebase/AuthContext'
import { useParams } from "react-router-dom";
import { host } from "../config";

function RecordedVideo() {
    const {currentUser} = useAuth();
    const {videoId} = useParams();
    const [video, setVideo] = useState(undefined);

    useEffect(() => {
        currentUser.getIdToken().then(token => {
            fetch(`${host}/videos/video/${videoId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(data => data.json()).then(data => {
                setVideo(data);
                console.log(data);
            });
        })
    }, [currentUser, videoId])

    return <div className="w-full flex flex-col items-center justify-center">
        {video
            ? <div className="max-w-4xl flex flex-col items-center space-y-2">
                <video src={video.url} controls>
                    <source src={video.url} type="video/mp4" />
                </video>
                <h2 className="text-lg font-bold">{video.name}</h2>
                <h3 className="text-sm text-gray-600">{new Date(video.date._seconds * 1000).toUTCString()}</h3>
            </div>
            : <h1>Video does not exist!</h1>
        }
    </div>
}

export default RecordedVideo;