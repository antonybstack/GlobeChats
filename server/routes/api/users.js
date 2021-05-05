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
    { expiresIn: "6h" }
  );
};

userRoutes.post("/login", passport.authenticate("bearer", { session: false }), (req, res, next) => {
  const token = signToken(req.user._id);
  res.cookie("access_token", token, { httpOnly: true, sameSite: true });
  const { _id, googleId, email, firstName, lastName, googleImg, register_date, friendlist, joinedChatroomIds } = req.user;
  res.status(200).json({
    isAuthenticated: true,
    user: { _id, googleId, email, firstName, lastName, googleImg, register_date, friendlist, joinedChatroomIds },
    message: { msgBody: "Account successfully logged in", msgError: false },
  });
});

//LOGOUT
userRoutes.post("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
  req.logout();
  res.clearCookie("access_token");
  res.json({ isAuthenticated: true, user: { googleId: "" }, success: true });
});

//CHECK IF AUTHENTICATED
userRoutes.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { _id, googleId, email, firstName, lastName, googleImg, register_date, friendlist, joinedChatroomIds } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { _id, googleId, email, firstName, lastName, googleImg, register_date, friendlist, joinedChatroomIds } });
});

userRoutes.get("/", (req, res) => {
  User.find(function (err, users) {
    if (err) {
    } else {
      res.status(200).json({ users });
    }
  });
});

userRoutes.put("/update/:id", (req, res) => {
  if (req.params.id) {
    User.findById(req.params.id, function (err, user) {
      if (!user) {
        res.status(404).send("data is not found");
      } else {
        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.lastName) user.lastName = req.body.lastName;
        if (req.body.joinedChatroomIds) user.joinedChatroomIds = req.body.joinedChatroomIds;
        if (req.body.friendlist) user.friendlist = req.body.friendlist;

        user
          .save()
          .then((user) => {
            res.json({ user });
          })
          .catch((err) => {
            res.status(400).json({ message: { msgBody: "Error updating user", msgError: true } });
          });
      }
    });
  }
});

userRoutes.put("/joinchatroom/:id", (req, res) => {
  if (req.params.id) {
    User.findById(req.params.id, function (err, user) {
      if (!user) {
        res.status(404).send("data is not found");
      } else {
        if (req.body.chatroom_id) {
          var chatroomIdExists = false;
          user.joinedChatroomIds.forEach((chatroomId) => {
            if (chatroomId == req.body.chatroom_id) chatroomIdExists = true;
          });

          if (!chatroomIdExists) {
            user.joinedChatroomIds.push(req.body.chatroom_id);
            user
              .save()
              .then((user) => {
                res.json({ user });
              })
              .catch((err) => {
                res.status(400).json({ message: { msgBody: "Error updating user", msgError: true } });
              });
          }
        }
      }
    });
  }
});

userRoutes.put("/leavechatroom/:id", (req, res) => {
  if (req.params.id) {
    User.findById(req.params.id, function (err, user) {
      if (!user) {
        res.status(404).send("data is not found");
      } else {
        if (req.body.chatroom_id) {
          var indexOfElementToDelete = -1;
          user.joinedChatroomIds.forEach((chatroomId, index) => {
            if (chatroomId == req.body.chatroom_id) {
              indexOfElementToDelete = index;
            }
          });

          if (indexOfElementToDelete != -1) {
            user.joinedChatroomIds.splice(indexOfElementToDelete, 1);
            user
              .save()
              .then((user) => {
                res.json({ user });
              })
              .catch((err) => {
                res.status(400).json({ message: { msgBody: "Error updating user", msgError: true } });
              });
          }
        }
      }
    });
  }
});

module.exports = userRoutes;
