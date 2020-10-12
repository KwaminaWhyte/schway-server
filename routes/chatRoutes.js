const express = require("express");

const router = express.Router();

const Chat = require("../modals/Chat");

router.get("", (req, res) => {
  // Chat.find(({ users: { "$in" : [#user1#,#user2#]} })
  // .sort({ updatedAt: -1 })
  // .limit(20)
});

router.post("/new", (req, res) => {
  let { sender, messages, participants } = req.body;

  Chat.insertMany()
    .then((chat) => res.send(chat))
    .catch((err) => res.send(err));
});

module.exports = router;
