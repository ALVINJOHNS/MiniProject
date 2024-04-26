//  import React from 'react'
 
//  import './ControlButtons.css'
//  import { IoVideocamOutline,IoMicOutline,} from "react-icons/io5";
//  import { FiPhone } from "react-icons/fi";

//  function ControlButtons(props) {
//    return (
//      <div className='Control-Buttons'>
//        <button   className='mic-button' ><IoMicOutline className='mic-icon'> </IoMicOutline ></button>
//        <button className='phone-button'><FiPhone className='phone-icon'></FiPhone></button>

//        {<button className='video-button' onClick={props.videoButtonFunc}><IoVideocamOutline className='video-icon'> </IoVideocamOutline></button> }
       
//      </div>
//    )
//  }

//  export default ControlButtons

import React, { useState } from 'react';
// import VideoOnIcon from './VideoOnIcon';
// import VideoOffIcon from './VideoOffIcon';
import './ControlButtons.css';
import { IoVideocamOutline, IoVideocamOffOutline, IoMicOutline, IoMicOffOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";


function ControlButtons({videoButtonFunc}) {
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
    setisCall(prevIsCall => !prevIsCall);
  };
  
  return (
    <div className='Control-Buttons'>
      <button className='mic-button' onClick={toggleMic}>{isMicOn ?<IoMicOutline className='mic-icon'></IoMicOutline> : < IoMicOffOutline className='mic-icon'></IoMicOffOutline>}
    </button>
      <button className='phone-button' onClick={toggleCall} style={{ backgroundColor: isCall? 'green' : 'red' }} key={isCall} ><FiPhone className='phone-icon' style={{  backgroundColor: isCall? 'green' : 'red'  }}></FiPhone></button>
      <button className='video-button' onClick={toggleVideo} >
        {isVideoOn ? <IoVideocamOutline className='video-icon' ></IoVideocamOutline> : <IoVideocamOffOutline className='video-icon'></IoVideocamOffOutline>}
      </button>
    </div>
  );
}

export default ControlButtons;

