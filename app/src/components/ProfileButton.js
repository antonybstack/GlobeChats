import React, { useState } from "react";
import Profile from "./Profile";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/AtomHelpers";
import { Drawer } from "antd";

function ProfileButton() {
  const [user] = useAtom(userAtom);
  const [drawerVisible, setDrawerVisible] = useState(false);

  var style = {
    backgroundImage: "url(" + user.googleImg + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
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
      <Drawer width={"30%"} placement="right" closable={false} onClose={onClose} visible={drawerVisible}>
        <Profile />
      </Drawer>
    </div>
  );
}

export default ProfileButton;
