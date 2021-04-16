const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Friend = new Schema({
  user: {
    type: User,
    ref: "User",
  },
  friendStatus: {
    type: Number,
    enums: [
      0, //Add a friend,
      1, //Requested as a friend
      2, //Pending friend request
      3, //Friend
    ],
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
