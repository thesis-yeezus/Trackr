var userModel = require('../models').userModel

// var userController = {};
//   userModel.GET_USER(userId)
//     .then(user => {
//       res.status(200).send(user)
//     })

var userController = {};

userController.loginUser = function(req, res) {
  console.log('inside of loginUserreq', req.body)
  // console.log('inside of loginUserres', res)
  userModel.loginUser(req.body.username, req.body.password)
    .then(function(data) {
      console.log('JEFFFYOOOOOO', data)
      res.send(data)
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
  // res.json({name: 'something', something: 'anothersomething'})
};

userController.createUser = function(req, res) {
  console.log('Inside of createUser!!', req.body)
  userModel.createUser(req.body)
    .then(function(data) {
      console.log("data", data.dataValues)
      var userIdObj = {
        userId: data.dataValues.id
      }
      res.cookie('userId', JSON.stringify(userIdObj))
      res.status(200).send(data)
    })
    .catch(function(err) {
      res.status(400).send(err);
    })
};

module.exports = userController;