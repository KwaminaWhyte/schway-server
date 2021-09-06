const { Schema, model } = require("mongoose");

let CommentSchema = new Schema({
  feed_id: {
    type: Schema.Types.ObjectId,
    ref: "Feed",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
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

module.exports = model("Comment", CommentSchema);
