const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Report = new Schema({
  reportedUserId: {
    type: String,
    required: true,
  },
  reportMessage: {
    type: String,
    required: "Message is required",
    default: "",
  },
  report_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", Report);
