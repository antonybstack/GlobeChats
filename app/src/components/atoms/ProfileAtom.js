import React, { useRef, useEffect, useState, Suspense } from "react";
import { Provider, atom, useAtom } from 'jotai'
import axios from "axios";

//purpose of this context is to hold the information of an individual user that is logged in on the website

// export const ProfileContext = createContext();


export const profiles = atom([]);
// export const profilesAtom = atom(async (get) => 
// async (get, set, newProfiles) => {
//   set(newProfiles)
//   // you can set as many atoms as you want at the same time
// }
// )




export const profilesAtom = atom(
  async (get) => (get(profiles)),
  (get, set, profile) => {
    set(profiles, profile);
  }
);

  // const [, setProfiles ] = useAtom(profilesAtom)

  //   const response = await fetch("/api/users/")
  //   const test = await response.json()
  //   setProfiles(test);




// export default ({ children }) => {
//   const [profiles, setProfiles] = useState(null);
//   const [profilesLoaded, setProfileLoaded] = useState(false);

// const postData = atom(async (get) => {
//   const id = get(postId)
//   const response = await fetch(
//     `localhost:5000/api/users/`
//   )
//   return response.json()
// })
  

  // useEffect(() => {
  //   setProfiles([]);
  //   const getProfiles = async () => {
  //     await axios
  //       .get("/api/users/")
  //       .then((res) => {
  //         console.log(res.data.users);
  //         res.data.users.forEach((user) => {
  //           const { _id, googleId, email, firstName, lastName, googleImg } = user;
  //           if (user) setProfiles((currentProfiles) => [...currentProfiles, { _id, googleId, email, firstName, lastName, googleImg }]);
  //         });
  //         //setProfiles(res.data.users);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setProfiles([]);
  //       });
  //   };

  //   const load = async () => {
  //     await getProfiles();
  //     setProfileLoaded(true);
  //   };

  //   load();
  // }, []);

//   return <ProfileContext.Provider value={{ profiles }}>{children}</ProfileContext.Provider>;
// };
