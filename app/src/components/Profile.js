import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/AtomHelpers";
import { Popover, Space, message, Button, Modal, Form, Input, Switch, Divider } from "antd";
import axios from "axios";

function Profile(props) {
  // const [email, setEmail] = useState("");
  // const [first, setFirst] = useState("");
  // const [last, setLast] = useState("");
  // const [image, setImage] = useState("");
  // const [userId, setUserId] = useState("");
  const [user, setUser] = useAtom(userAtom);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [toggleEdit, setToggleEdit] = useState(false);

  const settingFirstName = (e) => setFirstName(e.target.value);
  const settingLastName = (e) => setLastName(e.target.value);

  const updateProfile = () => {
    if (firstName === "" && lastName === "") {
      message.error("Please make sure to fill out each field");
      return;
    }

    axios
      .put("/api/users/update/" + user._id, { firstName: firstName, lastName: lastName })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        message.error("Error updating profile.");
      });

    message.success("Profile successfully updated!");
    setToggleEdit(!toggleEdit);
  };

  return (
    <>
      <h2 className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
        User Profile
      </h2>
      <Divider />
      <Form.Item>
        <span className="switchEdit">Edit</span>
        <Switch onChange={() => setToggleEdit(!toggleEdit)} name="editToggle" label="editToggle" checked={toggleEdit} />
      </Form.Item>
      {/* <div className="profile-pic">
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
      </div> */}
      {toggleEdit ? (
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 10,
          }}
          layout="horizontal"
        >
          <div className="profile-pic">
            <img src={user.googleImg} alt={"Profile"} />
          </div>

          <Form.Item label="First name">
            <Input id="editProfileFirstNameInput" onChange={settingFirstName} name="tags" value={firstName} />
          </Form.Item>
          <Form.Item label="Last name">
            <Input id="editProfileLastNameInput" onChange={settingLastName} name="tags" value={lastName} />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={user.email} disabled />
          </Form.Item>
          <Form.Item style={{ float: "right" }}>
            <Button type="primary" size="default" htmlType="submit" onClick={() => updateProfile()}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 10,
          }}
          layout="horizontal"
        >
          <div className="profile-pic">
            <img src={user.googleImg} alt={"Profile"} />
          </div>

          <Form.Item label="First name">
            <Input width={"30%"} onChange={settingFirstName} name="tags" value={firstName} disabled />
          </Form.Item>
          <Form.Item label="Last name">
            <Input onChange={settingLastName} name="tags" value={lastName} disabled />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={user.email} disabled />
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default Profile;
