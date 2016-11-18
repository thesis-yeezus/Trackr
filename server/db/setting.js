var Sequelize = require('sequelize');

module.exports = function(db) {
  var Setting = db.define('setting', {
    notifications: {type: Sequelize.INTEGER, defaultValue: 1}
  });

  return Setting; 
};