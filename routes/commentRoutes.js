const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const Comment = require("../models/Comment");

router.get("/feed/:id", (req, res) => {
  Comment.find({ feed_id: req.params.id })
    .populate("user", "-password -following -followers -__v")
    .sort("-timestamp")
    .then((comments) => res.send(comments))
    .catch((err) => res.status(400).send("Failed to get Comments"));
});

router.post("/new", auth, (req, res) => {
  let { feed_id, body } = req.body;

  Comment.create({ feed_id, user: req.user.id, body })
    .then((comment) => res.send(comment))
    .catch((err) => res.status(400).send("Failed to add new comment"));
});

module.exports = router;
