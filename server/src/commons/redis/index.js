const redis = require("redis");
const publisher = redis.createClient(6379, "redis");
const subscriber = redis.createClient(6379, "redis");

subscriber.on("message", function(channel, object) {
  io.emit(channel, JSON.parse(object));
});
subscriber.subscribe("message", "user", "chatroom");
