const express = require("express");
const userRoutes = express.Router();
const passport = require("passport");
const passportconfig = require("../../passport-google");

const User = require("../../models/user.model");

userRoutes.post("/login", passport.authenticate("bearer", { session: false }), (req, res, next) => {
  res.sendStatus(200);
});

userRoutes.post("/logout", (req, res, next) => {
  req.logout(); // logout function added by passport
  res.sendStatus(200);
});

module.exports = userRoutes;
