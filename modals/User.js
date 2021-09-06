const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    min: 12,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 10,
  },
  firstname: {
    type: String,
    min: 2,
  },
  lastname: {
    type: String,
    min: 2,
  },
  profile_img: {
    type: String,
  },
  loaction: {
    type: String,
  },
  date_registered: {
    type: Date,
    default: Date.now,
    required: true,
  },
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  following: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = model("User", UserSchema);
