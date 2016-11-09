var express = require('express')
var userController = require('../controllers').userController;

var userRouter = express.Router();

userRouter.get('/', userController.getUser);
userRouter.post('/',userController.signup);

module.exports = userRouter;