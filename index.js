// node.js doesn't support ES6 import syntax; need to use old syntax
const express = require("express");
const app = express();

// create route handler to listen for get requests to the '/' route
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

// check if heroku has assigned a port to run app on
// otherwise, assign to port 5000 (in dev env)
const PORT = process.env.PORT || 5000;
// express telling node to listen for traffic on port 5000
app.listen(PORT);
