var Keyword = require('../db').Keyword

var keyworldController = {};

keyworldController.GET = function(req, res) {
  Keyword
    .find({
      where: {
      }
    })
    .then(function(data) {
      res.send(data)
    })
};

keyworldController.POST = function(req, res) {
  Keyword.create(req.body);
  res.send(req.body);
};

module.exports = keyworldController;