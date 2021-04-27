import axios from "axios";
import { atom } from "jotai";

export const profiles = atom([]);

export const profilesAtom = atom(
  async (get) => get(profiles),
  async (get, set, newProfiles) => {
    set(profiles, newProfiles);
  }
);

export const fetchProfilesAtom = atom(null, async (get, set) => {
  set(profiles, []);
  axios
    .get("/api/users/")
    .then(async (res) => {
      const temp = await res.data;
      set(profiles, temp.users);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
});
