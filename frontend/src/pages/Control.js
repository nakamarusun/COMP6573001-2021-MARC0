import Peer from 'peerjs';
import { useEffect, useState } from 'react';
import { useAuth } from '../services/firebase/AuthContext';
import { ButtonContainer } from '../components/ButtonContainer'


// To get video and audio from browser
const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

const Control = () => {

  const { currentUser } = useAuth()

  // TODO: Get marc1's peer id and token somehow
  const token = "mynamejeff";
  const marc1Id = "marcy-yes";

  const [peer] = useState(new Peer(
    Math.random().toString(36).slice(2),
    {
      host: "marc0.jasoncoding.com",
      port: 7003,
      path: `/peer/${token}_${marc1Id}/marc0webrtc`,
      secure: false,
    }
  ));

  // When done testing, 
  function callMarc1() {
    getUserMedia({ video: true, audio: true }, (stream) => {
      const call = peer.call(marc1Id, stream);
      call.on("stream", (remoteStream) => {

      });
    }, (err) => {
      console.log("Error getting stream\n" + err);
    });
  }

  async function handleUp(e) {
    e.preventDefault()
    if (currentUser !== null) {
      const token = currentUser.getIdToken().then(token =>
        fetch('http://marc0.jasoncoding.com/user/move', {
          method: 'POST',
          headers: {
            authorization: 'Bearer ' + token
          },
          body: {
            orientation: 'forward'
          }
        })
      );
    }
  }

  async function handleDown(e) {
    e.preventDefault()
    if (currentUser !== null) {
      const token = currentUser.getIdToken().then(token =>
        fetch('http://marc0.jasoncoding.com/user/move', {
          method: 'POST',
          headers: {
            authorization: 'Bearer ' + token
          },
          body: {
            orientation: 'back'
          }
        })
      );
    }
  }

  async function handleRight(e) {
    e.preventDefault()
    if (currentUser !== null) {
      const token = currentUser.getIdToken().then(token =>
        fetch('http://marc0.jasoncoding.com/user/move', {
          method: 'POST',
          headers: {
            authorization: 'Bearer ' + token
          },
          body: {
            orientation: 'right'
          }
        })
      );
    }
  }

  async function handleLeft(e) {
    e.preventDefault()
    if (currentUser !== null) {
      const token = currentUser.getIdToken().then(token =>
        fetch('http://marc0.jasoncoding.com/user/move', {
          method: 'POST',
          headers: {
            authorization: 'Bearer ' + token
          },
          body: {
            orientation: 'left'
          }
        })
      );
    }
  }

  return (
    <div className="w-full h-full min-h-screen ">
      <div className="max-w-5xl h-full w-4/5 m-auto text-center flex flex-col items-center justify-start">
        <div className="h-2/5 bg-blue-crayola w-full mt-4 ">bruh</div>
        <div className="md:flex md:flex-col ">
          <div className="flex flex-row space-x-2 mt-2 " >
            <input className="w-24 bg-gray-300 " type="text" id="fname" name="fname" /><br />
            <button className="bg-blue-crayola text-white px-2 py-1  " onClick={callMarc1}>Connect</button>
            <div><i class="fas fa-play-circle text-5xl"></i></div>
            <div><i class="fas fa-stop text-5xl"></i></div>
          </div>
          {/* up */}
          <div><i onClick={handleUp} class="fas fa-caret-square-up text-7xl lg pb-4 md:mt-2"></i></div>
          <div className="flex flex-row justify-center ">
            {/* left */}
            <div><i onClick={handleLeft} class="fas fa-caret-square-left text-7xl lg text-blue-800 "></i></div>
            {/* stop */}
            <div><i class="fas fa-stop-circle text-7xl lg text-red-600 px-4 pb-4 "></i></div>
            {/* right */}
            <div><i onClick={handleLeft} class="fas fa-caret-square-right text-7xl lg text-yellow-500"></i></div>
          </div>
          <div><i onClick={handleDown} class="fas fa-caret-square-down text-7xl text-pink-600"></i></div>
        </div>
      </div>
    </div>

  );
}

export default Control;