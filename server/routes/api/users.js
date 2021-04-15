const express = require("express");
const userRoutes = express.Router();
const passport = require("passport");
const passportconfig = require("../../passport-google");

const User = require("../../models/user.model");

const authenticationMiddleware = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next(); // we are good, proceed to the next handler
  }
  return response.sendStatus(403); // forbidden
};

userRoutes.post("/login", passport.authenticate("bearer", { session: false }), (req, res, next) => {
  console.log(req.user);
  res.sendStatus(200);
});

userRoutes.post("/logout", (req, res, next) => {
  req.logout(); // logout function added by passport
  res.sendStatus(200);
});

//CHECK IF AUTHENTICATED
userRoutes.get("/amiauthenticated", passport.authenticate("bearer", { session: false }), (req, res, next) => {
  const { user } = request.user;
  res.status(200).json({ isAuthenticated: true, user: { user } });
});

module.exports = userRoutes;
