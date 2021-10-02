const { Schema, model } = require("mongoose");

let ChatSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  message_type: {
    type: String,
    required: true,
  },
  messages: [
    {
      text: String,
      from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      file: String,
      photo: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = model("Chat", ChatSchema);

// const MessageSchema = mongoose.Schema({
//     message:{
//         text: { type:String, required:true }
//         // you can add any other properties to the message here.
//         // for example, the message can be an image ! so you need to tweak this a little
//     }
//     // if you want to make a group chat, you can have more than 2 users in this array
//     users:[{
//         user: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true }
//     }]
//     sender: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
//     read: { type:Date }
// },
// {
//     timestamps: true
// });

// Message.find(({ users: { "$in" : [#user1#,#user2#]} })
//     .sort({ updatedAt: -1 })
//     .limit(20)
