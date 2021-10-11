const { model, Schema } = require("mongoose");

const groupMessageSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
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

module.exports = model("GroupMessage", groupMessageSchema);
