const express = require("express");
const eventRoutes = express.Router();
const passport = require("passport");
const passportconfig = require("../../passport-google");

const Event = require("../../models/event.model");

eventRoutes.post("/new", passport.authenticate("bearer", { session: false }), (req, res) => {
    //mongodb statement to add new event
    
    res.sendStatus(200);
});

module.exports = eventRoutes;