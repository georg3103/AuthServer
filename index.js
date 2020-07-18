const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { mongoURI, cookieKey } = require('./config/keys');
mongoose.connect(mongoURI);
require('./models/User');
require('./services/passport');

const authRoutes = require('./routes/auth');


const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
  })
);

app.use(passport.initialize());

app.use(passport.session());

const port = process.env.PORT || 5001;

app.listen(port);

authRoutes(app);