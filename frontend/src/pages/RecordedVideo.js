import { useState, useEffect } from "react";
import { useAuth } from '../services/firebase/AuthContext'
import { useParams } from "react-router-dom";

function RecordedVideo() {
    const {currentUser} = useAuth();
    const {videoId} = useParams();
    const [video, setVideo] = useState({});

    useEffect(() => {
        currentUser.getIdToken().then(token => {
            console.log(token);
            fetch(`http://marc0.jasoncoding.com/videos/video/${videoId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(async (data) => {
                console.log("Bruhhh")
                console.log(await data.text())
            });
        })
    }, [])

    console.log(videoId)

    return <div>
        a
    </div>
}

export default RecordedVideo;