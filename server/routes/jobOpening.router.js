var express = require('express')
var jobOpeningController = require('../controllers').jobOpeningController;

var jobOpeningRouter = express.Router();

jobOpeningRouter.get('/', jobOpeningController.getJobs);
jobOpeningRouter.post('/',jobOpeningController.createRow);

module.exports = jobOpeningRouter;