import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom, fetchUserAtom, isUserAuthenticated, fetchSocketAtom, socketAtom, connectedUsersAtom, displayTosAtom, displayPrivacyPolicyAtom } from "../atoms/AtomHelpers";
import Nav from "./Nav";
import DraggableChatroom from "./DraggableChatroom";
import FriendsList from "./FriendsList";
import Map from "./Map";
import UnauthenticatedMap from "./UnauthenticatedMap";
import { DraggableModalProvider } from "ant-design-draggable-modal";
import CreateChat from "./CreateChat";
import CreateEvent from "./CreateEvent";
import ToSConfirmation from "./ToSConfirmation";

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

  const [displayTos, setDisplayTos] = useAtom(displayTosAtom);
  const [displayPrivacyPolicy, setDisplayPrivacyPolicy] = useAtom(displayPrivacyPolicyAtom);

  // check if logged in
  useEffect(() => {
    fetchUser();
    fetchSocket();
  }, []);
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
          {user.tosAgreed ? null : <ToSConfirmation />}
          {displayTos ? <div>ToS</div> : null}
          {displayPrivacyPolicy ? <div>Privacy</div> : null}
        </div>
      ) : (
        <div className="home">
          <Nav />
          {/* <UnauthenticatedMap /> */}
        </div>
      )}
    </>
  );
};

export default Home;
