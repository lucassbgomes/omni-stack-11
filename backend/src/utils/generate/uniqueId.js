const crypto = require("crypto");

module.exports = function generate() {
  return crypto.randomBytes(5).toString("HEX");
}