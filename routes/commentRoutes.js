const express = require("express");
const router = express.Router();

const Comment = require("../modals/Comment");

router.get("/feed/:id", (req, res) => {
  Comment.find({ feed_id: req.params.id })
    .sort("-timestamp")
    .then((comments) => res.send(comments))
    .catch((err) => res.send(err));
});

router.post("/new", (req, res) => {
  let { feed_id, user, body } = req.body;

  Comment.create({ feed_id, user, body })
    .then((comment) => res.send(comment))
    .catch((err) => res.send({ msg: err }));
});

module.exports = router;
