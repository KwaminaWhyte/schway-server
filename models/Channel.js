const { model, Schema } = require("mongoose");

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 5,
  },
  handle: {
    type: String,
    required: true,
    unique: true,
    min: 5,
  },
  bio: {
    type: String,
    default: "Bio of the channel. Purpose of the channel etc...",
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profileImage: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  public: {
    type: Boolean,
    default: true,
  },
  invitationLink: {
    type: String,
    unique: true,
    min: 5,
  },
  settings: {
    theme: {
      background: String,
      text: String,
      bubbles: String,
    },
    allowComment: {
      type: Boolean,
      default: false,
    },
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Channel", ChannelSchema);
