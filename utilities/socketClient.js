// import { io } from "socket.io-client";
// console.log("[socketClient.js]");

// // const socketClient = io("http://localhost:5001");
// const socketClient = io("http://localhost:3000");

// export default socketClient;

// -----------------------------------------------------

import { io } from "socket.io-client";

const socketClient = io("http://localhost:5000");

export default socketClient;

export const logoutUserSocketUtil = (userId) => {
  socketClient.emit("logoutUser", userId);
};
