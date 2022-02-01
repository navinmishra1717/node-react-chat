const jwt = require("jsonwebtoken");
const constants = require("../constants");

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, constants.SECRET_KEY);
    return { isVerified: true, username: decoded.username };
  } catch (error) {
    return false;
  }
}

module.exports = {
  validateToken,
};
