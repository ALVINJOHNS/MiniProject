import React, { useEffect, useRef, useState } from 'react'
import GridView from "../../Components/GridView/GridView";
import Message from "../../Components/Message/Message";
import './VideoRoom.css';
import { useLocation } from 'react-router-dom';
import ControlButtons from '../../Components/ControlButtons/ControlButtons';
import socket, { meetId } from '../../socket';

const socket1 = new WebSocket('ws://localhost:8000/ws/stream/');
function VideoRoom() {

  const location = useLocation();
  const userName = location.state.name;


const [offer1, setOffer] = useState(null);
const [remoteStreams, setRemoteStreams] = useState(null);
const [action, setAction] = useState('call');
let remoteStream; //a var to hold the remote video stream
let peerConnection; //the peerConnection that the two clients use to talk
let didIOffer = false;


 console.log(meetId)

const [videoStream, setVideoStream] = useState(null);


let peerConfiguration = {
  iceServers:[
      {
          urls:[
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302'
          ]
      }
  ]
}

const call = async e=>{
 // await fetchUserMedia();
  //peerConnection is all set with our STUN servers sent over
  await createPeerConnection();

  //create offer time!
  try{
      console.log("Creating offer...")
      const offer = await peerConnection.createOffer();
      console.log(offer);
      peerConnection.setLocalDescription(offer);
      didIOffer = true;
      socket.emit('newOffer',offer); //send offer to signalingServer
  }catch(err){
      console.log(err)
  }

}

const answerOffer = async()=>{
 // await fetchUserMedia();
  await createPeerConnection(offer1);
  const answer = await peerConnection.createAnswer({}); //just to make the docs happy
  await peerConnection.setLocalDescription(answer); //this is CLIENT2, and CLIENT2 uses the answer as the localDesc
  console.log(offer1)
  console.log(answer)
  // console.log(peerConnection.signalingState) //should be have-local-pranswer because CLIENT2 has set its local desc to it's answer (but it won't be)
  //add the answer to the offerObj so the server knows which offer this is related to
  offer1.answer = answer 
  //emit the answer to the signaling server, so it can emit to CLIENT1
  //expect a response from the server with the already existing ICE candidates
  const offerIceCandidates = await socket.emitWithAck('newAnswer',offer1)
  offerIceCandidates.forEach(c=>{
      peerConnection.addIceCandidate(c);
      console.log("======Added Ice Candidate======")
  })
  console.log(offerIceCandidates)
}

const fetchUserMedia = async ()=> {
  try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

         if (mediaStream) {
            console.log("media",mediaStream);
           await setVideoStream(mediaStream);
           //await setAudioStream(mediaStream);
          }

        
    
          
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
  }


  const createPeerConnection = (offerObj)=>{
    return new Promise(async(resolve, reject)=>{
        //RTCPeerConnection is the thing that creates the connection
        //we can pass a config object, and that config object can contain stun servers
        //which will fetch us ICE candidates
        peerConnection = await new RTCPeerConnection(peerConfiguration)
        remoteStream = new MediaStream()
        //setRemoteStreams([...remoteStreams, remoteStream])
        setRemoteStreams(remoteStream)
       
        if(videoStream){ 
          console.log('videoo',videoStream)
            videoStream.getTracks().forEach(track=>{peerConnection.addTrack(track,videoStream)})
            
        }
       
  
        peerConnection.addEventListener("signalingstatechange", (event) => {
            console.log(event);
            console.log(peerConnection.signalingState);
            
        });
 
     
        peerConnection.addEventListener('icecandidate',e=>{
          console.log('........Ice candidate found!......')
          console.log(e)
          if(e.candidate){
              socket.emit('sendIceCandidateToSignalingServer',{
                  iceCandidate: e.candidate,
                  iceUserName: meetId,
                  didIOffer,
              })    
          }
      })
      
        peerConnection.addEventListener('track',e=>{
            console.log("Got a track from the other peer!! How excting")
            console.log(e)
            e.streams[0].getTracks().forEach(track=>{
              remoteStream.addTrack(track,remoteStream);
              setRemoteStreams(remoteStream)
                 
                console.log( "Here's an exciting moment... fingers cross")
            })
        })
  
        if(offerObj){
            //this won't be set when called from call();
            //will be set when we call from answerOffer()
            // console.log(peerConnection.signalingState) //should be stable because no setDesc has been run yet
            try{
              await peerConnection.setRemoteDescription(offerObj.offer)
            }
            catch(err){
              console.log(err)
            }
            // console.log(peerConnection.signalingState) //should be have-remote-offer, because client2 has setRemoteDesc on the offer
        }
        resolve();
    })
  }
  
  

  // socket.on('availableOffers',offers=>{
  //   console.log('newOfferAwaiting',offers)
  //   offers.forEach(offerObj=>{
  //     setOffer(offerObj)
  //   })
  //   setAction('answer')
  //   // if (didIOffer===false && action === 'answer'){
  //   //   answerOffer();
  //   // }
  // })
  
  socket.on('newOfferAwaiting',offers=>{
    console.log('newOfferAwaiting',offers)
    offers.forEach(offerObj=>{
      setOffer(offerObj)
    })
   // setAction('answer')
    // if (didIOffer===false && action === 'answer'){
    //   answerOffer();
    // }
  }
  )
  
  socket.on('answerResponse',offerObj=>{
    console.log(offerObj)
    addAnswer(offerObj)
  })
  const addAnswer = async(offerObj)=>{
    //addAnswer is called in socketListeners when an answerResponse is emitted.
    //at this point, the offer and answer have been exchanged!
    //now CLIENT1 needs to set the remote
    try{
      await peerConnection.setRemoteDescription(offerObj.answer)
    }
    catch(err){
      console.log(err)
    }
    // console.log(peerConnection.signalingState)
  }


  useEffect(() =>{
  fetchUserMedia();
  if (action === 'call'){
    console.log('call')
  }
  else{
    console.log('answer')
  }
 

}, []);


socket.on('receivedIceCandidateFromServer',iceCandidate=>{
  addNewIceCandidate(iceCandidate)
  console.log(iceCandidate)
})

const addNewIceCandidate = iceCandidate=>{
  try{
    peerConnection.addIceCandidate(iceCandidate)
  }
  catch(err){
    console.log(err)
  }
  console.log("======Added Ice Candidate======")
}



const videoButtonFunc = () => {
  console.log('videoButtonFunc')
  if (videoStream) {
    videoStream.getTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
  }
}

//sssssssssssssssssssssssssssssssssssssssssssssss

// const videoRef = useRef(null);
// useEffect(() => {
//   if (videoStream && videoRef.current) {
//     videoRef.current.srcObject = videoStream;
//   }

//   return () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();

//       tracks.forEach((track) => {
//         track.stop();
//       });
//     }
//   };
// }, [videoStream]);


// function sendFrame() {
  
//   const video = document.getElementById('video');
//   const canvas = document.createElement('canvas');
//   if (videoStream && canvas) { 
//     console.log('Sending frame');
//     // Set the canvas size to match the video stream dimensions
//     canvas.width = videoStream.getVideoTracks()[0].getSettings().width;
//     canvas.height = videoStream.getVideoTracks()[0].getSettings().height;
//     const context = canvas.getContext('2d');
//     // Draw the video frame onto the canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imageData = canvas.toDataURL('image/jpeg', 0.5); 
   
//     socket1.send(dataURLtoBlob(imageData));
// }}

// function dataURLtoBlob(dataURL) {
//   const arr = dataURL.split(',');
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//   }
//   return u8arr.buffer;
// }
// sendFrame()
// socket.onmessage = function(event) {
//   const data = JSON.parse(event.data);
//   if (data.prediction) {
//     console.log('Predicted sign:', data.prediction);
//     //  predictionDiv.innerHTML = 'Predicted sign: ' + data.prediction;
//   }
// };

// setInterval(() => {
//   sendFrame();
// }, 1000 / 30);

//11111111111111
// useEffect(() => {
  

//   const drawVideoOnCanvas = () => {
//     const canvas = document.getElementById('canvas');
//     if (videoStream && canvas) {
//       // Set the canvas size to match the video stream dimensions
//       canvas.width = videoStream.getVideoTracks()[0].getSettings().width;
//       canvas.height = videoStream.getVideoTracks()[0].getSettings().height;
//       const context = canvas.getContext('2d');
//       // Draw the video frame onto the canvas
//       context.drawImage(videoStream.current, 0, 0, canvas.width, canvas.height);
//       const imageData = canvas.toDataURL('image/jpeg', 0.5); 
//       // Schedule the next frame
      
//     }
//   };

//   // Start drawing video frames on the canvas when the video stream is available
//   if (videoStream) {
//     drawVideoOnCanvas();
//   }
// }, [videoStream]);


//eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee


  return (
   <div className="Main-Div" >
    <div className='grid-n-buttons'>
        <GridView name='alvin' number={2} videoStream={videoStream} remoteStream={remoteStreams} />
      <div className='call-n-answer'>
        <button className='call-button' onClick={call}>call</button>
        <button className='answer-button' onClick={answerOffer}>answer</button>
      </div> 
      <ControlButtons videoButtonFunc={videoButtonFunc}/>
      {/* <video id='video' ref={videoRef} autoPlay playsInline  muted={true}/> */}
    </div>
      <Message userName={userName}/>
    </div>
  )
}

export default VideoRoom
