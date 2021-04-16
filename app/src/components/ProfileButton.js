import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from './Profile';

function ProfileButton(props) {

    const [ displayProfile, setDisplayProfile ] = useState(
        {
            displayProfile: false,
        });

        const ProfileClick = (event) => {
            setDisplayProfile({
                displayProfile: !displayProfile.displayProfile,
            });
        }

    

    

    return (
        <div>
            <div className="nav-profile" onClick={ProfileClick}>  
            { displayProfile.displayProfile ? <Profile handleClose={ProfileClick} /> : null} 
            </div>
        </div>
            
                

                

            
                    
                
    );
};

export default ProfileButton;