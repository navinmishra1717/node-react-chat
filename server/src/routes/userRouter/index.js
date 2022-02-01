const express = require("express");
const userHandler = require("../../handlers/user/user.handler");
const userRouter = express.Router();

const { authorization } = require("../../commons/middlewares/authMiddlerware");

userRouter.get("/user/", authorization, userHandler.getAllUsers);

module.exports = userRouter;
