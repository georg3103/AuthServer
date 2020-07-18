const mongoose = require('mongoose');
const passport = require('passport');
const { Strategy: googleStrategy } = require('passport-google-oauth20');
const { googleClientID, googleClientSecret } = require('../config/keys');

const userModel = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id)
    .then((user) => done(null, user));
})

passport.use(new googleStrategy(
  {
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    userModel.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new userModel({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      })
  })
);
