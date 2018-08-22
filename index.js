// node.js doesn't support ES6 import syntax; need to use old syntax
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
// tell express to use cookies
// app.use initiates middleware
app.use(
  cookieSession({
    // maxAge - specifies how long cookie can exist in browser before expired
    // need to pass in as milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// requiring authRoutes file returns a function; this syntax is equiv.
// to calling authRoutes(app)
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (procces.env.NODE_ENV === 'production') {
  // Express will serve up production assets like main.js and main.css
  app.use(express.static('client/build'));

  // Express will serve up index.html if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// check if heroku has assigned a port to run app on
// otherwise, assign to port 5000 (in dev env)
const PORT = process.env.PORT || 5000;
// express telling node to listen for traffic on port 5000
app.listen(PORT);
