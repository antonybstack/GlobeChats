const cookieParser = require("cookie-parser");
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

chatroomRoutes.route("/joined/:arrayOfIds").get(function (req, res) {
  var arrayOfIds = req.params.arrayOfIds.split(",");
  arrayOfIds = arrayOfIds.filter(Boolean);

  ChatroomModel.find({ _id: { $in: arrayOfIds } }, function (err, chatrooms) {
    if (err) {
      return res.status(500).json({ message: { msgBody: "Error retrieving joined chatrooms", msgError: true }, chatroom });
    }
    return res.status(200).json({ chatrooms });
  });
});

chatroomRoutes.route("/:id").get(function (req, res) {
  if (req.params.id) {
    ChatroomModel.findById(req.params.id, function (err, chatroom) {
      if (err) {
        return res.status(500).json({ message: { msgBody: "Error retrieving specific chatroom", msgError: true }, chatroom });
      }
      return res.status(200).json({ chatroom });
    });
  }
});

chatroomRoutes.post("/add", (req, res) => {
  let Chatroom = new ChatroomModel(req.body);
  Chatroom.save()
    .then((chatroom) => {
      ChatroomModel.find(function (err, chatrooms) {
        if (err) {
        } else {
          res.status(200).json({ chatrooms });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: { msgBody: "Error creating chatroom", msgError: true }, chatroom });
    });
});

chatroomRoutes.route("/delete/:id").delete(function (req, res) {
  if (req.params.id) {
    ChatroomModel.findByIdAndRemove(req.params.id, function (err, chatroom) {
      if (err) {
        return res.status(500).send({ message: { msgBody: "Error deleting chatroom", msgError: true }, chatroom });
      }
      return res.status(200).send({ chatroom });
    });
  }
});

chatroomRoutes.put("/update/:id", (req, res) => {
  if (req.params.id) {
    ChatroomModel.findById(req.params.id, function (err, chatroom) {
      if (!chatroom) {
        res.status(404).send("data is not found");
      } else {
        if (req.body.adminId) chatroom.adminId = req.body.adminId;
        if (req.body.name) chatroom.name = req.body.name;
        if (req.body.tags !== undefined || req.body.tags !== null) chatroom.tags = req.body.tags;
        if (req.body.isPrivate) chatroom.isPrivate = req.body.isPrivate;
        if (req.body.verifyUsers) chatroom.verifyUsers = req.body.verifyUsers;
        if (req.body.moderatorIds) chatroom.moderatorIds = req.body.moderatorIds;
        chatroom
          .save()
          .then((chatroom) => {
            res.status(200).json({ chatroom });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: { msgBody: "Error updating chatroom", msgError: true } });
          });
      }
    });
  }
});

module.exports = chatroomRoutes;
