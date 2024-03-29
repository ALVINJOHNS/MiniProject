import React from 'react'
import GridView from "../../Components/GridView/GridView";
import Message from "../../Components/Message/Message";
import './VideoRoom.css';

function VideoRoom() {
  return (
   <div className="Main-Div" >
      <GridView/>
      <Message />
    </div>
  )
}

export default VideoRoom
