import axios from "axios";
import { atom } from "jotai";
import { user } from "../atoms/AuthAtom";

export const chatrooms = atom([]);
export const chatroomsLoadedAtom = atom(false);

export const chatroomsAtom = atom(
  async (get) => get(chatrooms),
  async (get, set, newChatrooms) => {
    set(chatrooms, newChatrooms);
  }
);

export const fetchChatroomsAtom = atom(null, async (get, set) => {
  set(chatrooms, []);
  let loggedInUser = get(user);
  var tempResult = [];
  if (loggedInUser.joinedChatroomIds) {
    loggedInUser.joinedChatroomIds.forEach(async (chatroomId) => {
      if (chatroomId) {
        await axios
          .get("/api/chatrooms/" + chatroomId)
          .then((res) => {
            let tempChatroom = res.data.chatroom;
            tempResult.push(tempChatroom);
          })
          .catch((err) => {
            console.log(err);
          });
        set(chatrooms, tempResult);
      }
    });
    set(chatroomsLoadedAtom, true);
  } else {
    set(chatrooms, []);
  }
});

export const globalChatrooms = atom([]);

export const globalChatroomsAtom = atom(
  async (get) => get(globalChatrooms),
  async (get, set, newChatrooms) => {
    set(globalChatrooms, newChatrooms);
  }
);

export const fetchGlobalChatroomsAtom = atom(null, async (get, set) => {
  set(globalChatrooms, []);
  await axios
    .get("/api/chatrooms/")
    .then((res) => {
      set(globalChatrooms, res.data.chatrooms);
    })
    .catch((err) => {
      console.log(err);
    });
});
