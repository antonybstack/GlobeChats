import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, fetchUserAtom, isUserAuthenticated, failedToAuthenticateAtom, fetchSocketAtom, displayTosAtom, displayPrivacyPolicyAtom } from "../atoms/AtomHelpers";
import Nav from "./Nav";
import DraggableChatroom from "./DraggableChatroom";
import FriendsList from "./FriendsList";
import Map from "./Map";
import { DraggableModalProvider } from "ant-design-draggable-modal";
import CreateChat from "./CreateChat";
import CreateEvent from "./CreateEvent";
import ToSConfirmation from "./ToSConfirmation";
import Landing from "./Landing";

const Home = () => {
  const [, fetchUser] = useAtom(fetchUserAtom);
  const [, fetchSocket] = useAtom(fetchSocketAtom);

  // eslint-disable-next-line no-unused-vars
  const [user] = useAtom(userAtom); //keep this or it will bug Login component
  const [isAuthenticated] = useAtom(isUserAuthenticated);
  const [failedToAuthenticate] = useAtom(failedToAuthenticateAtom);

  const [displayTos] = useAtom(displayTosAtom);
  const [displayPrivacyPolicy] = useAtom(displayPrivacyPolicyAtom);

  // check if logged in
  useEffect(() => {
    fetchUser();
    fetchSocket();
  }, [fetchUser, fetchSocket]);
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
      ) : null}
      {failedToAuthenticate ? (
        <div className="home">
          <Landing />
        </div>
      ) : null}
    </>
  );
};

export default Home;
