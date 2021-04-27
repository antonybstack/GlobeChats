import React, { useContext, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, fetchUserAtom, isUserAuthenticated } from "../atoms/AuthAtom";
import { profilesAtom, fetchProfilesAtom } from "../atoms/ProfileAtom";
import { chatroomsAtom, fetchChatroomsAtom } from "../atoms/ChatroomAtom";
import { globalChatroomsAtom, fetchGlobalChatroomsAtom } from "../atoms/ChatroomAtom";
import { chatsAtom, fetchChatsAtom } from "../atoms/ChatAtom";
import Chatroom from "./Chatroom";
import FriendsList from "./FriendsList";
import ProfileButton from "./ProfileButton";
import CreateButtons from "./CreateButtons";
import Map from "./Map";
import UnauthenticatedMap from "./UnauthenticatedMap";
import ProfileContextTest from "./ProfileContextTest";
import ProfileAtomTest from "./ProfileAtomTest";
import { AuthContext } from "../contexts/AuthContext";
import ProfileProvider from "../contexts/ProfileContext";
import ChatroomProvider from "../contexts/ChatroomContext";
import ChatProvider from "../contexts/ChatContext";
import Profile from "./Profile";

const Home = () => {
  // const { user, isAuthenticated, authLoaded } = useContext(AuthContext);
  const friend = [
    { id: 1, name: "Roderick" },
    { id: 2, name: "Matt" },
    { id: 3, name: "Antony" },
    { id: 4, name: "Josh" },
    { id: 5, name: "Tony" },
    { id: 6, name: "Anna" },
  ];

  const [user] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isUserAuthenticated);
  const [, fetchUser] = useAtom(fetchUserAtom);
  const [profiles] = useAtom(profilesAtom);
  const [, fetchProfiles] = useAtom(fetchProfilesAtom);
  const [chatrooms] = useAtom(chatroomsAtom);
  const [, fetchChatrooms] = useAtom(fetchChatroomsAtom);
  const [globalChatrooms] = useAtom(globalChatroomsAtom);
  const [, fetchGlobalChatrooms] = useAtom(fetchGlobalChatroomsAtom);
  const [chats, setChats] = useAtom(chatsAtom);
  const [, fetchChats] = useAtom(fetchChatsAtom);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfiles();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchGlobalChatrooms();
    }
  }, [profiles]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchChatrooms();
    }
  }, [globalChatrooms]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchChats();
    }
  }, [chatrooms]);

  console.log(user);
  console.log(profiles);
  console.log(chatrooms);
  console.log(globalChatrooms);
  console.log(chats);

  return (
    <>
      {isAuthenticated ? (
        <div className="home">
          <ChatroomProvider>
            <ChatProvider>
              <ProfileButton />
              <Chatroom />
              <CreateButtons />
              <FriendsList friend={friend} />
              <Map />
            </ChatProvider>
          </ChatroomProvider>
        </div>
      ) : (
        <div className="home">
          <UnauthenticatedMap />
        </div>
      )}
    </>
    // <>
    //   <div id="homeTest">
    //     {/* <UnauthenticatedMap /> */}
    //     {/* <ProfileProvider>
    //         <ProfileContextTest />
    //       </ProfileProvider> */}
    //     <ProfileAtomTest />
    //   </div>
    // </>
  );
};

export default Home;
