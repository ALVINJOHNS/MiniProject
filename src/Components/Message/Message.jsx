import React from 'react'
import './Message.css';
import { BiSolidSend  } from "react-icons/bi";
import UserMessage from "../UserMessage/UserMessage"
import { useState } from 'react';
// import {  FaPaperPlane } from 'react-icons/fa';
function Message() {
  let message;
  const [messages,setMessages]=useState([])
  // const [message, setMessage] = useState('');

  // const messages = [
  //   { username: 'Alice', message: 'Hello!', flagged: true },
  //   { username: 'Bob', message: 'How are you guys jbj j j jb j j jh jh hb hbkbj  j ?', flagged: false },
  //   { username: 'Charlie', message: 'I am fine', flagged: true },
    
  //   { username: 'Alice', message: 'Fine ,thank you', flagged: true },
    

  //   // Add more messages as needed
  // ];
  const handleSendMessage =() =>{
    if (!message.trim()) {
      return;
    }
    // setMessages(prevMessages => [
    //   ...prevMessages,
    //   { username: 'Alvin', message: message, isSender: false },
    //   { username: 'Aparna', message: message, isSender: true }
    // ]);
    // setMessages([...messages,{username:'Alvin',message:message,isSender:false}])
    // setMessages([...messages,{username:'Aparna',message:message,isSender:true}])
    // console.log(message)
    // message=''
    
    //   // Assuming you have different messages for sender and admin
     
    setMessages(prevMessages => [
      ...prevMessages,
      { username: 'Alvin', message: message, isSender: false },
       { username: 'Aparna', message: message, isSender: true }
     ]);
    console.log(message);
    // setMessages('');
    
  };
  return (
    <div className="message-area">
      <div className="message-header">
          In-call messages
         
      </div>
      <div className="text-messages">
      {messages.map((message, index) => (
        <UserMessage      
          key={index}
          username={message.username}
          message={message.message}
          isSender={message.isSender}
        />
      ))}
        {/* <UserMessage username='Alvin' message='How r u?' isSender={true}/>
        <UserMessage username='Aparna' message='I am fine' isSender={false} />
        <UserMessage username='Alvin' message='What is ur name?' isSender={true}/>
        <UserMessage username='Aparna' message='Aparna' isSender={false} /> */}
        
      </div>

      <div className="text-field">
        <input type="text" className="text-input"  onChange={
         (e)=>{
          message = e.target.value
        } 
        }/>
        <BiSolidSend className='send-icon' onClick={() => handleSendMessage()} />
        {/* {<Io className='send-icon' onClick={console.log('hi.................')} */}
      </div>
    </div>
  );
}

export default Message;
