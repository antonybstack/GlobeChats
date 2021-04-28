import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { AuthContext } from "../contexts/AuthContext";
import { userAtom, fetchUserAtom, isUserAuthenticated } from "../atoms/AuthAtom";
import { ProfileContext } from "../contexts/ProfileContext";
import { profilesAtom, fetchProfilesAtom } from "../atoms/ProfileAtom";
import { ChatroomContext } from "../contexts/ChatroomContext";
import { chatroomsAtom, fetchChatroomsAtom } from "../atoms/ChatroomAtom";
import { ChatContext } from "../contexts/ChatContext";
import { chatsAtom, fetchChatsAtom } from "../atoms/ChatAtom";
import moment from "moment-timezone";
import profileIcon from "../assets/5.png";
import { useAtom } from "jotai";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";

function Chats(props) {
  // const [newChatCounter, setNewChatCounter] = useState(0);
  const [isAuthenticated] = useAtom(isUserAuthenticated);

  const chatsQuery = useQuery(
    "chats",
    () => {
      return axios
        .get("/api/chats/")
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
    },
    {
      // The query will not execute until the userId exists
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
      // The query will not execute until the userId exists
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

  var filteredChats;
  if (chatsQuery.data) {
    filteredChats = chatsQuery.data.chats.filter((chat) => {
      return chat.chatroomId == props.chatroom_id;
    });
  }

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
