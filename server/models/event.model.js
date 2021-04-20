const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
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
    min: 1,
    max: 2000,
  },
  location: {
    type: [Float],
    require: true,
  },
  eventDate: {
    type: Date,
    require: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("Event", Event);
