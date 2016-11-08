var Coach_Seeker = require('../db').Coach_Seeker

var coachSeekerController = {};

coachSeekerController.GET = function(req, res) {
  Coach_Seeker
    .find({
      where: {
      }
    })
    .then(function(data) {
      res.send(data)
    })
};

coachSeekerController.POST = function(req, res) {
  Coach_Seeker.create(req.body);
  res.send(req.body);
};

module.exports = coachSeekerController;