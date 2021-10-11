const { Schema, model } = require("mongoose");

const ChatSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

module.exports = model("Chat", ChatSchema);

// var chatSchema = mongoose.Schema({

//   messages: [{
//         text: {
//           type: String,
//           max: 2000
//         },
//         sender: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'User'
//         }
//       }],
//   participant1: [{
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'User'
//         }]
//   participant2: [{
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'User'
//         }]
// });

// Message.find(({ users: { "$in" : [#user1#,#user2#]} })
//     .sort({ updatedAt: -1 })
//     .limit(20)
