var Sequelize = require('sequelize');

module.exports = function(db) {
  var SharedJob = db.define('sharedJob', {
  });

  return SharedJob;
};