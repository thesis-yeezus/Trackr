var express = require('express')
var sharedJobController = require('../controllers').sharedJobController;

var sharedJobRouter = express.Router();

sharedJobRouter.get('/', sharedJobController.GET);
sharedJobRouter.post('/',sharedJobController.POST);

module.exports = sharedJobRouter;