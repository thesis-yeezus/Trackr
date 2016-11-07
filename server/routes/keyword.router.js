var express = require('express')
var keywordController = require('../controllers').keywordController;

var keywordRouter = express.Router();

keywordRouter.get('/', keywordController.GET);
keywordRouter.post('/',keywordController.POST);

module.exports = keywordRouter;