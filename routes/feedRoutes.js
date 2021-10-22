const express = require("express");
const router = express.Router();

const Feed = require("../models/Feed");
const Comment = require("../models/Comment");
const auth = require("../utils/auth");
const cloudinary = require("../utils/cloudinary");

// get single feed
router.get("/:id", async (req, res) => {
  let comments = await Comment.find({ feed_id: req.params.id })
    .populate("user", "_id username profile_img")
    .sort("-timestamp");

  await Feed.findById(req.params.id)
    .populate("user", "_id firstname lastname username profile_img")
    .populate("comments", "_id")
    .sort("-timestamp")
    .then((feed) => res.send({ feed, comments }))
    .catch((err) => res.send({ message: err }));
});

// get all feeds
router.get("/", (req, res) => {
  Feed.find()
    .populate("user", "_id firstname lastname username profile_img")
    .populate("comments")
    .sort("-timestamp")
    .then((feeds) => res.send(feeds))
    .catch((err) => res.send({ message: err }));
});

router.get("/me/:id", async (req, res) => {
  await Feed.find({ user: req.params.id })
    .populate("user", "_id firstname lastname username profile_img")
    .populate("comments")
    .sort("-timestamp")
    .then((feeds) => {
      res.send(feeds);
    })
    .catch((err) => res.status(401).send({ message: err }));
});

router.post("/new", auth, async (req, res) => {
  let { body, media, mediaType } = req.body;

  try {
    let uploadRes = await cloudinary.uploader.upload(media, {
      upload_preset: "dev",
      resource_type: mediaType == "video/mp4" ? "video" : "image",
    });

    await Feed.create({
      user: req.user.id,
      body,
      mediaUrl: uploadRes.secure_url,
      mediaType: uploadRes.resource_type,
      mediaId: uploadRes.public_id, //use to delete the file after
    })
      .then((feed) => res.send(feed))
      .catch((err) => res.send({ message: err }));
  } catch (error) {
    console.log("something went wrong", error);
  }
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
  Feed.findById(req.params.id)
    .then((data) => {
      if (req.user.id == data.user) {
        Comment.deleteMany({ feed_id: req.params.id })
          .then(() => res.send({ msg: "comment Deleted!" }))
          .catch((err) => console.log(err));

        Feed.deleteOne({ _id: req.params.id })
          .then(() => {
            res.send({ msg: "Feed Deleted!" });
          })
          .catch((err) => res.send({ message: err }));
      } else {
        console.log("Not Owner of feed");
      }
    })
    .catch((err) => res.send(err));
});

// like feed
router.post("/:id/like", auth, async (req, res) => {
  const feed = await Feed.findById(req.params.id);

  if (!feed) return res.status(401).send("Feed does not exist");

  await Feed.findByIdAndUpdate(req.params.id, {
    $push: { likes: req.user.id },
  });

  res.send(`Done!, You liked ${req.params.id}`);
});

router.post("/:id/unlike", auth, async (req, res) => {
  const feed = await Feed.findById(req.params.id);

  if (!feed) return res.status(401).send("Feed does not exist");

  await Feed.findByIdAndUpdate(req.params.id, {
    $push: { likes: req.user.id },
  });

  res.send(`Done!, You unliked ${req.params.id}`);
});

module.exports = router;
