import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAtom } from "jotai";
import { userAtom } from "../atoms/AtomHelpers";
import { useQueryClient } from "react-query";
import { Modal, Form, Input, Button, message, Space } from "antd";

function CreateEvent(props) {
  const [user] = useAtom(userAtom);
  const queryClient = useQueryClient();
  const [modalVisibilty, setModalVisibility] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lng, setLng] = useState(-80.8315);
  const [lat, setLat] = useState(35.21);
  const [date, setDate] = useState("");

  const settingTitle = (e) => setTitle(e.target.value);
  const settingDescription = (e) => setDescription(e.target.value);
  const settingLongitude = (e) => setLng(e.target.value);
  const settingLatitude = (e) => setLat(e.target.value);
  const settingDate = (e) => setDate(e.target.value);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
    });

    navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
      permissionStatus.onchange = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLng(position.coords.longitude);
          setLat(position.coords.latitude);
        });
      };
    });
  }, []);

  const submitNewEvent = (event) => {
    if (!title || !description || !lng || !lat || !date) {
      message.error("Please make sure to fill out each field");
      return;
    }

    // var locSplitStringArr = loc.split(",");
    // var locSplitNumberArr = locSplitStringArr.map(Number);

    axios
      .post("/api/events/new", { title: title, description: description, location: [lng, lat], eventDate: date, creator: user._id })
      .then((res) => {
        message.success("Event successfully created!");
        setModalVisibility(!modalVisibilty);
        setTitle("");
        setDescription("");
        setDate("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModalVisibility = () => {
    setModalVisibility(!modalVisibilty);
  };

  return (
    <>
      <Space />
      <div className="circleBase create-buttons-left" onClick={toggleModalVisibility}>
        <div className="outer-icon">
          <div className="inner-calendar-icon"></div>
        </div>
      </div>
      <Modal
        title="Create New Event"
        centered
        visible={modalVisibilty}
        onOk={() => setModalVisibility(false)}
        onCancel={() => setModalVisibility(false)}
        footer={[
          <Button key="submit" type="primary" onClick={() => submitNewEvent()}>
            Submit
          </Button>,
        ]}
      >
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 10,
          }}
          layout="horizontal"
        >
          <Form.Item label="Event Name">
            <Input onChange={settingTitle} name="title" value={title} />
          </Form.Item>
          <Form.Item label="Description">
            <Input onChange={settingDescription} name="description" value={description} />
          </Form.Item>
          <Form.Item label="Longitude">
            <Input onChange={settingLongitude} name="longitude" value={lng} />
          </Form.Item>
          <Form.Item label="Latitude">
            <Input onChange={settingLatitude} name="latitude" value={lat} />
          </Form.Item>
          <Form.Item label="Date">
            <Input onChange={settingDate} type="date" name="date" label="date" value={date} />
          </Form.Item>
        </Form>
      </Modal>
    </>
    // <div className="event-create-container">
    //   <div className="event-header">
    //     <div className="event-header-middle">Create New Event</div>
    //     <div className="event-close-outside" onClick={props.handleClose}>
    //       <div className="event-close-x-left">
    //         <div className="event-close-x-right"></div>
    //       </div>
    //     </div>
    //   </div>
    //   <form className="event-form" onSubmit={submitNewEvent}>
    //     <div className="event-row">
    //       <div className="event-col-25">
    //         <label className="event-form-label">Event Title</label>
    //       </div>
    //       <div className="event-col-75">
    //         <input className="event-input-text" type="text" name="{title}" onChange={settingTitle} />
    //       </div>
    //     </div>

    //     <div className="event-row">
    //       <div className="event-col-25">
    //         <label className="event-form-label">Event Date</label>
    //       </div>
    //       <div className="event-col-75">
    //         <input className="event-input-date" type="date" name="{date}" onChange={settingDate} />
    //       </div>
    //     </div>

    //     <div className="event-row">
    //       <div className="event-col-25">
    //         <label className="event-form-label">Description</label>
    //       </div>
    //       <div className="event-col-75">
    //         <textarea className="event-textarea" name="{desc}" onChange={settingDesc}></textarea>
    //       </div>
    //     </div>

    //     <div className="event-row">
    //       <div className="event-col-25">
    //         <label className="event-form-label">Location</label>
    //       </div>
    //       <div className="event-col-75">
    //         <input className="event-input-text" type="text" name="{loc}" onChange={settingLoc} />
    //       </div>
    //     </div>

    //     <div className="event-row">
    //       <div className="event-col-50-left">
    //         <input className="event-submit-buttons" type="submit" value="Create Event" />
    //       </div>
    //       <div className="event-col-50-right">
    //         <input className="event-submit-buttons" type="submit" value="Cancel" onClick={props.handleClose} />
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
}

export default CreateEvent;
