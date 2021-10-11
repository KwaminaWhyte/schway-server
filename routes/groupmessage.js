const { Router } = require("express");

const router = Router();
const auth = require("../utils/auth");
const GroupMessage = require("../models/GroupMessage");

// add new broadcast
router.post("/new/:id", auth, async (req, res) => {
  let { body } = req.body;

  let newGroupMessage = new GroupMessage({
    body,
    group: req.params.id,
    user: req.user.id,
  });

  await newGroupMessage
    .save()
    .then((message) => res.send(message))
    .catch((err) => res.status(401).send(err));
});

module.exports = router;
