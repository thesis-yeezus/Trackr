var express = require('express')
var jobOpeningController = require('../controllers').jobOpeningController;

var jobOpeningRouter = express.Router();

jobOpeningRouter.get('/', jobOpeningController.GET);
jobOpeningRouter.post('/',jobOpeningController.POST);

module.exports = jobOpeningRouter;