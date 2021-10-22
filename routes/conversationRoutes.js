const express = require("express");

const router = express.Router();
const auth = require("../utils/auth");

const Conversation = require("../models/Conversation");
const User = require("../models/User");
const Message = require("../models/Message");

// create new chat or get the existing one
router.post("/new/:userId", auth, async (req, res) => {
  let chat = await Conversation.findOne({
    participants: { $in: [req.params.userId, req.user.id] },
  });

  if (!chat) {
    let newConversation = new Conversation({
      participants: [req.params.userId, req.user.id],
    });

    let savedChat = await newConversation.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { conversations: savedChat },
    });

    await User.findByIdAndUpdate(req.params.userId, {
      $push: { conversations: savedChat },
    });

    res.send({ newConversation });
  } else {
    res.send({ chat });
  }

  // let user = await User.findById(req.user.id).select("_id username messages");
  // let otherUser = await User.findById(user2).select("_id username messages");
});

// get current conversation and mesages
router.get("/current/:id", auth, async (req, res) => {
  let conversation = await Conversation.findById(req.params.id)
    .populate("participants", "_id username firstname lastname profile_img")
    .where("_id")
    .ne(req.user.id);

  let messages = await Message.find({ conversation: req.params.id });

  res.send({ conversation, messages });
});

// depreciated
// dont use this method
router.patch("/:id/new", auth, async (req, res) => {
  let { body, mediaUrl } = req.body;

  // await Chat.findByIdAndUpdate(req.params.id, {
  //   $push: { messages: { body, mediaUrl, sender: req.user.id } },
  // })
  //   .then((message) => res.send(message))
  //   .catch((err) => res.status(400).send(err));

  let chat = await Conversation.findById(req.params.id);

  // try some other mothod .
  // get the chat object as a whole then push the new message.
  // then save it, get the data after saving it

  let newMessage = new Message({
    body,
    mediaUrl,
    sender: req.user.id,
  });

  await newMessage
    .save()
    .then(async (message) => {
      if (chat) {
        try {
          await chat.messages.push(message._id);
          await chat
            .save()
            .then(() => {
              res.send(message);
            })
            .catch((err) => res.status(401).send(err));
        } catch (error) {
          res.status(400).send({ Error: err });
        }
      } else {
        res.status(401).send("Chat does not exist!");
      }
    })
    .catch((err) => cpmsole.log(err));
});

module.exports = router;
