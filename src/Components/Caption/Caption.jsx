import React, { useState } from 'react'
import './Caption.css'
import socket, { socketForML } from '../../socket';

function Caption(props) {
    
  const [result , setResult] = useState(null);

    socketForML.onmessage = function (event) {
        const receivedData = event.data;
        socket.emit('caption', {user:props.name,message:receivedData})
        if (receivedData !== "None") {
            
            console.log('Received:', receivedData);
           // resultDiv.textContent = "Received letter: " + receivedData; // Update UI with the received letter
        } else {
          
            console.log('Received: None');
           // resultDiv.textContent = "Received letter: " + receivedData;  // Update UI to indicate no letter received
        }
    };

    socket.on('broadcastCaption', (caption) => {
        if (caption !== "None") {
            setResult(caption.user+': '+caption.message)
           console.log('Received:', caption.message, caption.user);
           // resultDiv.textContent = "Received letter: " + receivedData; // Update UI with the received letter
        } else {
            setResult(null)
           
           // resultDiv.textContent = "Received letter: " + receivedData;  // Update UI to indicate no letter received
        }
    });

  return (
    <div>
       {result && (
        <div className="result">
        {result}
        </div>
       )}
    </div>
  )
}

export default Caption
