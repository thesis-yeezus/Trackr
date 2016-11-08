var JobOpening = require('../db').JobOpening

var jobOpeningController = {};

jobOpeningController.GET = function(req, res) {
  JobOpening
    .find({
      where: {

      }
    })
    .then(function(data) {
      res.send(data)
    })
};

jobOpeningController.POST = function(req, res) {
  JobOpening.create(req.body);
  res.send(req.body);
};

module.exports = jobOpeningController;