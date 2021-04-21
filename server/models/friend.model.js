const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Friend = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  friendedDate: {
    type: Date,
    default: Date.now,
  },
  onlineStatus: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Friend", Friend);
