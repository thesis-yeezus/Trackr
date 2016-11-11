var express = require('express')
var userController = require('../controllers').userController;
var bodyParser = require('body-parser');
var userRouter = express.Router();


userRouter.post('/createUser', userController.createUser);
//userRouter.post('/register', userController.registerUser); //tutorial, might be same as createUser

userRouter.post('/loginUser', userController.loginUser);
//userRouter.post('/authenticate', userController.authenticateUser); //tutorial, might be same as loginUser

//userRouter.put('/:_id', updateUser); //do we need this one here?

//userRouter.delete('/:_id', userController.deleteUser); //tutorial, we might need this


module.exports = userRouter;