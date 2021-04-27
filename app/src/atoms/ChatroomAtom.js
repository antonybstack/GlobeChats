import axios from "axios";
import { atom } from "jotai";
import { user } from "../atoms/AuthAtom";

export const chatrooms = atom([]);

export const chatroomsAtom = atom(
  async (get) => get(chatrooms),
  async (get, set, newChatrooms) => {
    set(chatrooms, newChatrooms);
  }
);

export const fetchChatroomsAtom = atom(null, async (get, set) => {
  set(chatrooms, []);
  let loggedInUser = get(user);
  if (loggedInUser.joinedChatroomIds) {
    loggedInUser.joinedChatroomIds.forEach(async (chatroomId) => {
      if (chatroomId) {
        await axios
          .get("/api/chatrooms/" + chatroomId)
          .then((res) => {
            let tempArr = get(chatrooms);
            let tempChatroom = res.data.chatroom;
            if (tempArr[0] == null) set(chatrooms, [tempChatroom]);
            else set(chatrooms, tempArr.concat(tempChatroom));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  } else {
    set(chatrooms, [null]);
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
