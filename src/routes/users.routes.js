const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/users", authMiddleware.authenticate, usersController.getAllUsers);

module.exports = router;
