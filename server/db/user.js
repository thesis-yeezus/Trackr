var Sequelize = require('sequelize');

module.exports = function(db) {
  var User = db.define('user', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    receiveEmails: { type: Sequelize.BOOLEAN, defaultValue: true },
    frequency: { type: Sequelize.INTEGER, defaultValue: 1}, //1 is everyday, other options are 3 and 7.
    goals: { type: Sequelize.INTEGER, defaultValue: 5} // in a week
  });

  return User; 
};
//move everything here to DB, functions in controllers to models
//api calls in controllers

