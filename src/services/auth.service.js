const { getUser, createUser } = require("./users.service");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../utils/passwordHelper");

const signup = async (email, password, fullName) => {
  const user = await createUser({ email, password, fullName });
  const token = await login(user.email, password);
  return token;
};

const login = async (email, password) => {
  const user = await getUser({ email }, false);

  if (!user) {
    return null;
  }
  if (await comparePassword(password, user.password)) {
    const payload = { id: user.id };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  }
};

module.exports = {
  login,
  signup,
};
