var express = require('express')
var userController = require('../controllers').userController;
var bodyParser = require('body-parser');
var userRouter = express.Router();

userRouter.get('/', userController.getUser);
userRouter.post('/createUser', userController.createUser);

module.exports = userRouter;