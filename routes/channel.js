const { Router } = require("express");
const router = Router();

const Channel = require("../models/Channel");
const Broadcast = require("../models/Broadcast");
const auth = require("../utils/auth");

// get all public channels
router.get("/", async (req, res) => {
  await Channel.find({ public: true })
    .populate("admin", "_id username")
    .sort("name")
    .then((channels) => res.send(channels))
    .catch((err) => res.status(401).send(err));
});

// get all private channels
router.get("/private", async (req, res) => {
  await Channel.find({ public: false })
    .populate("admin", "_id username")
    .sort("name")
    .then((channels) => res.send(channels))
    .catch((err) => res.status(401).send(err));
});

// get single channel
router.get("/:id", async (req, res) => {
  let broadcasts = await Broadcast.find({ channel: req.params.id })
    .populate("user", "_id username")
    .sort("timestamp");

  await Channel.findById(req.params.id)
    .populate("admin", " _id username")
    .sort("name")
    .then((channel) => res.send({ channel, broadcasts }))
    .catch((err) => res.status(401).send(err));
});

// create a new channel
router.post("/new", auth, async (req, res) => {
  let { name, handle, public } = req.body;

  let channel = await Channel.findOne({ name });
  if (channel) await res.status(400).send(`Channel name '${name}' taken`);

  const newChannel = new Channel({
    name,
    handle,
    admin: req.user.id,
    public,
  });

  await newChannel
    .save()
    .then((channel) => res.send(channel))
    .catch((err) => res.status(400).send(err));
});

// update channel information
router.put("/update/:id", auth, async (req, res) => {
  let { name, handle, public, allowComment, background } = req.body;

  let channel = await Channel.findById(req.params.id);

  if (!channel)
    return res.status(400).send(`Channel name '${name}' does not exist`);

  try {
    await Channel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        handle,
        public,
        allowComment,
        background,
      },
      (err, doc, data) => res.send(data)
    );
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = router;
