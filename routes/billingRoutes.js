const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  // apply requireLogin middleware as second arg to post request
  // request fxn can have any arbitrary number of middleware args
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 survey credits',
      source: req.body.id
    });
    // add credits to user model and send user model back to client
    req.user.credits += 5;
    // save user with updated credit value to db
    const user = await req.user.save();

    res.send(user);
  });
};
