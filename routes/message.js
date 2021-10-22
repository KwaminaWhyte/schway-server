const { Router } = require("express");

const router = Router();
const auth = require("../utils/auth");
const Message = require("../models/Message");

router.get("/current/:id", (req, res) => {});

// addd a new message by conversationID
router.post("/new/:conversationId", auth, async (req, res) => {
  let { body, mediaUrl } = req.body;

  let newMessage = new Message({
    conversation: req.params.conversationId,
    sender: req.user.id,
    body,
    mediaUrl,
  });

  await newMessage
    .save()
    .then((message) => res.send(message))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
