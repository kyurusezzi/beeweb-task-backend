const { getUser, createUser } = require("./users.service");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../utils/passwordHelper");

const signup = async (email, password, fullName) => {
  try {
    const user = await createUser({ email, password, fullName });
    const responseDto = await login(user.email, password);
    return responseDto;
  } catch (error) {
    console.log(error);
  }
};

const login = async (email, password) => {
  try {
    const user = await getUser({ email }, false);

    if (!user) {
      return null;
    }
    if (await comparePassword(password, user.password)) {
      const payload = { id: user.id };

      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return { token, user: { fullName: user.fullName } };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  signup,
};
