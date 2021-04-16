import React, { useState, useRef, useContext } from "react";

const Ticket = (props) => {
  console.log(props);

  return (
    <div className="chatBlock">
      <div className="chatMessage">
        <div className="msgContainer">{props}</div>
      </div>
      <div className="chatTime">{props}</div>
    </div>
  );
};

export default Ticket;
