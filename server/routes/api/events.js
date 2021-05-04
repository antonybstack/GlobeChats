const express = require("express");
const eventRoutes = express.Router();

const Event = require("../../models/event.model");

eventRoutes.route("/").get(function(req, res) {
  Event.find(function(err, events) {
    if (err) {
      res.status(500).json({ error: "Something went wrong." });
    } else {
      res.status(200).json({ events });
    }
  })
});

eventRoutes.post("/new", (req, res) => {
  let event = new Event(req.body);
  event
    .save()
    .then((event) => {
      res.status(200).json({ event });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

eventRoutes.get("/list", (req, res) => {
  Event.db.collections.events.find({}).toArray((error, doc) => {
    res.status(200).json(doc);
  });
});

eventRoutes.get("/spec", (req, res) => {
  Event.db.collections.events.find({ id: req.params.id }).toArray((error, doc) => {
    res.status(200).json(doc);
  });
});

module.exports = eventRoutes;
