// import { io } from "socket.io-client";
// console.log("[socketClient.js]");

// // const socketClient = io("http://localhost:5001");
// const socketClient = io("http://localhost:3000");

// export default socketClient;

// // -----------------------------------------------------

// import { io } from "socket.io-client";

// const socketClient = io("http://localhost:5000");

// export default socketClient;

// // functions
// export const createNewUserAccountSocketUtil = (userId, username) => {
//   socketClient.emit("createNewUserAccount", { userId, username });
// };

// export const logoutUserSocketUtil = (userId) => {
//   socketClient.emit("logoutUser", userId);
// };

// -----------------------------------------------------

import { io } from "socket.io-client";

let socketClient = null;

console.log("[socketClient.js] socketClient = ", socketClient);
// export default socketClient;

export const initializeSocketClient = () => {
  socketClient = io("http://localhost:5000");

  console.log(
    "[socketClient.js] initializeSocketClient() socketClient = ",
    socketClient
  );

  return socketClient;
};

export const getSocketClient = () => {
  if (socketClient) {
    return socketClient;
  }

  return null;
};

// functions
export const createNewUserAccountSocketUtil = (userId, username) => {
  socketClient.emit("createNewUserAccount", { userId, username });
};

export const logoutUserSocketUtil = (userId) => {
  socketClient?.emit("logoutUser", userId);
};
