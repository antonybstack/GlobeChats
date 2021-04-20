const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  googleImg: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },

  friendlist: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Friend",
    },
  ],
});

module.exports = mongoose.model("User", User);
