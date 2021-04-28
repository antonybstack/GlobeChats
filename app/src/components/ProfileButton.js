import React, { useContext, useState } from "react";
import axios from "axios";
import Profile from "./Profile";
import { AuthContext } from "../contexts/AuthContext";

function ProfileButton(props) {
  const { user, isAuthenticated } = useContext(AuthContext);

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

  return (
    <div>
      <div>{displayProfile.displayProfile ? <Profile googleId={user.googleId} handleClose={ProfileClick} loggedInProfile={true} /> : null}</div>
      <div className="nav-profile" style={style} onClick={ProfileClick}></div>
    </div>
  );
}

export default ProfileButton;
