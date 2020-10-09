const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let feedSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  likes: [],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Feed", feedSchema);
