import React, { useRef, useEffect, useState, Suspense } from "react";
import { useAtom } from "jotai";
import { profilesAtom } from "../atoms/ProfileAtom";
import axios from "axios";

const TestComp = () => {
  const [profiles, setProfiles] = useAtom(profilesAtom);

  const Dooo = () => {
    setProfiles((profiles) => [...profiles, { profile1: "test" }]);
  };

  return (
    <div>
      <button onClick={Dooo}>little</button>
    </div>
  );
};

export default TestComp;
