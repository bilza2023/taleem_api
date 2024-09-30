const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./user/userModel');

function initPassport(passport) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET 
  };

  passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.sub);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Token not valid' });
      }
    } catch (error) {
      return done(error, false);
    }
  }));
}

module.exports = initPassport;
