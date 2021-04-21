const express = require("express");
const friendRoutes = express.Router();

const User = require("../../models/user.model");
const Friend = require("../../models/friend.model");

// Returns array of Friend Object IDs
friendRoutes.get("/friends-list", (req, res) => {
  User.find({googleId: req.body.googleId}, (error, docs) => {
    console.log(docs[0].friendlist);
    res.status(200).json(docs[0].friendlist);
  });
});

friendRoutes.get("/friend-info", (req, res) => {
  console.log(req.body.id);
  Friend.find({_id: req.body.id}, (error, docs) => {
    console.log(docs);
    User.find({_id: docs[0].user}, (smallError, smallDoc) => {
      console.log(smallDoc[0]);
      res.status(200).json(smallDoc[0]);
    });
  });
});

friendRoutes.post("/new", (req, res) => {
  let newFriend = new Friend(req.body);
  newFriend.save().then((addedFriend) => {
    console.log(addedFriend);
    res.status(200).json({ addedFriend });
  });
});

module.exports = friendRoutes;
