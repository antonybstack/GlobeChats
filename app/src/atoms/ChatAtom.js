import axios from "axios";
import { atom } from "jotai";
import { chatrooms } from "./ChatroomAtom";

export const chats = atom([]);

export const chatsAtom = atom(
  async (get) => get(chats),
  async (get, set, newProfiles) => {
    set(chats, newProfiles);
  }
);

export const fetchChatsAtom = atom(null, async (get, set) => {
  set(chats, []);
  let mychatrooms = get(chatrooms);
  if (mychatrooms[0]) {
    mychatrooms.forEach(async (mychatroom) => {
      if (mychatroom._id) {
        await axios
          .get("/api/chats/chatroom/" + mychatroom._id)
          .then((res) => {
            res.data.chats.forEach((chat) => {
              let tempChats = get(chats);
              if (tempChats[0] == null) set(chats, [chat]);
              else set(chats, tempChats.concat(chat));
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  } else {
    set(chats, [null]);
  }
});
