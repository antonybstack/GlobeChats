import React from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/AtomHelpers";
import { Divider } from "antd";

function Profile(props) {
  // const [email, setEmail] = useState("");
  // const [first, setFirst] = useState("");
  // const [last, setLast] = useState("");
  // const [image, setImage] = useState("");
  // const [userId, setUserId] = useState("");
  const [user] = useAtom(userAtom);

  // axios
  //   .post("/api/profile/spec", { googleId: props.googleId })
  //   .then((res) => {
  //     setEmail(res.data.email);
  //     setFirst(res.data.firstName);
  //     setLast(res.data.lastName);
  //     setImage(res.data.googleImg);
  //     setUserId(res.data._id);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // const addNewFriend = (event) => {
  //   event.preventDefault();
  //   let date = moment().tz("America/New_York");
  //   axios.post("/api/friend/new", {
  //     user: userId,
  //     friendedDate: date,
  //     onlineStatus: true,
  //   });
  // };

  return (
    <>
      <h2 className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
        User Profile
      </h2>
      <Divider />
      <p className="site-description-item-profile-p">Personal</p>
      <div className="profile-pic">
        <img src={user.googleImg} alt={"Profile"} />
      </div>
      <div>
        <div className="profile-title">User:</div>
        <div className="profile-text">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div>
        <div className="profile-title">Email:</div>
        <div className="profile-text">{user.email}</div>
      </div>
    </>
    // <div className="event-create-container">
    //   <div className="event-header">
    //     <div className="event-header-middle">Profile</div>
    //     <div className="event-close-outside" onClick={props.handleClose}>
    //       <div className="event-close-x-left">
    //         <div className="event-close-x-right"></div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="event-form">

    //     {props.loggedInProfile ? (

    //     ) : (
    //       <button className="add-friend" onClick={addNewFriend}>
    //         Add friend
    //       </button>
    //     )}
    //   </div>
    // </div>
  );
}

export default Profile;
