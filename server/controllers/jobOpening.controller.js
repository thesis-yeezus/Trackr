var jobOpeningModel = require('../models').jobOpeningModel

var jobOpeningController = {};

jobOpeningController.createRow = function(req, res) {
  console.log(req.body)
  jobOpeningModel.createRow(req.body)
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      console.log(err)
      res.status(418).send(err);
    });
  };

jobOpeningController.getJobs = function(req, res) {
  console.log("This is req.query", req.query)
  jobOpeningModel.getJobs(req.query.username)
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
  };

module.exports = jobOpeningController;