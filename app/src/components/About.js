import React, { useState, useEffect } from "react";
import { Modal, Button, Space } from "antd";
import logo from "../assets/logo512.png";

const About = () => {

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <>
            <div className="links" onClick={toggleVisible}>
                About
            </div>
            <Modal
                title="About GlobeChats"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div className="aboutModal">
                    <img id="aboutLogo" src={logo} alt={"GlobeChats logo"} />
                    <span id="logoName" className="aboutName">GlobeChats</span>
                </div>

                <br />

                <div className="aboutModalCenter">
                    <p>Enter information about GlobeChats here.</p>

                    <br />
                    <h2>Developers</h2>
                    <p>Matthew Rossi (Project Manager)</p>
                    <p>Antony Blyakher (Lead Developer)</p>
                    <p>Joshua Boyer</p>
                    <p>Roderick Keys</p>
                    <p>Tony Lee</p>
                    <p>Anna Tsambounieris</p>

                    <br />

                    <h2>Technologies</h2>
                    <p>Mongoose, MongoDB, React JS, Express, Node.js</p>
                    <p>Mapbox, Google Identity, Cryptr, Ant Design</p>
                </div>

                



            </Modal>
        </>
    );

};

export default About;