var User = require('../db').User;

var userModel = {};

userModel.createUser = function(user) {
  console.log('da fuq', user)
  // This function accepts an object with a first name, last name, email, and password
  return User.create({
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  })
    .then(function(result) {
      return result
    })
    .catch(function(err) {
      console.err(err)
    })
}

//functions to grab from the db
userModel.getUser = function(username, password) {
  return User.find({
      where: {
        username: username,
        password: password
      }
    })
    .then(function(users) {
        if (users === null) {
          return 'No users found'
        } 
        return users
    })
}

module.exports = userModel