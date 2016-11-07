var express = require('express')
var userController = require('../controllers').userController;

var userRouter = express.Router();

userRouter.get('/', userController.GET);
userRouter.post('/',userController.POST);

module.exports = userRouter;