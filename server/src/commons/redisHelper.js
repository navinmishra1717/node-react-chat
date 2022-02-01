const config = require("../config");
const path = require("path");
const redis = require("redis");
require("dotenv").config({ path: path.join(__dirname, "../env") });

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";

let client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  retry_strategy: (retry) => retry * 100 || 3000,
});

client.on("connect", () => {
  console.log("Redis: connected");
});

client.on("end", () => {
  console.log("Redis: end");
});
client.on("disconnected", () => {
  console.log("Redis: disconnected");
});

client.on("error", function(error) {
  console.error("Redis:Error", error);
});

function init() {
  return new Promise((resolve, reject) => {
    client.connect((err, ok) => {
      if (err) {
        reject(err);
      }
      resolve(ok);
      return true;
    });
  });
}

async function get(key) {
  if (!client) return null;
  const data = await client.get(key);
  return data;
}

async function hget(key) {
  if (!client) return null;
  const data = await client.hGet(key);
  return data;
}

async function exists(key) {
  if (!client) return null;
  const exists = await client.exists(key);
  return exists;
}

async function hexists(key, field) {
  if (!client) return null;
  const exists = await client.hExists(key, field);
  return exists;
}

async function set(key, value) {
  if (!client) return null;
  await client.set(key, JSON.stringify(value));
}

async function hset(key, field, value) {
  if (!client) return null;
  return await client.hSet(key, field, JSON.stringify(value));
}

async function getAllData(key) {
  if (!client) return null;
  const data = await client.hGetAll(key);
  const newData = [];
  Object.keys(data).map((d) => {
    newData.push(JSON.parse(data[d]));
  });
  return newData;
}

async function publish(type, data) {
  const outgoing = {
    serverId: serverId,
    type,
    data,
  };

  redisClient.publish("MESSAGES", JSON.stringify(outgoing));
}

async function subscribe(type, data) {
  const outgoing = {
    serverId: serverId,
    type,
    data,
  };

  redisClient.subscribe("MESSAGES", JSON.stringify(outgoing));
}

module.exports = {
  init,
  exists,
  hexists,
  get,
  hget,
  set,
  hset,
  getAllData,
  client,
  publish,
  subscribe,
};
