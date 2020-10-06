const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let feedSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  mediaUrl: {
    type: String,
  },
  mediaType: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("feed", feedSchema);
