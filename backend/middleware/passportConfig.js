const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new localStrategy(
    { usernameField: "username" },
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        // Unknown User
        else if (!user)
          return done(null, false, { message: "username not registered" });
        // Wrong Password
        else if (!user.verifyPassword(password))
          return done(null, false, { message: "Wrong password" });
        //Succeeded Login
        else return done(null, user);
      });
    }
  )
);
