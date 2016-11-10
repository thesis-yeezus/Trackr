var blogModel = require('../models').blogModel

var blogController = {};

blogController.postBlog = function(req, res) {
  console.log(req.body)
  blogModel.postBlog(req.body.newBlog, req.body.keywords, req.body.username)
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
  };

blogController.getBlog = function(req, res) {
  console.log("This is req.query", req.query)
  blogModel.getBlog(req.query.username)
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
  };

module.exports = blogController;