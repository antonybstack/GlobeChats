import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-tabs/style/react-tabs.css";
import { isUserAuthenticated } from "../atoms/AuthAtom";
import { useAtom } from "jotai";
import { useQuery } from "react-query";

function Chats(props) {
  const [isAuthenticated] = useAtom(isUserAuthenticated);
  const [filteredChats, setFilteredChats] = useState([]);

  const chatsQuery = useQuery(
    "chats",
    () => {
      console.log("chatsQuery");
      return axios
        .get("/api/chats/")
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
    },
    {
      // The query will not execute until exists
      enabled: !!isAuthenticated,
    }
  );

  const profilesQuery = useQuery(
    "profiles",
    () => {
      return axios
        .get("/api/users/")
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
    },
    {
      // The query will not execute until exists
      enabled: !!isAuthenticated,
    }
  );

  var imgStyle = {
    borderRadius: "20px",
  };

  const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };

  const findProfile = (id) => {
    var tempProfile = {
      user: "",
      message: "",
    };
    profilesQuery.data.users.forEach((profile) => {
      if (profile._id === id) {
        tempProfile = {
          firstName: profile.firstName,
          lastName: profile.lastName,
          googleImg: profile.googleImg,
        };
      }
    });
    return tempProfile;
  };

  useEffect(() => {
    console.log("effect");

    if (chatsQuery) {
      if (chatsQuery.data) {
        if (chatsQuery.data.chats) {
          const temp = chatsQuery.data.chats.filter((chat) => {
            return chat.chatroomId == props.chatroom_id;
          });
          setFilteredChats(temp);
        }
      }
    }
  }, [chatsQuery.data]);

  useEffect(() => {
    if (document.getElementById("chatMessages")) {
      var elem = document.getElementById("chatMessages");
      elem.scrollTop = elem.scrollHeight;
    }
  }, [filteredChats]);

  return (
    <>
      {chatsQuery.status === "loading" || profilesQuery.status === "loading" ? (
        <span>Loading chats...</span>
      ) : (
        filteredChats.map((chat, i) => {
          const { userId, message, timestamp } = chat;
          let profile = findProfile(userId);

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
                <div className="msgContainer">{message}</div>
              </div>
              <div className="chatTime">
                {new Date(timestamp).toLocaleTimeString("en-US")}&nbsp;&nbsp;
                {new Date(timestamp).toLocaleDateString("en-US", DATE_OPTIONS)}
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default Chats;
