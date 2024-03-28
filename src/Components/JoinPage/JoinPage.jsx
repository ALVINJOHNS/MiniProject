import React from 'react'
import './JoinPage.css'
import Image from './image 2.png'
import { IoVideocam } from "react-icons/io5";
import { TfiHelpAlt } from "react-icons/tfi";
import { FiSettings } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
function JoinPage() {
  return (
    <div className='join-page'>
        <div className="top-bar" >
            <IoVideocam className='video-call-icon'/>
            <h1 className="video-call-text">Video Calls and Meetings for everyone</h1>
            <div className='home-option-buttons'>
              <TfiHelpAlt className="help-circle"/>
              <FiSettings className="settings-icon" />
              <GoPerson className="profile-icon" />
            </div>

        </div>
        <div className='image-n-joinbox'>
            <img className="image" src={Image} alt="Icon" />
            
            <div className='join-box'>
              <input type="text"
               placeholder="Enter link or code"
               className='join-text-field'
              />
              <button className='join-button'>Join</button>
           
            </div>
        </div>
    </div>
  )
}

export default JoinPage
