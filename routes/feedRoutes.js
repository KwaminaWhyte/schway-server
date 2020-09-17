const express = require("express");
const router = express.Router();

const Feed = require("../modals/Feed");
const auth = require("../middlewares/auth");

router.get("", (req, res) => {
  Feed.find()
    .sort("-timestamp")
    .then((feeds) => res.send(feeds))
    .catch((err) => res.send({ message: err }));
});

router.post("/new", auth, (req, res) => {
  let { user, body, mediaUrl } = req.body;
  let userId = req.user.id;

  Feed.create({ userId, user, body, mediaUrl })
    .then((feed) => res.send(feed))
    .catch((err) => res.send({ message: err }));
});

router.put("/:id/update", auth, (req, res) => {
  let { body } = req.body;

  Feed.findById(req.params.id)
    .then((data) => {
      data.body = body;
      data
        .save()
        .then((feed) => res.send(feed))
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

router.delete("/:id/delete", auth, (req, res) => {
  console.log(req.params.id);
  Feed.deleteOne({ _id: req.params.id })
    .then((feed) => {
      res.send(feed);
      console.log(feed);
    })
    .catch((err) => res.send({ message: err }));
});

module.exports = router;
