var userModel = require('../models').userModel

var userController = {};

userController.createUser = function(req, res) {
  userModel.createUser(req.body)
    .then(function(data) {
      // Create cookie while user is created & send id to front-end.
      var userId = data.dataValues.id
      res.cookie('userId',userId)
      res.status(200).send(data)
    })
    .catch(function(err) {
      res.status(400).send(err);
    })
};

userController.loginUser = function(req, res) {
  console.log('inside of loginUserreq', req.body)
  userModel.loginUser(req.body.username, req.body.password)
    .then(function(data) {
      console.log('JEFFFYOOOOOO', data)
      res.send(data)
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
};

userController.applySignupSettings = function(req, res) {
  console.log('inside of userController.applySignupSettings', req.body)
  console.log('inside of userController.applySignupSettingsSETTINGS', req.body.settings)
  console.log('inside of userController.applySignupSettingsID', req.body.userId)
  userModel.applySignupSettings(req.body.settings.setGoals, req.body.settings.receiveEmails, req.body.userId)
    .then(function(data) {
      console.log('is there even data here?', data)
      res.status(200).send(data)
    })
};

userController.updateUserSettings = function(req, res) {
  console.log('inside of userController.updateUserSettings', req.body)
  userModel.updateUserSettings(req.body.userId, req.body.settings.firstName, req.body.settings.lastName, req.body.settings.username, req.body.settings.email, req.body.settings.setGoals, req.body.settings.receiveEmail)
    .then(function(data) {
      console.log('reached userController.updateUserSettings')
      res.status(200).send(data)
    })
}

userController.changedPassword = function(req, res) {
  console.log('inside of userController.changedPassword', req.body.userId)
  console.log('inside of userController.changedPassword', req.body.password.password)
  userModel.changedPassword(req.body.userId, req.body.password.password)
    .then(function(data) {
      console.log('reached userController.changedPassword')
      res.status(200).send(data)
    })

}



// var userController = {};
//   userModel.GET_USER(userId)
//     .then(user => {
//       res.status(200).send(user)
//     })

module.exports = userController;