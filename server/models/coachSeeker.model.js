var Coach_Seeker = require('../db').Coach_Seeker;
var User = require('../db').User;

var coachSeekerModel = {};

coachSeekerModel.link = function(seeker, coach, cohort) {
  return User.findOne({
    where: {
      username: seeker
    }
  })
    .then(function(jobSeeker) {
      var seekerId = jobSeeker.id
      return User.findOne({
        where: {
          username: coach
        }
      })
        .then(function(jobCoach) {
          var coachId = jobCoach.id
          return Coach_Seeker.create({
            coach_id: coachId,
            seeker_id: seekerId,
            name: cohort
          })
            .then(function(result) {
              return result
            })
            .catch(function(err) {
              console.err(err)
            })
        })
    })
}

module.exports = coachSeekerModel