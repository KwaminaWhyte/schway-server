const { model, Schema } = require("mongoose");

const GroupSchema = new Schema(
  {
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
      default: "Bio of the group. Purpose of the group etc...",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileImg: {
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
      // unique: true,
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
        default: true,
      },
      allowChat: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Group", GroupSchema);
