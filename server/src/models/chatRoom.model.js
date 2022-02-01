// chatRoom model

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ChatRoom = new schema(
  {
    name: String,
    type: {
      type: String,
      enum: ["consumer-to-support", "consumer-to-consumer"],
    },
    userIds: [{ type: schema.Types.ObjectId, ref: "User" }],
    chatInitiator: { type: schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    collection: "chatRooms",
  }
);

module.exports = mongoose.model("ChatRoom", ChatRoom);
