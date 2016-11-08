var Blog = require('../db').Blog

var blogController = {};

blogController.GET = function(req, res) {
  Blog
    .findAll()
    .then(function(data) {
      res.send(data)
    })
};

blogController.POST = function(req, res) {
  Blog.create(req.body);
  res.send(req.body);
};

module.exports = blogController;