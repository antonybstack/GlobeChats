const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 20,
  },
  avatar: {
    type: Number,
    default: function () {
      return Math.floor(Math.random() * Math.floor(16)) + 1;
    },
  },
  register_date: {
    type: Date,
    default: Date.now,
  },

  friendlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Friend",
    },
  ],
});

module.exports = mongoose.model("User", User);
