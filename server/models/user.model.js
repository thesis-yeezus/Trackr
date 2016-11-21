var User = require('../db').User;
var bcrypt = require('bcrypt-nodejs');

var userModel = {};

userModel.createUser = function(user) {
  console.log('In user.model.js in the server, this is the user:', user);

  // Hashing the password
  var salt = bcrypt.genSaltSync(5);
  var hashedPassword = bcrypt.hashSync(user.password, salt);

  return User.create({
    username: user.username,
    password: hashedPassword,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  })
    .then(function(user) {
      return user
    })
    .catch(function(err) {
      console.err(err)
    })
}

userModel.loginUser = function(username, password) {
  return User.find({
      where: {
        username: username
      }
    })
    .then(function(user) {
      console.log('what is the user?:', user)
      if (user === null) {
        console.log('User not found in DB')
        return 'No users found'
      }
      var result = bcrypt.compareSync(password, user.password)
    
      if (result === false) {
        console.log('Incorrect Password')
        return 'Incorrect Password'
      }
      console.log('Users have been found in DB:', user)
      return user
    })
}

userModel.applySignupSettings = function(setGoals, receiveEmails, userId) {
  return User.find({
    where: {
      id: userId
    }
  })
  .then(function(user) {
    user.update({
      goals: setGoals,
      receiveEmails: receiveEmails
    })
    console.log('the first of two consolelogs')
    return user;
  })
  .catch(function(err) {
    console.log('Error in userModel.applySignupSettings', err)
  })
}


module.exports = userModel