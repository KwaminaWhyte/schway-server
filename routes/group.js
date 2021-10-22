const { Router } = require("express");
const router = Router();

const Group = require("../models/Group");
const GroupMessage = require("../models/GroupMessage");
const auth = require("../utils/auth");

// get all public Groups
router.get("/", async (req, res) => {
  await Group.find({ public: true })
    .populate("admin", "_id username")
    .sort("name")
    .then((groups) => res.send(groups))
    .catch((err) => res.status(401).send(err));
});

// get all private groups
router.get("/private", async (req, res) => {
  await Group.find({ public: false })
    .populate("admin", "_id username")
    .sort("name")
    .then((groups) => res.send(groups))
    .catch((err) => res.status(401).send(err));
});

// get single group
router.get("/:id", async (req, res) => {
  let chats = await GroupMessage.find({ group: req.params.id })
    .populate("user", "_id username")
    // .limit(10)
    .sort("timestamp");

  await Group.findById(req.params.id)
    .populate("admin", " _id username")
    .sort("name")
    .then((group) => res.send({ group, chats }))
    .catch((err) => res.status(401).send(err));
});

// create a new group
router.post("/new", auth, async (req, res) => {
  let { name, handle, public } = req.body;

  let group = await Group.findOne({ name });
  if (group) res.status(400).send(`group name '${name}' taken`);

  const newGroup = new Group({
    name,
    handle,
    admin: req.user.id,
    public,
  });

  await newGroup
    .save()
    .then((group) => res.send(group))
    .catch((err) => res.status(400).send(err));
});

// update channel information
router.put("/update/:id", auth, async (req, res) => {
  let { name, handle, public, allowComment, background } = req.body;

  let group = await Group.findById(req.params.id);

  if (!group)
    return res.status(400).send(`group name '${name}' does not exist`);

  try {
    await Group.findByIdAndUpdate(
      req.params.id,
      {
        name,
        handle,
        public,
        allowComment,
        background,
      },
      (err, data) => res.send(data)
    );
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = router;
