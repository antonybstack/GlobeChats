import React, { useRef, useEffect, useState, useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import { useAtom } from "jotai";
import { profilesAtom, fetchProfilesAtom } from "../atoms/ProfileAtom";

const ProfileContextTest = () => {
  //const { profiles } = useContext(ProfileContext);
  const [profiles] = useAtom(profilesAtom);
  var imgStyle = {
    borderRadius: "20px",
  };

  return (
    <div id="ProfileContextTest">
      <h1>ProfileContextTest</h1>
      {profiles
        ? profiles.map((profile, i) => {
            //const { userId, message, timestamp } = chat;
            const { firstName, lastName, googleImg } = profile;

            return (
              <div className="chatBlock">
                <div className="chatMessage">
                  <div className="chatProfile">
                    <span>
                      <img src={profile.googleImg} style={imgStyle} alt="profileIcon" width="25" />
                      &nbsp;
                    </span>
                    <span className="profileName">
                      {profile.firstName} {profile.lastName[0]}.
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default ProfileContextTest;
