// utils
const logger = require('../../commons/logger');
const constants = require('../../commons/constants');
const log = logger.log;
const Response = require('../../commons/response');
const redisHelper = require('../../commons/redisHelper');

/**
 * This function gets all the users in the system
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next function to call next middleware
 */
async function getUsers(req, res, next) {
  try {
    log.info('Getting users');
    const users = await redisHelper.getAllData('users');
    const newUsers = [];
    users.forEach((u) => {
      newUsers.push({ username: u.username });
    });
    Response.successResponse(res, 'Get users success', newUsers);
  } catch (err) {
    log.error(err);
    next(err);
  }
}

const userHandler = {
  getAllUsers: getUsers,
};

module.exports = userHandler;
