const express = require('express');
const cors = require('cors');
const expressSession = require('express-session');
const passport = require('passport');
const passportAuth = require('./passport');
const USER = require('./user');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());
app.use(cors());

app.use(
  expressSession({
    secret: 'itsSecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, //24 hrs
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportAuth(passport);

app.use('/api/user', USER);

const port = 5010;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
