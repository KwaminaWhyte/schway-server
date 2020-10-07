const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
  feed_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feed",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
