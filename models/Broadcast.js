const { model, Schema } = require("mongoose");

const broadcastSchema = new Schema({
  channel: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
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
    min: 5,
  },
  mediaUrl: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Broadcast", broadcastSchema);
