const express = require("express");

const router = express.Router();
const auth = require("../utils/auth");

const Notification = require("../models/Notification");

router.post("/new", auth, async (req, res) => {
  let { message, receiver, link } = req.body;

  let newNote = new Notification({
    message,
    sender: req.user.id,
    receiver,
    link,
  });

  await newNote
    .save()
    .then((note) => res.send(note))
    .catch((err) => res.status(400).send(err));
});

// get notifications for a user
router.get("/", auth, async (req, res) => {
  await Notification.find({ receiver: req.user.id })
    .populate("sender", "_id username")
    .populate("receiver", "_id username profile_img")
    .sort("-timestamp")
    .then((notifications) => res.send(notifications))
    .catch((err) => res.status(400).send(err));
});

// read a notifications
router.post("/:id/read", async (req, res) => {
  let notification = await Notification.findById(req.params.id);

  if (!notification)
    return res.status(400).send("Notification does not exist!");

  notification.read = true;

  await notification
    .save()
    .then(() => res.send("notification read!"))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
