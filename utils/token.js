const jwt = require("jsonwebtoken");

function generateToken(data) {
  return jwt.sign({ ...data }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
}

module.exports = generateToken;
