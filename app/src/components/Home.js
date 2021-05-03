import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, fetchUserAtom, isUserAuthenticated } from "../atoms/AtomHelpers";
import DraggableChatroom from "./DraggableChatroom";
import FriendsList from "./FriendsList";
import CreateButtons from "./CreateButtons";
import Map from "./Map";
import UnauthenticatedMap from "./UnauthenticatedMap";
import { DraggableModalProvider } from "ant-design-draggable-modal";

const Home = () => {
  const [, fetchUser] = useAtom(fetchUserAtom);

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
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div className="home">
          <Map />
          <CreateButtons />
          {/* <FriendsList friend={friend} /> */}
          <DraggableModalProvider>
            <DraggableChatroom />
          </DraggableModalProvider>
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
