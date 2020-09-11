const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  },
  email: {
    type: String,
    required: true,
    min: 12,
  },
  password: {
    type: String,
    required: true,
    min: 10,
  },
  dateregistered: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
