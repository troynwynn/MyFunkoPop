// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/toys", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Toy.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/toys/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Toy.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // POST route for saving a new post
  app.post("/api/toys", function(req, res) {
    db.Toy.create(req.body).then(function(dbToy) {
      res.json(dbToy);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/toys/:id", function(req, res) {
    db.Toy.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbToy) {
      res.json(dbToy);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Toy.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbToy) {
      res.json(dbToy);
    });
  });
};
