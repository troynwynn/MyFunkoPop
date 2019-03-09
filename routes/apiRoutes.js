// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/create");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      // res.json(err);
      // res.redirect(500, "/api/signup");
      res.status(422).json(err.errors[0].message);
      // throw err(`Duplicate `)

    });
  });

  // app.post("/api/signup", function(req, res) {
  //   console.log(req.body);
  //   db.User.create({
  //     email: req.body.email,
  //     password: req.body.password
  //   }).then(function() {
  //     res.redirect(307, "/security");
  //   }).catch(function(err) {
  //     console.log(err);
  //     // res.json(err);
  //     // res.redirect(500, "/api/signup");
  //     res.status(422).json(err.errors[0].message);
  //     // throw err(`Duplicate `)

  //   });
  // });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/users/", function(req, res) {
    db.User.findAll({})
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/users/", function(req, res) {
    db.User.findAll({})
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbUser) {
        res.json(User);
      });
  });


  // app.get("/api/users", function(req, res) {
  //   res.json(users);
  // });

  // app.post("/api/friends", function(req, res) {
      
  //   var newUser = req.body;

  // });

};


// var db = require("../models");

// module.exports = function (app) {
//   // Get all characters
//   app.get("/api/characters", function (req, res) {
//     db.Character.findAll({}).then(function (dbCharacters) {
//       res.json(dbCharacters);
//     });
//   });

//   // Get one character
//   app.get("/api/characters/:id", function (req, res) {
//     db.Character.findOne({
//       where: {
//         id: req.params.id
//       }
//     })
//       .then(function (dbCharacter) {
//         res.json(dbCharacter);
//       });
//   });

//   // Create a new character
//   app.post("/api/characters", function (req, res) {
//     db.Post.create({
//       name: req.body.name,
//       head: req.body.head,
//       body: req.body.body,
//       legs: req.body.legs,
//       background: req.body.background
//     })
//       .then(function (dbCharacter) {
//         res.json(dbCharacter);
//       });
//   });

//   //Update a character by id
//   app.put("/api/characters", function (req, res) {
//     db.Post.update(req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       })
//       .then(function (dbCharacter) {
//         res.json(dbCharacter);
//       });
//   });

//   // Delete an character by id
//   app.delete("/api/characters/:id", function (req, res) {
//     db.Character.destroy({ where: { id: req.params.id } }).then(function (dbCharacters) {
//       res.json(dbCharacters);
//     });
//   });
// };
