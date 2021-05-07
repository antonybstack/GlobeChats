import React from "react";
import { Modal } from "antd";
import Login from "./Login";
import logo from "../assets/logo512.png";

const Landing = () => {
    return (
        <>
        <div className="landing">
            
        </div>
        <Modal
            closable={false}
            visible={true}
            mask={true}
            centered={true}
            footer={false}
            width={"40%"}
            >
                <div className="landingLogo">
                    <img id="landingLogo" src={logo} alt={"GlobeChats logo"} />
                    <span id="landingLogoName" className="landingName">GlobeChats</span>
                </div>
                <br />
                <div className="landingRow">
                    <div className="landingGroup">
                        <img src="https://api.iconify.design/fluent:people-team-20-regular.svg" alt="people" className="privacyLock" />
                        <span className="landingText">Discuss</span>
                    </div>
                    <div className="landingGroup">
                        <img src="https://api.iconify.design/fluent:eye-tracking-off-20-regular.svg" alt="eye" className="privacyLock" />
                        <span className="landingText">Private</span>
                    </div>
                    <div className="landingGroup">
                        <img src="https://api.iconify.design/fluent:lock-shield-20-regular.svg" alt="lock" className="privacyLock" />
                        <span className="landingText">Encrypted</span>
                    </div>
                </div>
                <br />
                <div className="landing-login">
                    <Login />
                </div>
        </Modal>
        </>
    );
};

export default Landing;