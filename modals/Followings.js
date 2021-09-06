const { model, Schema } = require("mongoose");

const FollowingsSchema = new Schema({});

module.exports = model("Followings", FollowingsSchema);
