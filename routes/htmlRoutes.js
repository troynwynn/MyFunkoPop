var path = require('path');

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app){

  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/create");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
    // res.sendFile(path.join(__dirname, "../views/index.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/create");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // RECENTLY ADDED SECURITY.HTML
  app.get("/security", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/create");
    }
    res.sendFile(path.join(__dirname, "../public/security.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/create", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create.html"));
  });

  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/users.html"));
  });


  // app.get("/signin", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../views/sign-in.html"));
  // });

  // app.get("/trades", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../views/trades.html"));
  // });

  // app.get("/trophyroom", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../views/trophy-room.html"));
  // });

};
