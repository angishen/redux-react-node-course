// next is called when this middleware function is completed (like done callback)
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in to do that.' });
  }

  next();
};
