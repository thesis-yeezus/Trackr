var jobOpeningModel = require('../models').jobOpeningModel

var jobOpeningController = {};

jobOpeningController.createRow = function(req, res) {
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
  jobOpeningModel.getJobs(req.query.username)
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
};

jobOpeningController.getJob = function(req, res) {
  jobOpeningModel.getJob(parseInt(req.query.jobId))
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
};

  jobOpeningController.deleteJob = function(req, res) {
    jobOpeningModel.deleteJob(req.query.jobId)
      .then(function(data) {
        res.sendStatus(204)
      })
      .catch(function(err) {
        res.status(418).send(err)
      })
  }

  jobOpeningController.updateJobs = function(req, res) {
    jobOpeningModel.updateJobs(req.body)
      .then(function(data) {
        res.send(data)
      })
      .catch(function(err) {
        res.status(418).send(err);
      })
  }

module.exports = jobOpeningController;