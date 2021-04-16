const express = require("express");
const chatRoutes = express.Router();
const passport = require("passport");
const passportconfig = require("../../passport-google");

const Chat = require("../../models/chat.model");

chatRoutes.route("/").get(function (req, res) {
  Chat.find({}, (err, chats) => {
    res.send(chats);
  });
});

chatRoutes.post("/add", (req, res) => {
  let chat = new Chat(req.body);
  chat
    .save()
    .then((chat) => {
      console.log(chat);
      res.status(200).json({ chat });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

module.exports = chatRoutes;
