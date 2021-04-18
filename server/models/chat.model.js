const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Chat = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "User is required",
    },
    chatroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chatroom",
      required: "Chatroom is required",
    },
    message: {
      type: String,
      required: "Message is required",
      default: "",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

module.exports = mongoose.model("Chat", Chat);
