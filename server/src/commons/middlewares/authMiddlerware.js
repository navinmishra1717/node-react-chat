const jwt = require("jsonwebtoken");
const constants = require("../constants");

function authorization(req, res, next) {
  try {
    let token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.headers.authorization ||
      req.headers.token;
    if (token && token.length) {
      const newToken = token.replace("Bearer ", "");
      const decoded = jwt.verify(newToken, constants.SECRET_KEY);
      req.user = decoded;
      return next();
    } else {
      throw new Error("Token is required!!");
    }
  } catch (error) {
    next(error);
  }
}
function authentication(req, res, next) {
  try {
    next();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  authorization,
  authentication,
};
