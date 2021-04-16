const express = require("express");
const modRoutes = express.Router();
const passport = require("passport");
const passportconfig = require("../../passport-google");

const Chatroom = require("../../models/chatroom.model");

modRoutes.delete("/chat", (req, res) => {

  Chatroom.db.collections.messages.deleteOne({_id: req.params.messageId}, function(error, result){
      if (error) throw error;

      res.status(200);
  });
});
modRoutes.delete("/kick", (req, res) => {

    Chatroom.db.collections.chatroom.updateOne({_id: req.params.chatroomId}, {$pullAll: {moderatorIds: [req.params.uid]}}, function(error, result){
        if (error) throw error;
  
        res.status(200);
    });
  });

module.exports = modRoutes;
