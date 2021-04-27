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
  let mychatrooms = get(chatrooms);
  console.log(mychatrooms);
  let tempResult = [];
  mychatrooms.forEach(async (mychatroom) => {
    console.log(mychatroom);
    if (mychatroom._id) {
      await axios
        .get("/api/chats/chatroom/" + mychatroom._id)
        .then((res) => {
          res.data.chats.forEach((chat) => {
            //tempResult.push(chat);
            let tempChats = get(chats);
            console.log(tempResult);
            console.log(chat);
            set(chats, tempChats.concat(chat));
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
