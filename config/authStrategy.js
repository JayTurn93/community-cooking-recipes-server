const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");
const GoogleStrategy = require("passport-google-oauth20");

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
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, Profiler, done) =>{
      try {
        const user = await User.findOne({googleId: Profiler.id});

        if (user) {
          return done(null, user);
        } else {
          const newUser = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            username: profile.emails[0].value,
            googleId: profile.id,
          });
        }
        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id)
    done(null, user);
  } catch (error) {
    done(error);
  }
});