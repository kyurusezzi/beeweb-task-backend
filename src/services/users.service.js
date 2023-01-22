const { User } = require("../models/user.model");
const { hashPassword } = require("../utils/passwordHelper");

const createUser = async (userData) => {
  try {
    const { fullName, email, password } = userData;

    const hashedPassword = await hashPassword(password);

    const newUser = User.build({
      fullName,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    return user;
  } catch (error) {
    console.log(error);
  }
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
  try {
    return await User.findOne({
      where: options,
      raw: true,
      attributes: excludePassword ? { exclude: ["password"] } : {},
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
};
