const express = require("express");
const { messages } = require("../client/src/assets/data");

const router = express.Router();

const Chat = require("../modals/Chat");

router.get("/", (req, res) => {
  // Chat.find(({ users: { "$in" : [#user1#,#user2#]} })
  // .sort({ updatedAt: -1 })
  // .limit(20)
});

module.exports = router;
