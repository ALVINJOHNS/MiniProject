import { io } from "socket.io-client";

export const meetId = Math.floor(Math.random() * 100000);
export const password = "x";

const socket = io.connect('https://192.168.1.20:8181/', {
  auth: { meetId, password }
});

export default socket;

export const socketForML = new WebSocket('ws://20.235.142.139/ws/hand_gesture/');