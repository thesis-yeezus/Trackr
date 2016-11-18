var Sequelize = require('sequelize');

module.exports = function(db) {
  var User = db.define('user', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    role: { type: Sequelize.STRING },
    frequency: { type: Sequelize.INTEGER, defaultValue: 1},
    goals: { type: Sequelize.INTEGER, defaultValue: 5}
  });

  return User; 
};
//move everything here to DB, functions in controllers to models
//api calls in controllers

