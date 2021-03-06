const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
// User obj. is our model class
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // user.id is not profile.id (GoogleId), it is the mongo _id property
  // that mongo auto generates and assigns to each instance
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// tell passport to use Google OAuth strategy
// clientID - public token; identifies this app to the google servers
// clientSecret - private token; don't share with anyone else
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // querying the db is an async operation and returns a promise
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record w/ the given profile id
        return done(null, existingUser);
      }
      // we don't have a user record, make a new record
      // create a new User model instance
      // .save() persists model instance to the db
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
