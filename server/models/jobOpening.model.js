var JobOpening = require('../db').JobOpening;
var User = require('../db').User;

var jobOpeningModel = {};

jobOpeningModel.createRow = function(job) {
  console.log("this is job", job)
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
  return JobOpening.destroy({
    where: {
      id: jobId
    }
  })
    .then(function(num) {
      console.log("deleteJob NUM?", num)
      return num
    })
    .catch(function(err) {
      console.err(err)
    })
}

jobOpeningModel.updateJobs = function(job) {
  return JobOpening.update(job, {
    where: {
      id: job.id
    }
  })
  .then(function(res) {
    return res
  })
    .catch(function(err) {
      console.err(err)
    })
}

module.exports = jobOpeningModel