import React from 'react'
import './UserMessage.css';
function UserMessage(props) {

  
return (
    // <div className="my-message">
    //   {/* <h4>{props.username}</h4> */}
    //   <h4 className='user-name'>{props.username}</h4> <p className='user-message'>{props.message}</p>
    // </div>
   <div className={`my-message ${props.isSender ? 'sender' : 'admin'}`}>
  {/* { props.isSender ? <h4 className='user-name'>You</h4> : null} */}
  { props.isSender ?<h5 className='user-name'>{props.username}</h5>: null}
  <p className='user-message'>{props.message}</p>
  </div>
  
    

      
      
  
  );
}

export default UserMessage
