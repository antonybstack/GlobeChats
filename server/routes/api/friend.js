const express = require("express");
const friendRoutes = express.Router();

const Friend = require("../../models/friend.model");

friendRoutes.get("/friends-list", (req, res) => {
  User.db.collections.users
    .find({ googleId: req.body.googleId })
    .toArray((error, doc) => {
      console.log(doc[0].friendlist);
      res.status(200).json(doc[0].friendlist);
    });
});

module.exports = friendRoutes;
