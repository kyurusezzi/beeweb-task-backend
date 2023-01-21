const { User } = require("../models/users.model");
const { hashPassword } = require("../utils/passwordHelper");

const createUser = async (userData) => {
  const { fullName, email, password } = userData;

  const hashedPassword = await hashPassword(password);

  const newUser = User.build({
    fullName,
    email,
    password: hashedPassword,
  });
  const user = await newUser.save();
  return user;
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (options, excludePassword = true) => {
  return await User.findOne({
    where: options,
    raw: true,
    attributes: excludePassword ? { exclude: ["password"] } : {},
  });
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
};
