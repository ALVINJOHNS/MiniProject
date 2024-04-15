// CameraComponent.jsx
import React, { useRef, useEffect } from 'react';
import './CameraComponent.css';

function CameraComponent({ stream, number }) {
  const videoRef = useRef(null);
  const CameraVideo = number === 1 ? "camera-video-full" : "camera-video-half";
  const CameraContainer = number === 1 ? "camera-container-full" : "camera-container-half";

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, [stream]);

  return (
    <div className={CameraContainer}>
      <video ref={videoRef} autoPlay playsInline className={CameraVideo} muted={true}/>
    </div>
  );
}

export default CameraComponent;
