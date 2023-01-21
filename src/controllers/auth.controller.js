const authService = require("../services/auth.service");

const authController = {
  signup: async (req, res, next) => {
    const token = await authService.signup(
      req.body.email,
      req.body.password,
      req.body.fullName
    );
    if (!token) {
      res.status(400).send("Failed");
      return;
    }
    res.status(201).send({ token });
  },

  login: async (req, res, next) => {
    const token = await authService.login(req.body.email, req.body.password);
    if (!token) {
      res.status(401).send("Invalid credentials");
      return;
    }
    res.status(200).send({ token });
  },
};

module.exports = {
  authController,
};
