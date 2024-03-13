import React from 'react'
import './Message.css';
import {  FaPaperPlane } from 'react-icons/fa';
function Message() {
  return (
    <div className="message-area">
      <div className="text-field">
        <input type="text" className="text-input" />
        <button className="send-button"><FaPaperPlane /></button>
      </div>
    </div>
  );
}

export default Message
