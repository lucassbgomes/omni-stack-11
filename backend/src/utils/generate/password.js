const bcrypt = require("bcrypt");
const saltRounds = 11;

module.exports = {
  async generate(password) {
    return await bcrypt.hash(password, saltRounds).then(hash => hash);
  },

  async compare(password, passwordHash) {
    const match = await bcrypt.compare(password, passwordHash);

    return match;
  }
}