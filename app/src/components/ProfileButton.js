import React, { useState } from "react";
import Profile from "./Profile";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/AtomHelpers";
import { Drawer, List, Avatar, Divider, Col, Row } from "antd";

function ProfileButton() {
  const [user] = useAtom(userAtom);
  const [drawerVisible, setDrawerVisible] = useState(false);

  var style = {
    backgroundImage: "url(" + user.googleImg + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const [displayProfile, setDisplayProfile] = useState({
    displayProfile: false,
  });

  const ProfileClick = (event) => {
    setDisplayProfile({
      displayProfile: !displayProfile.displayProfile,
    });
  };

  const toggleDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <div>
      <div className="nav-profile" style={style} onClick={toggleDrawer}></div>
      <Drawer width={300} placement="right" closable={false} onClose={onClose} visible={drawerVisible}>
        <Profile googleId={user.googleId} handleClose={ProfileClick} loggedInProfile={true} />
      </Drawer>
    </div>
  );
}

export default ProfileButton;
