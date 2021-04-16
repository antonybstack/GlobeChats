const express = require("express");
const userRoutes = express.Router();
const passport = require("passport");
const passportconfig = require("../../passport-google");
const JWT = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const User = require("../../models/user.model");

const signToken = (userID) => {
  //JWT paylod
  return JWT.sign(
    {
      iss: process.env.SESSION_SECRET,
      sub: userID, //subject
    },
    process.env.SESSION_SECRET,
    { expiresIn: "1h" }
  );
};

const authenticationMiddleware = (request, response, next) => {
  console.log("request.isAuthenticated(): " + request.isAuthenticated());
  if (request.isAuthenticated()) {
    return next(); // we are good, proceed to the next handler
  }
  return response.sendStatus(403); // forbidden
};

userRoutes.post("/login", passport.authenticate("bearer", { session: false }), (req, res, next) => {
  // console.log("HEADSDFGSDFGSDFGDFGH");
  // console.log(req.headers);
  // console.log("request.isAuthenticated()");
  // console.log(req.isAuthenticated());
  //console.log("req.user");
  //console.log(req.user);

  const token = signToken(req.user._id);
  //console.log(token);
  res.cookie("access_token", token, { httpOnly: true, sameSite: true });
  const { _id, googleId, email, firstName, lastName, googleImg, register_date } = req.user;
  res
    .status(200)
    .json({ isAuthenticated: true, user: { _id, googleId, email, firstName, lastName, googleImg, register_date }, message: { msgBody: "Account successfully logged in", msgError: false } });
});

//LOGOUT
userRoutes.post("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
  req.logout();
  res.clearCookie("access_token");
  res.json({ isAuthenticated: true, user: { googleId: "" }, success: true });
});

//CHECK IF AUTHENTICATED
userRoutes.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
  console.log(req);
  const { _id, googleId, email, firstName, lastName, googleImg, register_date } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { _id, googleId, email, firstName, lastName, googleImg, register_date } });
});

module.exports = userRoutes;
