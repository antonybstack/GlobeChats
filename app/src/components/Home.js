import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom, fetchUserAtom, isUserAuthenticated, fetchSocketAtom, socketAtom, connectedUsersAtom } from "../atoms/AtomHelpers";
import Nav from "./Nav";
import DraggableChatroom from "./DraggableChatroom";
import FriendsList from "./FriendsList";
import Map from "./Map";
import UnauthenticatedMap from "./UnauthenticatedMap";
import { DraggableModalProvider } from "ant-design-draggable-modal";
import CreateChat from "./CreateChat";
import CreateEvent from "./CreateEvent";

const Home = () => {
  const [, fetchUser] = useAtom(fetchUserAtom);
  const [, fetchSocket] = useAtom(fetchSocketAtom);
  const [socket] = useAtom(socketAtom);
  const [connectedUsers, setConnectedUsers] = useAtom(connectedUsersAtom);
  const friend = [
    { id: 1, name: "Roderick" },
    { id: 2, name: "Matt" },
    { id: 3, name: "Antony" },
    { id: 4, name: "Josh" },
    { id: 5, name: "Tony" },
    { id: 6, name: "Anna" },
  ];
  // eslint-disable-next-line no-unused-vars
  const [user] = useAtom(userAtom); //keep this or it will bug Login component
  const [isAuthenticated] = useAtom(isUserAuthenticated);

  // check if logged in
  useEffect(() => {
    fetchUser();
    fetchSocket();
  }, []);

  // useEffect(() => {
  //   if (bothLoaded) {
  //     socket.on("authenticated user", (connections) => {
  //       setConnectedUsers(connections);
  //     });

  //     socket.on("logout user", (connections) => {
  //       setConnectedUsers(connections);
  //     });

  //     socket.on("disconnect", (connections) => {
  //       setConnectedUsers(connections);
  //     });
  //   }
  // }, [bothLoaded]);

  // useEffect(() => {
  //   if (socket.connected) {
  //     socket.emit("get connections");
  //     socket.on("get connections", (data) => {
  //       console.log(data);
  //       setConnectedUsers(data);
  //     });
  //   }
  // }, [user, socket]);

  // useEffect(() => {
  //   console.log(connectedUsers);
  // }, [connectedUsers, setConnectedUsers]);

  // useEffect(() => {
  //   if (isAuthenticated) socket.emit("authenticated user", user);

  //   // const authenticatedUser = {
  //   //   _id: _id,
  //   //   firstName: firstName,
  //   //   lastName: lastName,
  //   //   joinedChatroomIds: joinedChatroomIds,
  //   //   friendlist: friendlist,
  //   //   email: email,
  //   //   googleImg: googleImg,
  //   // };
  //   // // console.log(req.io);
  //   // req.io.emit("authenticated user", authenticatedUser);
  // }, [isAuthenticated, socket, user]);

  return (
    <>
      {isAuthenticated ? (
        <div className="home">
          <Nav />
          <Map />
          <CreateChat />
          <CreateEvent />
          <FriendsList />
          <DraggableModalProvider>
            <DraggableChatroom />
          </DraggableModalProvider>
        </div>
      ) : (
        <div className="home">
          <Nav />
          <UnauthenticatedMap />
        </div>
      )}
    </>
  );
};

export default Home;
