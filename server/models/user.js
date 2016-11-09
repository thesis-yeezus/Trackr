// var Sequelize = require('sequelize');

// module.exports = function(db) {
//   var User = db.define('user', {
//     firstName: { type: Sequelize.STRING },
//     lastName: { type: Sequelize.STRING },
//     email: { type: Sequelize.STRING },
//     username: { type: Sequelize.STRING },
//     password: { type: Sequelize.STRING },
//     role: { type: Sequelize.STRING }
//   });

//   return User; 
// };
var User = require('../db/db').User;

var register = function(user) {
  // This function accepts an object with a first name, last name, email, and password
  return Users.create(user)
    .then(function(result) {
      return result
    })
    .catch(function(err) {
      console.err(err)
    })
}

module.exports = {
  register: register
}