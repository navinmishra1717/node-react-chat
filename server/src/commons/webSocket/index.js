const { createAdapter } = require("@socket.io/redis-adapter");
const { validateToken } = require("../middlewares/jwt");

const connections = [];
const messages = [];

const getMessageByUser = (id) => {
  let msg = [];
  for (let message of messages) {
    if (message.to == id || message.from == id) {
      msg.push(message);
    }
  }

  return msg;
};

function websocket(io, pubClient, subClient) {
  io.adapter(createAdapter(pubClient, subClient));
  io.on("connection", (socket) => {
    console.log("CONENCTING SOCKET :");
    socket.on("disconnect", function() {});

    socket.on("connected", (payload) => {
      socket.emit("getMessages", {
        messages: messages,
      });
      let user;
      if (payload.token) {
        const jwt = JSON.parse(payload.token);
        const validate = validateToken(jwt.token);
        user = validate.username;
        if (validate.isVerified) {
          socket.emit("auth", { success: true });
        } else {
          socket.emit("auth", { success: false });
        }
      }
      socket.join(user);
    });
    socket.on("chat", (payload, callback) => {
      socket.emit("chat", { message: payload });
      callback({ success: true, message: payload });
      messages.push(payload);
    });

    socket.on("getMessages", (payload) => {
      const messages = getMessageByUser(payload.to);
      socket.emit("getMessages", {
        messages: messages,
      });
    });
  });
}

module.exports = { websocket };
