const express = require("express");
const friendRoutes = express.Router();

const Friend = require("../../models/friend.model");

friendRoutes.post("/friends-list", (req, res) => {
  const newFriend = new Friend({
    name: req.body.user.username,
  });

  newFriend.save().then((friend) => res.json(friend));
});

module.exports = friendRoutes;
