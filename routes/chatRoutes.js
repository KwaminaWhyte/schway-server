const express = require("express");

const router = express.Router();
const auth = require("../middlewares/auth");

const Chat = require("../modals/Chat");

router.get("/current/:id", (req, res) => {
  // Chat.find({ users: { "$in" : [#user1#,#user2#]} })
  // .sort({ updatedAt: -1 })
  // .limit(20)
});

router.post("/new/:to", auth, async (req, res) => {
  let { type, text } = req.body;

  let chat = await Chat.findOne({
    users: { $in: [req.user.id, req.params.to] },
  });
  // .sort({ updatedAt: -1 })
  // .limit(20)
  // .then((chat) => res.send(chat))
  // .catch((err) => res.status(401).send({ Errormessage: err }));
  console.log(chat);
  if (!chat) {
    let newChat = new Chat({
      users: [req.user.id, req.params.to],
      message_type: type,
      messages: { text, from: req.user.id },
    });

    await newChat.save();
    await res.send(newChat);
  } else {
    // await chat.messages.push({ text, from: req.user.id });
    // await chat.save();
    // await res.send(newChat);
  }

  console.log({ type, user_from: req.user.id, user_to: req.params.to });
});

module.exports = router;
