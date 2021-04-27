import React, { useRef, useEffect, useState, Suspense } from "react";
import axios from "axios";
import { atom } from "jotai";

export const profiles = atom([]);

export const profilesAtom = atom(
  async (get) => get(profiles),
  async (get, set, newProfiles) => {
    set(profiles, newProfiles);
    // you can set as many atoms as you want at the same time
  }
);

export const fetchProfilesAtom = atom(null, async (get, set) =>
  axios
    .get("/api/users/")
    .then(async (res) => {
      const temp = await res.data;
      console.log(res);
      set(profiles, temp.users);
      console.log(profiles);
    })
    .catch((err) => {
      console.log(err);
    })
);
