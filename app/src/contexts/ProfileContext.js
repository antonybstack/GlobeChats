/* eslint-disable import/no-anonymous-default-export */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//purpose of this context is to hold the information of an individual user that is logged in on the website

export const ProfileContext = createContext();

export default ({ children }) => {
  const [profiles, setProfiles] = useState(null);
  const [profilesLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    setProfiles([]);
    const getProfiles = async () => {
      await axios
        .get("/api/users/")
        .then((res) => {
          console.log(res.data.users);
          res.data.users.forEach((user) => {
            const { _id, googleId, email, firstName, lastName, googleImg } = user;
            if (user) setProfiles((currentProfiles) => [...currentProfiles, { _id, googleId, email, firstName, lastName, googleImg }]);
          });
          //setProfiles(res.data.users);
        })
        .catch((err) => {
          console.log(err);
          setProfiles([]);
        });
    };

    const load = async () => {
      await getProfiles();
      setProfileLoaded(true);
    };

    load();
  }, []);

  return <ProfileContext.Provider value={{ profiles }}>{children}</ProfileContext.Provider>;
};
