const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");

function verify(token, callback) {
  jwt.verify(token, jwtConfig.secret, callback);
}

function sign(user) {
  return signInternal(user, jwtConfig.expiresIn);
}

function signRefresh(user) {
  return signInternal(user, jwtConfig.refreshExpiresIn);
}

function signInternal(user, expire) {
  return jwt.sign({ id: user._id }, jwtConfig.secret, {
    expiresIn: expire,
  });
}

function refresh(user) {
  return jwt.sign({ id: user._id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
}

module.exports = { verify, sign, signRefresh, refresh };
