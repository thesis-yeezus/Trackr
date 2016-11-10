var JobOpening = require('../db').JobOpening;
var User = require('../db').User;

var jobOpeningModel = {};

jobOpeningModel.createRow = function(job) {
  return JobOpening.create(job)
    .then(function(result) {
      return result
    })
    .catch(function(err) {
      return err
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

module.exports = jobOpeningModel