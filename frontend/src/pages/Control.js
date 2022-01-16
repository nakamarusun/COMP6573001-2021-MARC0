import Peer from 'peerjs';
import { useEffect, useState } from 'react';

// To get video and audio from browser
const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

const Control = () => {

    const [peer, setPeer] = useState(new Peer(
        Math.random().toString(36).slice(2),
        {
            host: "marc0.jasoncoding.com",
            port: 9003,
            path: "/marc0webrtc",
            secure: false
        }
    ));

    useEffect(() => {        
        getUserMedia({video: true, audio: true}, (stream) => {
            const call = peer.call("", stream);
            call.on("stream", (remoteStream) => {

            });
        }, (err) => {
            console.log("Error getting stream\n" + err);
        });
    })

    return ( 
        <div className="w-full h-full">
            <div className="max-w-5xl h-2/5 w-4/5 m-auto text-center flex flex-col items-center justify-center divide-y">
                <div className="bg-blue-crayola w-full h-full">bruh</div>
                <input type="text" id="fname" name="fname" /><br />
                <input type="submit" value="Submit" />
            </div>
        </div>
    );
}

export default Control;