const passport = require("passport");
const passportJWT = require("passport-jwt");

const { getUser } = require("../services/users.service");

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

const strategy = new Strategy(jwtOptions, async (jwt_payload, next) => {
  const user = await getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

module.exports = {
  initialize: passport.initialize(),
  authenticate: passport.authenticate("jwt", { session: false }),
};
