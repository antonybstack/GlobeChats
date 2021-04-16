const express = require("express");
const profileRoutes = express.Router();
const User = require("../../models/user.model");

profileRoutes.get("/spec", (req, res) => {

    User.db.collections.users.find({googleId: req.body.googleId}).toArray((error, doc) => {
        console.log(req);
        res.status(200).json(doc);
    });
  });

 module.exports = profileRoutes; 