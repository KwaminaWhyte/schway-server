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
  let { user, body, mediaUrl, mediaType } = req.body;
  let userId = req.user.id;

  Feed.create({ userId, user, body, mediaUrl, mediaType })
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
  // console.log(req.params.id);

  Feed.findById(req.params.id)
    .then((data) => {
      if (req.user.id === data.userId) {
        console.log("Good to delete this feed");

        Feed.deleteOne({ _id: req.params.id })
          .then((feed) => {
            res.send(feed);
          })
          .catch((err) => res.send({ message: err }));
      } else {
        console.log("Not Owner of feed");
      }
    })
    .catch((err) => res.send(err));
});

module.exports = router;
