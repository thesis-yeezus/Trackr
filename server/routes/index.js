var express = require('express');

var blogRouter = require('./blog.router');
var coachSeekerRouter = require('./coachSeeker.router');
var jobOpeningRouter = require('./jobOpening.router');
var keywordRouter = require('./keyword.router');
var sharedJobRouter = require('./sharedJob.router');
var userRouter = require('./user.router');

var router = express.Router();

router.use('/blog', blogRouter);
router.use('/coach-seeker', coachSeekerRouter);
router.use('/job-opening', jobOpeningRouter);
router.use('/keyword', keywordRouter);
router.use('/shared-job', sharedJobRouter);
router.use('/user', userRouter);

module.exports = router;
