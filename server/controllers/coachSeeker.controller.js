var coachSeekerModel = require('../models').coachSeekerModel

var coachSeekerController = {};

coachSeekerController.link = function(req, res) {
  coachSeekerModel.link(req.body.seeker, req.body.coach, req.body.cohort)
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
};


// coachSeekerController.POST = function(req, res) {
//   Coach_Seeker.create(req.body);
//   res.send(req.body);
// };

module.exports = coachSeekerController;