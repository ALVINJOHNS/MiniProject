import { io } from "socket.io-client";

export const meetId = Math.floor(Math.random() * 100000);
export const password = "x";

const socket = io.connect('https://192.168.1.24:8181/', {
  auth: { meetId, password }
});

export default socket;


// import { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// const useSocket = () => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const meetId = Math.floor(Math.random() * 100000);
//     const password = 'x';

//     const newSocket = io.connect('https://192.168.1.24:8181/', {
//       auth: {
//         meetId,
//         password,
//       },
//     });

//     setSocket(newSocket);

//     return () => newSocket.close();
//   }, []);

//   return socket;
// };

// export default useSocket;
