var express = require('express')
var userController = require('../controllers').userController;
var bodyParser = require('body-parser');
var userRouter = express.Router();

userRouter.post('/loginUser', userController.loginUser);
userRouter.post('/createUser', userController.createUser);

module.exports = userRouter;