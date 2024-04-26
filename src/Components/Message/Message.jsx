import React, { useRef } from 'react'
import './Message.css';
import { BiSolidSend  } from "react-icons/bi";
import UserMessage from "../UserMessage/UserMessage"
import { useState } from 'react';
import { useEffect } from 'react';
import socket from '../../socket';
// import {  FaPaperPlane } from 'react-icons/fa';
function Message(props) {
  const [message, setMessage] = useState('');
  const [messages,setMessages]=useState([])
  // const [message, setMessage] = useState('');

  // const messages = [
  //   { username: 'Alice', message: 'Hello!', flagged: true },
  //   { username: 'Bob', message: 'How are you guys jbj j j jb j j jh jh hb hbkbj  j ?', flagged: false },
  //   { username: 'Charlie', message: 'I am fine', flagged: true },
    
  //   { username: 'Alice', message: 'Fine ,thank you', flagged: true },
    

  //   // Add more messages as needed
  // ];
  const handleSendMessage = () =>{
    if (message.trim() !== '') {
    setMessages(prevMessages => [
      ...prevMessages,
      //{ username: props.userName, message: message, isSender: false },
       { senderName: props.userName, message: message }
     ]);
     //console.log(messages);
    socket.emit('newMessage', { senderName: props.userName, message: message });
    setMessage('');
    };
  }
  socket.on('broadcastMessage', (incomemessage) => {
   // console.log(incomemessage);
    console.log("list",messages[messages.length-1])
    console.log("income",incomemessage)
   // if(messages[messages.length-1]!==incomemessage){
      
   
setMessages(prevMessages => {
  if (prevMessages[prevMessages.length - 1] !== incomemessage) {
    return [...prevMessages, incomemessage];
  } else {
    return prevMessages;
  }
});

    //}
    // console.log(messages)
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-area">
      <div className="message-header">
          In-call messages
         
      </div>
      <div className="text-messages">
      {messages.map((message, index) => (
        <UserMessage      
          key={index}
          username={props.userName}
          senderName={message.senderName}
          message={message.message}
        />
      ))} 
      <div ref={messagesEndRef} />
      </div>

      <div className="text-field">
        <input type="text"
         className="text-input"
         value={message}
          onChange={
            (e)=>{
            setMessage(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <BiSolidSend className='send-icon' onClick={() => handleSendMessage()} />
        {/* {<Io className='send-icon' onClick={console.log('hi.................')} */}
      </div>
    </div>
  );
}

export default Message;
