var express = require('express')
var jobOpeningController = require('../controllers').jobOpeningController;

var jobOpeningRouter = express.Router();

jobOpeningRouter.get('/id/', jobOpeningController.getJob);
jobOpeningRouter.get('/', jobOpeningController.getJobs);
jobOpeningRouter.post('/', jobOpeningController.createRow);
jobOpeningRouter.put('/', jobOpeningController.updateJobs);
jobOpeningRouter.delete('/', jobOpeningController.deleteJob);

module.exports = jobOpeningRouter;
