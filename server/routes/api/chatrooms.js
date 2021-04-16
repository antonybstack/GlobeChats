const express = require("express");
const chatroomRoutes = express.Router();
const passport = require("passport");
const passportconfig = require("../../passport-google");

const Chatroom = require("../../models/chatroom.model");

chatroomRoutes.post("/add", (req, res) => {
  let chatroom = new Chatroom(req.body);
  chatroom
    .save()
    .then((chatroom) => {
      console.log(chatroom);
      res.status(200).json({ chatroom });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

module.exports = chatroomRoutes;
