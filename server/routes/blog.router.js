var express = require('express')
var blogController = require('../controllers').blogController;

var blogRouter = express.Router();

blogRouter.get('/', blogController.getBlog);
blogRouter.post('/',blogController.postBlog);

module.exports = blogRouter;