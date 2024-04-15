// VideoTab.jsx
import React from 'react';
import './VideoTab.css';
import CameraComponent from './CameraComponent';

function VideoTab(props) {
  const videotab = props.number === 1 ? "video-tab-full" : "video-tab-half";

  return (
    <div  className={videotab}>
      
      {props.stream ? (
        <CameraComponent stream={props.stream} number={props.number} />
      ) : (
        <span className="no-video-text">No video</span>
      )}
    </div>
    
  );
}

export default VideoTab;
