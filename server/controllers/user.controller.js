var userModel = require('../models').userModel

var userController = {};

userController.createUser = function(req, res) {
  userModel.createUser(req.body)
    .then(function(data) {
      var userId = data.dataValues.id
      res.cookie('userId',userId)
      res.status(200).send(data)
    })
    .catch(function(err) {
      res.status(400).send(err);
    })
};

userController.loginUser = function(req, res) {
  userModel.loginUser(req.body.username, req.body.password)
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
};

userController.applySignupSettings = function(req, res) {
  userModel.applySignupSettings(req.body.settings.setGoals, req.body.settings.receiveEmails, req.body.userId)
    .then(function(data) {
      res.status(200).send(data)
    })
};

userController.updateUserSettings = function(req, res) {
  userModel.updateUserSettings(req.body.userId, req.body.settings.firstName, req.body.settings.lastName, req.body.settings.username, req.body.settings.email, req.body.settings.setGoals, req.body.settings.receiveEmail)
    .then(function(data) {
      res.status(200).send(data)
    })
}

userController.changedPassword = function(req, res) {
  userModel.changedPassword(req.body.userId, req.body.password.password)
    .then(function(data) {
      res.status(200).send(data)
    })

}

module.exports = userController;