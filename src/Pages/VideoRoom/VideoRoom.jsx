

import GridView from "../../Components/GridView/GridView";
import Message from "../../Components/Message/Message";
import './VideoRoom.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import {  io } from "socket.io-client";

function VideoRoom() {

  //sssssssssssssssssssssssssssssssssssssssssss
  const location = useLocation();
  const name = location.state.name;
 // const peerConnection = location.state.peerConnection;
  // const videoStream = location.state.videoStream;
  console.log(name);






useEffect(() => {
//   // Access user's media devices
//   const enableMedia = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });


//       if (mediaStream) {
//         setVideoStream(mediaStream);
//          setAudioStream(mediaStream);
//       }
//     } catch (error) {
//       console.error('Error accessing camera:', error);
//     }
//   };

//   enableMedia();
  
 }, []);


  //eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

 
  return (
   <div className="Main-Div" >
      <GridView />
      <Message/>
    </div>
  )
}

export default VideoRoom
