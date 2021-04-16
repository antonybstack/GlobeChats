const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Event = new Schema({
  title: {
    type: String,
    require: true,
    min: 1,
    max: 128,
  },
  description: {
    type: String,
    require: true,
    min: 1,
    max: 2000,
  },
  location: {
    type: [Number],
    require: true,
  },
  eventDate: {
    type: Date,
    require: true,
  },
  creator: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Event", Event);
