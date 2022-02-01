// Main starting file
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { createClient } = require("redis");

const infoChecker = require("./commons/middlewares/infoChecker");
const socketHelper = require("./commons/webSocket");
const redisHelper = require("./commons/redisHelper");
const config = require("./config");
const { log } = require("./commons/logger");
const router = require("./routes");
const errorHandler = require("./handlers/error/error.handler");

const app = express();

app.use(cors());

// no db actions for now

/* redis connection */
redisHelper.init();
const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

// Middlewares
app.use(express.static(__dirname)); // built-in middleware
// third party middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// application level middlewares
app.use(infoChecker); // for logging and cleansing

app.all("/*", router);

/** Error handling middleware (keep below routes) */
app.use(errorHandler);

/** create HTTP server */
const httpServer = createServer(app);

/** create socket connection */
const io = new Server(httpServer, {
  path: "/ws/",
  transports: ["websocket"],
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
  },
});

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  socketHelper.websocket(io, pubClient, subClient);
});

httpServer.listen(process.env.NODE_PORT, () => {
  log.info(`Server started on port: ${process.env.NODE_PORT}`);
});

httpServer.on("listening", () => {
  log.info(`Listening on port:: http://localhost:${process.env.NODE_PORT}`);
});
