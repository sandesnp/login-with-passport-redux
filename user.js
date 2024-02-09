const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    //user is already retrieved using the local strategy. Can be either a user or null.
    //info is the third parameter in the done callback from passportjs

    if (err) {
      return next(err);
    }
    if (!user) {
      //Authentication failed
      return res.status(401).json({ mission: false, package: info });
    }

    //The below code call the serialise function to serialise user id inside the session.
    //The session id then passed to the client which then gets saved in the browser
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res
        .status(200)
        .json({ mission: true, package: { username: user.username } });
    });
  })(req, res, next);
});

module.exports = router;
