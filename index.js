// node.js doesn't support ES6 import syntax; need to use old syntax
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// tell passport to use Google OAuth strategy
// clientID - public token; identifies this app to the google servers
// clientSecret - private token; don't share with anyone else
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log('profile: ', profile);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    // scope specifies what we want permission to access from google
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));

// check if heroku has assigned a port to run app on
// otherwise, assign to port 5000 (in dev env)
const PORT = process.env.PORT || 5000;
// express telling node to listen for traffic on port 5000
app.listen(PORT);
