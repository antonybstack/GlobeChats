import React from "react";
import logo from "../assets/logo512.png";

const About = () => {

    return (
        <>
            <div className="aboutModal">
                <img id="aboutLogo" src={logo} alt={"GlobeChats logo"} />
                <span id="logoName" className="aboutName">GlobeChats</span>
            </div>

            <br />

            <div className="aboutModalCenter">
                <p>GlobeChats is a location-based chat room application that is tailored to specific interests. Users are able to be socially active around nearby individuals from the comfort of their home. GlobeChats also allows users to create and plan in-person events for those nearby to meet up safely.</p>

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
        </>
    );
};

export default About;