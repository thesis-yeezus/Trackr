var userModel = require('../models').userModel

// var userController = {};
//   userModel.GET_USER(userId)
//     .then(user => {
//       res.status(200).send(user)
//     })

var userController = {};

userController.loginUser = function(req, res) {
  console.log('inside of loginUser')
  userModel.loginUser(req.query.username, req.query.password)
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
  res.json({name: 'something', something: 'anothersomething'})
};

userController.createUser = function(req, res) {
  console.log('Inside of createUser!!', req.body)
  userModel.createUser(req.body)
    .then(function(data) {
      res.send(data)
      // Data being sent back is the User
      console.log('what is coming back?:', data)
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(400).send(err);
    })
};

module.exports = userController;