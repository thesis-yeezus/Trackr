var SharedJob = require('../db').SharedJob

var sharedJobController = {};

sharedJobController.GET = function(req, res) {
  SharedJob
    .find({
      where: {
        username: req.query.username,
        password: req.query.password
      }
    })
    .then(function(data) {
      res.send(data)
    })
};

sharedJobController.POST = function(req, res) {
  SharedJob.create(req.body);
  res.send(req.body);
};

module.exports = sharedJobController;