import axios from "axios";
import { atom } from "jotai";
import * as io from "socket.io-client";

// keeping track of what is loading globally for loading spinner
export const loading = atom(false);

// current user autheticated and logged in
export const user = atom({});
export const isUserAuthenticated = atom(false);

export const failedToAuthenticateAtom = atom(false);

export const userAtom = atom(
  async (get) => get(user),
  async (get, set, tempUser) => {
    set(user, tempUser);
  }
);
export const fetchUserAtom = atom(null, (get, set) => {
  set(user, {});
  set(isUserAuthenticated, false);
  axios
    .get("/api/users/authenticated")
    .then(async (res) => {
      const temp = await res.data;
      set(user, temp.user);
      set(isUserAuthenticated, temp.isAuthenticated);
      set(failedToAuthenticateAtom, false);
    })
    .catch((err) => {
      if (err.message.includes("401")) {
        set(failedToAuthenticateAtom, true);
      }
    });
});

// keeps track of current tab in chatroom window
export const currentTab = atom("");

// socket.io object
export const socket = atom([]);
export const socketAtom = atom(
  async (get) => get(socket),
  async (get, set, tempSocket) => {
    set(user, tempSocket);
  }
);
export const fetchSocketAtom = atom(null, async (get, set) => {
  var hostname = "http://localhost:5000";
  if (window.location.hostname.toString() !== "localhost") {
    hostname = window.location.hostname;
  }
  const tempSocket = await io.connect(hostname);
  set(socket, tempSocket);
});

export const connectedUsers = atom([]);
export const connectedUsersAtom = atom(
  async (get) => get(connectedUsers),
  async (get, set, tempConnectedUsers) => {
    set(connectedUsers, tempConnectedUsers);
  }
);
// export const fetchConnectedUsersAtom = atom(null, async (get, set) => {
//   socket.on("get connections", (data) => {
//     console.log(data);
//     set(connectedUsers, data);
//   });
// });

// keeps track of ToS page display
export const displayTosAtom = atom(false);

// keeps track of Privacy page display
export const displayPrivacyPolicyAtom = atom(false);

export const chats = atom([]);
export const chatsAtom = atom(
  async (get) => get(chats),
  async (get, set, tempChats) => {
    set(chats, tempChats);
  }
);
