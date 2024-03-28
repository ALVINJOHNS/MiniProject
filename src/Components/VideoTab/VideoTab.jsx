import React from 'react'
import './VideoTab.css'
import CameraComponent from './CameraComponent'

function VideoTab({index,number}) {
  const videotab = number===1 ?  "video-tab-full":"video-tab-half" ;
  return ( 
    <div key={index} className={videotab}>
      {/* <CameraComponent number={number}></CameraComponent> */}
    </div>
  )
}

export default VideoTab

