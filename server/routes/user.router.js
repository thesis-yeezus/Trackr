var express = require('express')
var userController = require('../controllers').userController;
var bodyParser = require('body-parser');
var userRouter = express.Router();

userRouter.post('/createUser', userController.createUser);
userRouter.post('/loginUser', userController.loginUser);
userRouter.put('/applySignupSettings', userController.applySignupSettings);
userRouter.put('/updateUserSettings', userController.updateUserSettings);
userRouter.put('/changedPassword', userController.changedPassword)

//userRouter.put('/:_id', updateUser); // Use this is we include account settings (11/15/16)
//userRouter.delete('/:_id', userController.deleteUser); //tutorial, we might need this



//userRouter.post('/register', userController.registerUser); //tutorial, might be same as createUser
//userRouter.post('/authenticate', userController.authenticateUser); //tutorial, might be same as loginUser

module.exports = userRouter;