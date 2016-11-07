var express = require('express')
var coachSeekerController = require('../controllers').coachSeekerController;

var coachSeekerRouter = express.Router();

coachSeekerRouter.get('/', coachSeekerController.GET);
coachSeekerRouter.post('/',coachSeekerController.POST);

module.exports = coachSeekerRouter;