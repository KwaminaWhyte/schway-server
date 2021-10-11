const { Router } = require("express");

const router = Router();
const auth = require("../utils/auth");
const Broadcast = require("../models/Broadcast");

// add new broadcast
router.post("/new/:id", auth, async (req, res) => {
  let { body } = req.body;

  let newBroadcast = new Broadcast({
    body,
    channel: req.params.id,
    user: req.user.id,
  });

  await newBroadcast
    .save()
    .then((broadcast) => res.send(broadcast))
    .catch((err) => res.status(401).send(err));
});

module.exports = router;
