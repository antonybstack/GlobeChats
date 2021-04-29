import React, { useEffect, useState } from "react";
import Friend from "./Friend";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated } from "../atoms/AuthAtom";
import axios from "axios";

const FriendsList = () => {
  // const { user, isAuthenticated } = useContext(AuthContext);
  const [user] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isUserAuthenticated);
  const [friendList, setFriendList] = useState([""]);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .post("/api/friends/friends-list", { googleId: user.googleId })
        .then((res) => {
          setFriendList(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isAuthenticated, user]);

  return (
    <div className="friends-list-container">
      <div className="friends-list-header">Friends</div>
      {friendList ? (
        <>
          <Friend googleId={friendList[0].googleId} />
        </>
      ) : null}
    </div>
  );
};

export default FriendsList;
