import React, { useContext, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, fetchUserAtom, isUserAuthenticated } from "../atoms/AuthAtom";
import Chatroom from "./Chatroom";
import FriendsList from "./FriendsList";
import ProfileButton from "./ProfileButton";
import CreateButtons from "./CreateButtons";
import Map from "./Map";
import UnauthenticatedMap from "./UnauthenticatedMap";
// import ProfileContextTest from "./ProfileContextTest";
// import ProfileAtomTest from "./ProfileAtomTest";
// import { AuthContext } from "../contexts/AuthContext";
// import ProfileProvider from "../contexts/ProfileContext";
import ChatroomProvider from "../contexts/ChatroomContext";
import ChatProvider from "../contexts/ChatContext";
import Profile from "./Profile";
import axios from "axios";

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, queryCache } from "react-query";

const Home = () => {
  const queryClient = useQueryClient();
  const [, fetchUser] = useAtom(fetchUserAtom);
  // Access the client

  // Queries
  // const query = useQuery('todos', getProfiles);

  // Mutations
  // const mutation = useMutation(postTodo, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries("todos");
  //   },
  // });

  const friend = [
    { id: 1, name: "Roderick" },
    { id: 2, name: "Matt" },
    { id: 3, name: "Antony" },
    { id: 4, name: "Josh" },
    { id: 5, name: "Tony" },
    { id: 6, name: "Anna" },
  ];
  const [user] = useAtom(userAtom); //keep this or it will bug Login component
  const [isAuthenticated] = useAtom(isUserAuthenticated);

  // check if logged in
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div className="home">
          <ChatroomProvider>
            <ChatProvider>
              <Map />
              <CreateButtons />
              <FriendsList friend={friend} />
              <Chatroom />
            </ChatProvider>
          </ChatroomProvider>
        </div>
      ) : (
        <div className="home">
          <UnauthenticatedMap />
        </div>
      )}
    </>
  );
};

export default Home;
