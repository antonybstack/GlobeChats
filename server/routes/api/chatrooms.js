const express = require("express");
const chatroomRoutes = express.Router();

const ChatroomModel = require("../../models/chatroom.model");

chatroomRoutes.route("/").get(function (req, res) {
  ChatroomModel.find(function (err, chatrooms) {
    if (err) {
    } else {
      res.status(200).json({ chatrooms });
    }
  });
});

chatroomRoutes.route("/:id").get(function (req, res) {
  ChatroomModel.findById(req.params.id, function (err, chatroom) {
    if (err) {
      return res.status(500).send({ message: { msgBody: "Error retrieving specific chatroom", msgError: true } }, { chatroom });
    }
    return res.status(200).json({ chatroom });
  });
});

chatroomRoutes.post("/add", (req, res) => {
  let Chatroom = new ChatroomModel(req.body);
  Chatroom.save()
    .then((chatroom) => {
      console.log(chatroom);
      res.status(200).json({ chatroom });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: { msgBody: "Error creating chatroom", msgError: true } }, { chatroom });
    });
});

chatroomRoutes.route("/delete/:id").delete(function (req, res) {
  ChatroomModel.findByIdAndRemove(req.params.id, function (err, chatroom) {
    if (err) {
      return res.status(500).send({ message: { msgBody: "Error deleting chatroom", msgError: true } }, { chatroom });
    }
    return res.status(200).send({ chatroom });
  });
});

chatroomRoutes.put("/update/:id", (req, res) => {
  ChatroomModel.findById(req.params.id, function (err, chatroom) {
    if (!chatroom) {
      res.status(404).send("data is not found");
    } else {
      console.log(req.body);
      if (req.body.adminId) chatroom.adminId = req.body.adminId;
      if (req.body.name) chatroom.name = req.body.name;
      if (req.body.tags) chatroom.tags = req.body.tags;
      if (req.body.isPrivate) chatroom.isPrivate = req.body.isPrivate;
      if (req.body.verifyUsers) chatroom.verifyUsers = req.body.verifyUsers;
      if (req.body.location) chatroom.location = req.body.location;
      if (req.body.moderatorIds) chatroom.moderatorIds = req.body.moderatorIds;

      chatroom
        .save()
        .then((chatroom) => {
          res.json({ chatroom });
        })
        .catch((err) => {
          res.status(400).json({ message: { msgBody: "Error updating chatroom", msgError: true } });
        });
    }
  });
});

module.exports = chatroomRoutes;
