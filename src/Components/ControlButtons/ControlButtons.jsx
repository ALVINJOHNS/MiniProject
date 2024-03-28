import React from 'react'
import './ControlButtons.css'
import { IoVideocamOutline,IoMicOutline  } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";

function ControlButtons() {
  return (
    <div className='Control-Buttons'>
      <button   className='mic-button'><IoMicOutline className='mic-icon'> </IoMicOutline ></button>
      <button className='phone-button'><FiPhone className='phone-icon'></FiPhone></button>

      <button className='video-button'><IoVideocamOutline className='video-icon'> </IoVideocamOutline></button>
    </div>
  )
}

export default ControlButtons
