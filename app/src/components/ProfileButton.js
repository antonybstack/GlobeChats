import React, { useContext, useState } from 'react';
import axios from 'axios';
import Profile from './Profile';
import { AuthContext } from "../contexts/AuthContext";

function ProfileButton(props) {
    const { user, isAuthenticated } = useContext(AuthContext);

    const [ displayProfile, setDisplayProfile ] = useState({
        displayProfile: false,
    });

    const ProfileClick = (event) => {
        setDisplayProfile({
            displayProfile: !displayProfile.displayProfile,
        });
    }

    return (
        <div>
            <div>
            { displayProfile.displayProfile ? <Profile googleId={user.googleId} handleClose={ProfileClick} /> : null} 
            </div>
            <div className="nav-profile" onClick={ProfileClick}></div>
        </div> 
    );
};

export default ProfileButton;