// VideoTab.jsx
import React from 'react';
import './VideoTab.css';
import CameraComponent from './CameraComponent';

function VideoTab({key, index, number, videoStream, remoteStream , handleRemoteStream}) {
  const videotab = number === 1 ? "video-tab-full" : "video-tab-half";

  return (
    <div key={index} className={videotab}>
      {index === 0 && videoStream ? (
        <CameraComponent stream={videoStream} number={number} />
      ) : (
        <CameraComponent stream={remoteStream} number={number} />
        
      )}
      {!videoStream && !remoteStream && <span className="no-video-text">No video</span>}
    </div>
    
  );
}

export default VideoTab;
