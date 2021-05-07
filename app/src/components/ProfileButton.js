import React, { useState } from "react";
import Profile from "./Profile";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/AtomHelpers";
import { Drawer, Button, Modal } from "antd";
import About from "./About";
import FAQ from "./FAQ";
import TermsOfService from "./TermsOfService";
import Privacy from "./Privacy";

function ProfileButton() {
  const [user] = useAtom(userAtom);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);
  const [tosVisible, setTosVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);

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
      <Drawer width={"30%"} placement="right" closable={false} onClose={onClose} visible={drawerVisible} push={null} footer={<div
              style={{
                textAlign: 'center',
              }}
            >
              <Button onClick={() => setAboutVisible(!aboutVisible)} style={{ marginRight: 8 }} type="secondary">
                About
                <Modal
                title="About GlobeChats"
                centered
                visible={aboutVisible}
                footer={null}>
                  <About />
                </Modal>
              </Button>
              <Button onClick={() => setFaqVisible(!faqVisible)} style={{ marginRight: 8 }} type="secondary">
                FAQ
                <Modal
                title="About GlobeChats"
                centered
                visible={faqVisible}
                footer={null}>
                  <FAQ />
                </Modal>
              </Button>
              <Button onClick={() => setTosVisible(!tosVisible)} style={{ marginRight: 8 }} type="secondary">
                Terms of Service
                <Drawer height={"100%"} placement="bottom" closable={true} visible={tosVisible}>
                  <TermsOfService />
                </Drawer>
              </Button>
              <Button onClick={() => setPrivacyVisible(!privacyVisible)} style={{ marginRight: 8 }} type="secondary">
                Privacy Policy
                <Drawer height={"100%"} placement="bottom" closable={true} visible={privacyVisible}>
                  <Privacy />
                </Drawer>
              </Button>
            </div>}>
        <Profile />
      </Drawer>
    </div>
  );
}

export default ProfileButton;
