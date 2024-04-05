import React from 'react'
import './Message.css';
import UserMessage from "../UserMessage/UserMessage"
import {  FaPaperPlane } from 'react-icons/fa';
function Message() {
  return (
    <div className="message-area">
      <div className="message-header">
          In-call messages
         
      </div>
      <div className="text-messages">
        <UserMessage username='User-1' message='Hellooo'/>
        <h4 className='user-name'>User-1</h4> <p className='user-message'>Heljjjgjgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggloooooooooooooooooooo</p>
        <h4>User-1</h4> <p>Hello</p>
        <h4>User-1</h4> <p>Hello</p>
        <h4>User-1</h4> <p>Hello</p>
        <h4>User-1</h4> <p>Hello</p>
        <h4>User-1</h4> <p>Hello</p>
        <h4>User1</h4> <p>Hello</p>
        <h4>User1</h4> <p>Hello</p>
        <h4>User1</h4> <p >Hello</p>
      </div>

      <div className="text-field">
        <input type="text" className="text-input" />
        <FaPaperPlane className='send-icon' onClick={console.log('hi.................')}></FaPaperPlane>
      </div>
    </div>
  );
}

export default Message
