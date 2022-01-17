import Peer from 'peerjs';
import { useEffect, useState } from 'react';

// To get video and audio from browser
const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

const Control = () => {
  
  const [peer] = useState(new Peer(
    Math.random().toString(36).slice(2),
    {
      host: "marc0.jasoncoding.com",
      port: 9003,
      path: "/marc0webrtc",
      secure: false
    }
  ));
  
  // When done testing, 
  function callMarc1() {
    getUserMedia({video: true, audio: true}, (stream) => {
      const call = peer.call("", stream);
      // TODO: Get marc1's peer id somehow
      call.on("MARC1ID", (remoteStream) => {
        
      });
    }, (err) => {
      console.log("Error getting stream\n" + err);
    });
  }
  
  return ( 
    <div className="w-full h-full">
      <div className="max-w-5xl h-full w-4/5 m-auto text-center flex flex-col items-center justify-start divide-y">
        <div className="h-2/5 bg-blue-crayola w-full">bruh</div>
        <div className="flex flex-row space-x-2 mt-2">
          <input className="w-24 bg-gray-300 rounded-sm" type="text" id="fname" name="fname" /><br />
          <button className="bg-blue-crayola text-white px-2 py-1 rounded-sm" onClick={callMarc1}>Connect</button>
        </div>
      </div>
    </div>
    );
  }
    
export default Control;