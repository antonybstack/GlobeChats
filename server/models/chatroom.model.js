const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Chatroom = new Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    require: true,
    min: 1,
    max: 128,
  },
  tags: {
    type: String,
  },
  isPrivate: {
    type: Boolean,
  },
  verifyUsers: {
    type: Boolean,
  },
  location: {
    type: [Number],
  },
  eventDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Chatroom", Chatroom);
