// utils
const jwt = require("jsonwebtoken");
const logger = require("../../commons/logger");
const redisHelper = require("../../commons/redisHelper");
const constants = require("../../commons/constants");
const log = logger.log;
const Response = require("../../commons/response");

/**
 * This function gets all the users in the system
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next function to call next middleware
 */
async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    // check if user already exists
    const userString = await redisHelper.get(username);
    const user = JSON.parse(userString);
    if (!user) {
      throw new Error("User not found!");
    }
    // match the password
    if (password != user.password) {
      throw new Error("Password doesnot match!");
    }

    await redisHelper.hset("users", username, { username, password });
    const payload = {
      username: username,
      password: password,
    };

    let authToken = jwt.sign(payload, constants.SECRET_KEY, {
      expiresIn: 24 * 60 * 60,
    });
    log.info("Login success");
    Response.successResponse(res, "Login success", {
      user: { username: user.username },
      token: authToken,
    });
  } catch (err) {
    log.error(err);
    next(err);
  }
}

/**
 * This function gets all the users in the system
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next function to call next middleware
 */
async function register(req, res, next) {
  try {
    const { username, password } = req.body;
    // validate req payload
    log.info("creating new user");
    if (!username) {
      throw new Error("Username is required!!");
    }
    if (!password) {
      throw new Error("Password is required!!");
    }
    // check if user already exists

    const exists = await redisHelper.hexists("users", username);
    if (exists) {
      return Response.errorResponse(res, "user already exists");
    }

    // await redisHelper.set(username, { username, password });
    await redisHelper.hset("users", username, { username, password });
    const payload = {
      username: username,
      password: password,
    };
    let authToken = jwt.sign(payload, constants.SECRET_KEY, {
      expiresIn: 24 * 60 * 60,
    });
    log.info("Register success");

    Response.successResponse(res, "Register success", {
      token: authToken,
    });
  } catch (err) {
    log.error(err);
    next(err);
  }
}

const authHandler = {
  login,
  register,
};

module.exports = authHandler;
