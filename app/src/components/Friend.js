import React from "react";
import "./Friend.css";

const isOnline = () => {
  return;
};

const Friend = (props) => {
  return (
    <div className="friend">
      <div class="list-group">
        {" "}
        <span class="list-group-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="currentColor"
            class="bi bi-circle-fill"
            viewBox="0 0 16 16"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
          &nbsp;
          {props.name}
        </span>
      </div>
    </div>
  );
};

export default Friend;
