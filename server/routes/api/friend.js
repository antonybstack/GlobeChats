const express = require("express");
const friendRoutes = express.Router();

const User = require("../../models/user.model");
const Friend = require("../../models/friend.model");

// Returns array of Friend Object IDs
friendRoutes.get("/friends-list", (req, res) => {
  User.db.collections.users.find({googleId: req.body.googleId}).toArray((error, doc) => {
    console.log(doc[0].friendlist);
    res.status(200).json(doc[0].friendlist);
  });
});

friendRoutes.get("/friend-info", (req, res) => {
  console.log(req.body.id);
  Friend.db.collections.friends.find({_id: req.body.id}).toArray((error, doc) => {
    console.log(doc[0]);
    User.db.collections.users.find({_id: doc[0].user}).toArray((smallError, smallDoc) => {
      console.log(smallDoc[0]);
      res.status(200).json(smallDoc[0]);
    });
  });
});

friendRoutes.post("/new", (req, res) => {
  Friend.db.collections.friends.insertOne(req.body).then((doc) => {
    console.log(doc);
    res.status(200).json(doc);
  });
});

module.exports = friendRoutes;
