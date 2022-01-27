import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../services/firebase/AuthContext';
import { ButtonContainer } from '../components/ButtonContainer'
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { host } from '../config';

// To get video and audio from browser
const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

const Control = () => {

  const { currentUser } = useAuth()
  const [text, setText] = useState("");
  const [streamToken, setStreamToken] = useState(""); // TODO: Wait until get
  const vidRef = useRef(null);
  const playRef = useRef(null);

  useEffect(() => {
    // Start stream on marc1
    if (currentUser !== null) {
      currentUser.getIdToken().then(token =>
        fetch(`${host}/api/stream`, {
          method: 'GET',
          headers: {
            authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }).then((x) => x.text()).then((data) => {
          setStreamToken(data);
        })
      );
    }
  });

  // Play video
  useEffect(() => {
    if (!playRef.current) {
      if (!vidRef.current) return;

      playRef.current = videojs(vidRef.current, {
        autoplay: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: "//marc0.jasoncoding.com/live/marc1.m3u8",
          type: "application/vnd.apple.mpegurl"
        }]
      });
      playRef.current.play();
    }
  }, [vidRef, streamToken]);

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

  async function handleUp(e) {
    e.preventDefault()
    if (currentUser !== null) {
      const token = currentUser.getIdToken().then(token =>
        fetch(`${host}/marci/listen`, {
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
        fetch(`${host}/marci/move`, {
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
        fetch(`${host}/marci/move`, {
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
        fetch(`${host}/marci/move`, {
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

  async function handleListen(e) {
    e.preventDefault()
    if (currentUser !== null) {
      const token = currentUser.getIdToken().then(token =>
        fetch(`${host}/marci/listen`, {
          method: 'POST',
          headers: {
            authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
        })
      );
    }
  }

  return (
    <div className="w-full h-full min-h-screen ">
      <div className="max-w-5xl h-full w-4/5 m-auto text-center flex flex-col items-center justify-start">
        <div data-vjs-player>
          <video ref={vidRef} className="video-js vjs-big-play-centered" />
        </div>
        <div className="md:flex md:flex-col ">
          <div className="flex flex-row justify-center items-center space-x-5 mt-2 " >
            <div onClick={() => {
              alert("Recording started!")
              // fetch(`${host}/stream/control/record/start?app=marc1live&name=${streamToken}&rec=reccam`)
              //   .then(() => {alert("Recording started!")})
            }}><i class="fas fa-play-circle text-4xl md:text-6xl lg:text-4xl"></i></div>
            <div onclick={() => {
              alert("Recording stopped!")
              // fetch(`${host}/stream/control/record/stop?app=marc1live&name=${streamToken}&rec=reccam`)
              //   .then(() => {alert("Recording stopped!")})
            }}><i class="fas fa-stop text-4xl md:text-6xl lg:text-4xl"></i></div>
            <div onClick={handleListen} className='bg-black rounded-lg text-white p-2 text-sm'>Listen</div>

          </div>
          {/*turnL /* up /* turn right*/}
          <div className="flex felx-row justify-center">
            <div><i class="fas fa-angle-double-left text-6xl  text-green-500 md:text-8xl lg:text-7xl mt-2 mr-4 "></i></div>
            <div><i onClick={handleUp} class="fas fa-caret-square-up text-6xl md:text-8xl lg:text-7xl pb-4 mt-2"></i></div>
            <div><i class="fas fa-angle-double-right text-6xl  text-orange-500 md:text-8xl lg:text-7xl mt-2 ml-4 "></i></div>

          </div>
          <div className="flex flex-row justify-center ">
            {/* left */}
            <div><i onClick={handleLeft} class="fas fa-caret-square-left text-6xl  text-blue-800 md:text-8xl lg:text-7xl "></i></div>
            {/* stop */}
            <div><i class="fas fa-stop-circle  text-6xl text-red-600 md:text-8xl lg:text-7xl px-4 pb-4  "></i></div>
            {/* right */}
            <div><i onClick={handleRight} class="fas fa-caret-square-right text-6xl text-yellow-500 md:text-8xl lg:text-7xl "></i></div>
          </div>
          <div><i onClick={handleDown} class="fas fa-caret-square-down text-6xl text-pink-600 md:text-8xl lg:text-7xl "></i></div>
        </div>
      </div>
    </div>

  );
}

export default Control;