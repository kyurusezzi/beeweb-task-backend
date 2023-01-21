const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
