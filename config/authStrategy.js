const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");

passport.use(
  new LocalStrategy (async (username, password, done) => {

    try {
      const user = await User.findOne({username});
      //Error Handling for user
      if (!user) {
        return done.apply(null, false, {message: "Incorrect name.",});
      }
      const result = bcrypt.compare(password, user.password);
      //Error handling for password
      if (!result) {
        return done(null, false, {message: "Incorrect password.",});
      }
      return (done(null, user));
    } catch (error) {
      return done(error);
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  const user = await User.findById(_id)
})