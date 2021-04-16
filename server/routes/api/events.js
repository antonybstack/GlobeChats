const express = require("express");
const eventRoutes = express.Router();
const passport = require("passport");
const passportconfig = require("../../passport-google");

const Event = require("../../models/event.model");

eventRoutes.post("/new", (req, res) => {
    //mongodb statement to add new event
    res.send("hello");
});

module.exports = eventRoutes;