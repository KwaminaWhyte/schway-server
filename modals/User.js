const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  firstname: {
    type: String,
    min: 2,
  },
  lastname: {
    type: String,
    min: 2,
  },
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
  loaction: {
    type: String,
  },
  date_registered: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = model("User", UserSchema);
