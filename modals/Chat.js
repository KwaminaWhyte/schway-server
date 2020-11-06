const { Schema, model } = require("mongoose");

let ChatSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [
    {
      message: String,
      meta: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          delivered: Boolean,
          read: Boolean,
        },
      ],
    },
  ],
  is_group_message: { type: Boolean, default: false },
  participants: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      delivered: Boolean,
      read: Boolean,
      last_seen: Date,
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
