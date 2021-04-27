import React, { useRef, useEffect, useState, Suspense } from "react";
import { Provider, atom, useAtom } from "jotai";
import { profilesAtom } from "../atoms/ProfileAtom";
import TestComp from "./TestComp";
import axios from "axios";

const ProfileAtomTest = () => {
  const [profiles, setProfiles] = useAtom(profilesAtom);
  console.log(profiles);
  // useEffect(() => {
  //   setProfiles((profiles) => [...profiles, {profile1:"test"}]);
  // },[])

  const Dooo = () => {
    console.log(profiles);
    setProfiles((profiles) => [...profiles, { profile1: "test" }]);
  };

  var imgStyle = {
    borderRadius: "20px",
  };

  return (
    <div id="ProfileAtomTest">
      <TestComp />
      <h1>ProfileAtomTest</h1>
      <button onClick={Dooo}>test</button>
      {profiles
        ? profiles.map((profile, i) => {
            //const { userId, message, timestamp } = chat;
            const { firstName, lastName, googleImg } = profile;
            if (firstName && lastName && googleImg) {
              return (
                <div className="chatBlock">
                  <div className="chatMessage">
                    <div className="chatProfile">
                      <span>
                        <img src={googleImg} style={imgStyle} alt="profileIcon" width="25" />
                        &nbsp;
                      </span>
                      <span className="profileName">
                        {firstName} {lastName[0]}.
                      </span>
                    </div>
                  </div>
                </div>
              );
            } else return null;
          })
        : null}
    </div>
  );
};

export default ProfileAtomTest;
