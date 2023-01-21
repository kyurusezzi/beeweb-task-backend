const userService = require("../services/users.service");

const usersController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = {
  usersController,
};
