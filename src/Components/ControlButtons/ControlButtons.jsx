
import React, { useState } from 'react';
// import VideoOnIcon from './VideoOnIcon';
// import VideoOffIcon from './VideoOffIcon';
import './ControlButtons.css';
import { IoVideocamOutline, IoVideocamOffOutline, IoMicOutline, IoMicOffOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";


function ControlButtons({callButtonFunc,videoButtonFunc}) {
  const [isVideoOn, setVideoOn] = useState(true);
  const[isMicOn, setMicOn] = useState(true)
  const [isCall, setisCall]=useState(false) 

  const toggleVideo = () => {
    videoButtonFunc();
    setVideoOn(prevState => !prevState);
  };
  const toggleMic = () => {
    
    setMicOn(prevState => !prevState);
  };
  // const toggleCall = () => { console.log(isCall)
    
  //   setisCall(!isCall)
  // }
  const toggleCall = () => {
    callButtonFunc();
    setisCall(prevIsCall => !prevIsCall);
  };
  
  return (
    <div className='Control-Buttons'>
      <button className='mic-button' onClick={toggleMic}>{isMicOn ?<IoMicOutline className='mic-icon'></IoMicOutline> : < IoMicOffOutline className='mic-icon'></IoMicOffOutline>}
    </button>
      <button className='phone-button' onClick={toggleCall} style={{ backgroundColor: isCall? 'red':'green'   }} key={isCall} ><FiPhone className='phone-icon' style={{  backgroundColor: isCall? 'red':'green'   }}></FiPhone></button>
      <button className='video-button' onClick={toggleVideo} >
        {isVideoOn ? <IoVideocamOutline className='video-icon' ></IoVideocamOutline> : <IoVideocamOffOutline className='video-icon'></IoVideocamOffOutline>}
      </button>
    </div>
  );
}

export default ControlButtons;

