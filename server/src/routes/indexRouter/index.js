const express = require("express");
const indexRouter = express.Router();
const authHandler = require("../../handlers/user/auth.handler");

// router level middlewares

indexRouter.post("/auth/login", authHandler.login);
indexRouter.post("/auth/register", authHandler.register);

module.exports = indexRouter;
