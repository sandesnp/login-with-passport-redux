const LocalStrategy = require('passport-local').Strategy;
const USERS = require('./users.json');
const bcrypt = require('bcryptjs');

const auth = function (passport) {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      const foundUser = USERS.find((user) => user.username === username);

      if (!foundUser) return done(null, false, "Username doesn't exist.");

      //returns true or false
      const User = await bcrypt.compare(password, foundUser.password);
      if (!User) return done(null, false, "Password doesn't match.");

      return done(null, foundUser);
    })
  );

  //ID saved inside a state or lets call it session
  //session id is created and is provided to user client browser
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  //User makes a request, which contains the session id.
  //through the session id, we retrieve the state or lets call it session.
  // we retrieve the user ID inside the session. We use that to find the user.
  passport.deserializeUser((id, done) => {
    const User = USERS.find((user) => user._id === id);
    done(null, User);
  });
};
module.exports = auth;
