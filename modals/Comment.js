const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
  feed_id: {
    type: String,
    required: true,
  },
  user: {
    type: String,
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

module.exports = mongoose.model("comment", commentSchema);
