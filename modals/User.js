const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
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

module.exports = mongoose.model("User", UserSchema);
