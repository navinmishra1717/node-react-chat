const mongoose = require("mongoose");
const schema = mongoose.Schema;

const constants = require("../commons/constants");

const ReadByRecipientSchema = new schema(
  {
    _id: false,
    readByUserId: { type: schema.Types.ObjectId, ref: "User" },
    readAt: { type: Date, default: Date.now() },
  },
  {
    timestamps: false,
  }
);

const ChatMessage = new schema(
  {
    message: schema.Types.Mixed,
    type: {
      type: String,
      default: () => constants.messageTypes.TYPE_TEXT,
    },
    chatRoomId: { type: schema.Types.ObjectId, ref: "ChatRoom" },
    postedByUser: { type: schema.Types.ObjectId, ref: "User" },
    readByRecipients: [ReadByRecipientSchema],
  },
  {
    timestamps: true,
    collection: "chatMessages",
  }
);

// write methods here
ChatMessage.methods.create = async function() {
  return new Promise((resolve, reject) => {
    this.save(function(err, chatMessage) {
      if (err) {
        reject(err);
      }
      resolve(chatMessage);
    });
  });
};

module.exports = mongoose.model("ChatMessage", ChatMessage);
