import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../services/firebase/AuthContext';
import { ButtonContainer } from '../components/ButtonContainer'
import videojs from "./Videos.js";

// To get video and audio from browser
const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

const Control = () => {

  const { currentUser } = useAuth()
  const [text, setText] = useState("");
  const vidRef = useRef(null);
  const playRef = useRef(null);

  // TODO: Get marc1's peer id and token somehow
  const token = "mynamejeff";
  const marc1Id = "marcy-yes";

  // Play video
  useEffect(() => {
    if (!playRef.current) {
      if (!vidRef.current) return;

      playRef.current = videojs(vidRef.current, {
        // autoplay: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: "//marc0.jasoncoding.com/live/marc1.m3u8",
          type: "application/vnd.apple.mpegurl"
        }]
      });
    }
  }, [vidRef]);

  // Dispose
  useEffect(() => {
    const player = playRef.current;
    return () => {
      if (player) {
        player.dispose();
        playRef.current = null;
      }
    };
  }, [playRef]);

  // playRef.play();
  
  // handle control to be implemented in a "unbad" way

  async function handleUp(e) {
    e.preventDefault()
    if (currentUser !== null) {
      const token = currentUser.getIdToken().then(token =>
        fetch('http://localhost:5000/marci/listen', {
          method: 'POST',
          headers: {
            authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orientation: 'forward'
          })
        })
      );
    }
  }

  async function handleDown(e) {
    e.preventDefault()
    if (currentUser !== null) {
      const token = currentUser.getIdToken().then(token =>
        fetch('http://localhost:5000/marci/move', {
          method: 'POST',
          headers: {
            authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orientation: 'back'
          })
        })
      );
    }
  }

  async function handleRight(e) {
    e.preventDefault()
    if (currentUser !== null) {
      const token = currentUser.getIdToken().then(token =>
        fetch('http://localhost:5000/marci/move', {
          method: 'POST',
          headers: {
            authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orientation: 'right'
          })
        })
      );
    }
  }

  async function handleLeft(e) {
    e.preventDefault()
    if (currentUser !== null) {
      const token = currentUser.getIdToken().then(token =>
        fetch('http://localhost:5000/marci/move', {
          method: 'POST',
          headers: {
            authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orientation: 'left'
          })
        })
      );
    }
  }

  return (
    <div className="w-full h-full min-h-screen ">
      <div className="max-w-5xl h-full w-4/5 m-auto text-center flex flex-col items-center justify-start">
        <video ref={vidRef} className="h-2/5 w-full" id="their-video" autoPlay></video>
        <div className="md:flex md:flex-col ">
          <div className="flex flex-row justify-center space-x-5 mt-2 " >
            {/* <input className="w-24 bg-gray-300 " type="text" id="fname" name="fname" value={text} onChange={(a) => {
              setText(a.target.value);
            }} /><br />
            <button className="bg-blue-crayola text-white px-2 py-1" onClick={callMarc1}>Connect</button> */}
            <div><i class="fas fa-play-circle md:text-6xl lg:text-4xl"></i></div>
            <div><i class="fas fa-stop md:text-6xl lg:text-4xl"></i></div>
          </div>
          {/*turnL /* up /* turn right*/ }
            <div className="flex felx-row justify-center">
              <div><i class="fas fa-angle-double-left text-green-500 md:text-8xl lg:text-7xl mt-2 mr-4 "></i></div>
          <div><i onClick={handleUp} class="fas fa-caret-square-up md:text-8xl lg:text-7xl pb-4 mt-2"></i></div>
          <div><i class="fas fa-angle-double-right text-orange-500 md:text-8xl lg:text-7xl mt-2 ml-4 "></i></div>

          </div>
          <div className="flex flex-row justify-center ">
            {/* left */}
            <div><i onClick={handleLeft} class="fas fa-caret-square-left text-blue-800 md:text-8xl lg:text-7xl "></i></div>
            {/* stop */}
            <div><i class="fas fa-stop-circle text-red-600 md:text-8xl lg:text-7xl px-4 pb-4  "></i></div>
            {/* right */}
            <div><i onClick={handleRight} class="fas fa-caret-square-right text-yellow-500 md:text-8xl lg:text-7xl "></i></div>
          </div>
          <div><i onClick={handleDown} class="fas fa-caret-square-down text-pink-600 md:text-8xl lg:text-7xl "></i></div>
        </div>
      </div>
    </div>

  );
}

export default Control;