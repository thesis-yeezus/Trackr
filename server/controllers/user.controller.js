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




// var userController = {};
//   userModel.GET_USER(userId)
//     .then(user => {
//       res.status(200).send(user)
//     })

module.exports = userController;