const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
const Schema = mongoose.Schema;

let Chatroom = new Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  name: {
    type: String,
    require: true,
    min: 1,
    max: 128,
    default: "",
  },
  tags: {
    type: String,
    default: "",
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  verifyUsers: {
    type: Boolean,
    default: false,
  },
  location: {
    type: [Float],
    default: [0, 0],
  },
  eventDate: {
    type: Date,
    default: Date.now,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  moderatorIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [null],
  },
});

module.exports = mongoose.model("Chatroom", Chatroom);
