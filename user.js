const express = require('express');
const passport = require('passport');
const { checkAuthenticated } = require('./auth');
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

router.get('/status', checkAuthenticated, (req, res) => {
  console.log(req.user);
  res.json({ mission: true, package: { username: req.user.username } });
});

router.delete('/logout', checkAuthenticated, function (req, res) {
  req.logout((err) => {
    if (err) {
      console.log(err); // It's good practice to log the error
      return res
        .status(500)
        .json({ mission: false, package: 'Internal Server Error' });
    }

    // Only proceed with session destruction if logout didn't produce an error
    req.session.destroy((err) => {
      if (err) {
        console.log(`Error Destroying session: ${err}`);
        return res
          .status(500)
          .json({ mission: false, package: 'Failed to destroy session' });
      }

      // Clear the session cookie from the browser
      res.clearCookie('connect.sid', {
        path: '/',
        domain: 'localhost',
        httpOnly: true,
        secure: true,
      });

      // Send a response indicating successful logout
      return res
        .status(200)
        .json({ mission: true, package: 'Logout successful' });
    });
  });
});

module.exports = router;
