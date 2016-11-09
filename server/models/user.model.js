var User = require('../db').User;

var userModel = {};

userModel.register = function(user) {
  // This function accepts an object with a first name, last name, email, and password
  return Users.create(user)
    .then(function(result) {
      return result
    })
    .catch(function(err) {
      console.err(err)
    })
}

//functions to grab from the db
userModel.GET = function(username, password) {
  User
    .find({
      where: {
        username: username,
        password: password
      }
    })
    .then(function(users) {
        return users;
    })
}

module.exports = userModel