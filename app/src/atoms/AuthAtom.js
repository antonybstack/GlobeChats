import axios from "axios";
import { atom } from "jotai";

export const user = atom({});
export const isUserAuthenticated = atom(false);

export const userAtom = atom(
  async (get) => get(user),
  async (get, set, tempUser) => {
    set(user, tempUser);
  }
);

export const fetchUserAtom = atom(null, async (get, set) => {
  set(user, {});
  set(isUserAuthenticated, false);
  axios
    .get("/api/users/authenticated")
    .then(async (res) => {
      const temp = await res.data;
      set(user, temp.user);
      set(isUserAuthenticated, temp.isAuthenticated);
    })
    .catch((err) => {
      console.log(err);
    });
});
