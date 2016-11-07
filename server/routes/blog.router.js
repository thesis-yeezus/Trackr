var express = require('express')
var blogController = require('../controllers').blogController;

var blogRouter = express.Router();

blogRouter.get('/', blogController.GET);
blogRouter.post('/',blogController.POST);

module.exports = blogRouter;