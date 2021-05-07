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
                <p>GlobeChats is a location-based chat room application that is tailored to specific interests. Users are able to be socially active around nearby individuals from the comfort of their home. GlobeChats also allows users to create and plan in-person events for those nearby to meet up safely. GlobeChats was developed with security and privacy of the user in mind, which is why we use encryption on all chat messages and use Google to handle a secured login experience. We hope GlobeChats will live up to its promise of allowing anyone to be social from the comfort of their home and become the next great application to make communication possible!</p>
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