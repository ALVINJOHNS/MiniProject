import {useNavigate } from 'react-router-dom';
import './JoinPage.css'
import Image from '../../assets/join_img.png'
import { IoVideocam } from "react-icons/io5";
import { TfiHelpAlt } from "react-icons/tfi";
import { FiSettings } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { useEffect, useState } from 'react';
import {  io } from "socket.io-client";
import CameraComponent from '../../Components/VideoTab/CameraComponent';

function JoinPage() {

  //sssssssssssssssssssssssssssssssss
  
  //eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

  // const [page,setPage] = useState('white')
  // document.body.style.backgroundColor = page;
  
const navigate = useNavigate();
const [userName, setUserName] = useState('');


  const handleJoinClick = () => {
  
    navigate('/videoroom', { state: {name: userName, action:'call'} });
  };
  
  return (  
    <div className='join-page' >
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
               placeholder="Enter UserName"
               className='join-text-field'
               onChange={
                (e) => setUserName(e.target.value)
              }
              />
              <button className='join-button' onClick={handleJoinClick}>Join</button>
           
            </div>
            {/* <button className='join-button' onClick={call}>call</button>
            <button className='join-button' onClick={answerOffer}>answer</button> 
          <CameraComponent stream={videoStream} number={1}/>
          <CameraComponent stream={remoteStreams} number={1}/> */}
        </div>
    </div>
  )
}

export default JoinPage
