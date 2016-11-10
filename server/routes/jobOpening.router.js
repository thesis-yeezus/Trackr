var express = require('express')
var jobOpeningController = require('../controllers').jobOpeningController;

var jobOpeningRouter = express.Router();

jobOpeningRouter.get('/', jobOpeningController.getJobs);
jobOpeningRouter.post('/',jobOpeningController.createRow);

module.exports = jobOpeningRouter;

/*
GET /api/job-opening/:user-id/get-jobs
GET /api/:user-id/get-job/:job-id

POST /api/:user-id/post-job

DELETE /api/:user-id/delete-job/:job-id
DELETE /api/:user-id/delete-jobs

PUT /api/:user-id/edit-job/:job-id

*/