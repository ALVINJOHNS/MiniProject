import React from 'react'
import {useNavigate } from 'react-router-dom';
import './JoinP.css'
import Image from '../../assets/join_img.png'
import { IoVideocam } from "react-icons/io5";
import { TfiHelpAlt } from "react-icons/tfi";
import { FiSettings } from "react-icons/fi";
import { GoPerson } from "react-icons/go";

function JoinP() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
   navigate('/videoroom');
  };
  const handleCallClick = () => {
    navigate('/videoroom');
  };
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
        <div className='group-box'>
        <div className='join-box'>
              <input type="text"
               placeholder="Enter username"
               className='join-text-field'
              />
              <button className='join-button' onClick={handleJoinClick}>Join</button>
           
            </div>
        <div className='call-box'>
            <input
            type="text"
            placeholder="Enter username"
            className='join-text-field'
          />
          <button className='call-button' onClick={handleCallClick}>Call</button>
        </div>
          
          
          </div>    
            
        </div>
    </div>
  )
}

export default JoinP
