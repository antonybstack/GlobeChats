const express = require("express");
const eventRoutes = express.Router();
const passport = require("passport");
const passportconfig = require("../../passport-google");

const Event = require("../../models/event.model");

eventRoutes.post("/new", (req, res) => {
  let event = new Event(req.body);
  event
    .save()
    .then((event) => {
      console.log(event);
      res.status(200).json({ event });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

module.exports = eventRoutes;
