import React, { useEffect, useState } from 'react'
import GridView from "../../Components/GridView/GridView";
import Message from "../../Components/Message/Message";
import './VideoRoom.css';
import { useLocation } from 'react-router-dom';
import {  io } from "socket.io-client";
import CameraComponent from '../../Components/VideoTab/CameraComponent';

function VideoRoom() {

  const location = useLocation();
  const name = location.state.name;
 
  console.log(name);

//sssssssssssssssssssssssssssssssssssssssssssss

const [offer1, setOffer] = useState(null);
const [remoteStreams, setRemoteStreams] = useState(null);
const [action, setAction] = useState('call');
let remoteStream; //a var to hold the remote video stream
let peerConnection; //the peerConnection that the two clients use to talk
let didIOffer = false;

const meetId = Math.floor(Math.random() * 100000)
const password = "x";

const socket = io.connect('https://192.168.1.24:8181/'
,{
  auth: {
    meetId,password
  }
}
)


const [videoStream, setVideoStream] = useState(null);
//const [audioStream, setAudioStream] = useState(null);
 //const [remoteStreams, setRemoteStreams] = useState([]);




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
            await peerConnection.setRemoteDescription(offerObj.offer)
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
    await peerConnection.setRemoteDescription(offerObj.answer)
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
  peerConnection.addIceCandidate(iceCandidate)
  console.log("======Added Ice Candidate======")
}


//eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee




 
  return (
   <div className="Main-Div" >
      <GridView name='alvin' number={2} videoStream={videoStream} remoteStream={videoStream} />
      <Message/>
      <button className='join-button' onClick={call}>call</button>
      <button className='join-button' onClick={answerOffer}>answer</button>
   <CameraComponent stream={remoteStreams} number={1}/> 
    </div>
  )
}

export default VideoRoom
