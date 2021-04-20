const express = require("express");
const profileRoutes = express.Router();
const User = require("../../models/user.model");

profileRoutes.post("/spec", (req, res) => {

    User.db.collections.users.find({googleId: req.body.googleId}).toArray((error, doc) => {
        res.status(200).json(doc[0]);
    });
  });

 module.exports = profileRoutes; 