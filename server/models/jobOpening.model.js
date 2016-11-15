var JobOpening = require('../db').JobOpening;
var User = require('../db').User;

var jobOpeningModel = {};

jobOpeningModel.createRow = function(job) {
  return JobOpening.create(job)
    .then(function(result) {
      return result
    })
    .catch(function(err) {
     console.err(err)
      // console.log(err)
    })
}

jobOpeningModel.getJobs = function(username) {
  return User.findOne({
    where: {
      username: username
    }
  })
    .then(function(user) {
      return JobOpening.findAll({
        where: {
          userId: user.dataValues.id
        }
      })
      .then(function(jobs) {
        console.log(jobs)
        return jobs
    })
  })
    .catch(function(err) {
      console.err(err)
    })
}

jobOpeningModel.deleteJob = function(jobId) {
  return JobOpening.findOne({
    where: {

    }
  })
    .then(function(job) {
      return JobOpening.findOne
    })
    .catch(function(err) {
      console.err(err)
    })
}

jobOpeningModel.updateJobs = function(username) {
  return User.findOne({
    where: {
      username: username
    }
  })
    .then(function(user) {
      return JobOpening.findAll({

      })
    })
    .then(function(job) {

    })
    .catch(function(err) {
      console.err(err)
    })
}

module.exports = jobOpeningModel