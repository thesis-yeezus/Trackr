var User = require('../models/user')

// var userController = {};
//   userModel.GET_USER(userId)
//     .then(user => {
//       res.status(200).send(user)
//     })

userController = {};

userController.GET = function(req, res) {
  User
    .find({
      where: {
        username: req.query.username,
        password: req.query.password
      }
    })
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
};

userController.POST = function(req, res) {
  User.create(req.body);
  res.send(req.body);
};

module.exports = userController;