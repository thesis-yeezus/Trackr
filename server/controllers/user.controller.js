var userModel = require('../models').userModel

// var userController = {};
//   userModel.GET_USER(userId)
//     .then(user => {
//       res.status(200).send(user)
//     })

var userController = {};

userController.getUser = function(req, res) {
  userModel.getUser(req.query.username, req.query.password)
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
};

userController.signup = function(req, res) {
  userModel.signup(req.body)
    .then(function(data) {
      res.send(data)
    })
};

module.exports = userController;