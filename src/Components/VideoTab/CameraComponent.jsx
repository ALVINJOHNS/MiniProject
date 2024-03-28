import React, { useRef, useEffect } from 'react';
import './CameraComponent.css';
function CameraComponent  ({number}) {
  const videoRef = useRef(null);
  const CameraVideo = number===1? "camera-video-full":"camera-video-half"
  const CameraContainer = number===1? "camera-container-full":"camera-container-half"
  
  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };
  
    enableCamera();
  
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
  
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div className={CameraContainer}>
    
    <video ref={videoRef} autoPlay playsInline className={CameraVideo} />
  </div>
);
};

export default CameraComponent;
