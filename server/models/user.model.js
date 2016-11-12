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
    .then(function(user) {
      return user
      // ^ is returning the user info
    })
    .catch(function(err) {
      console.err(err)
    })
}

//functions to grab from the db, Oliver made this
userModel.loginUser = function(username, password) {
  console.log('inside loginuser in userModel:', username, password)
  return User.find({
      where: {
        username: username,
        password: password
      }
    })
    .then(function(user) {
      console.log('what is the user?:', user)
        if (user === null) {
          console.log('Users not found in userModel.loginUser')
          return 'No users found'
        } 
        console.log('Users have been found in userModel.loginUser:', user)
        return user
    })
}

module.exports = userModel