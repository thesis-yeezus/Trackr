var Sequelize = require('sequelize');

module.exports = function(db) {
  var JobOpening = db.define('jobOpening', {
    position: { type: Sequelize.STRING, defaultValue: null },
    url: { type: Sequelize.STRING, defaultValue: null },
    contact: { type: Sequelize.STRING, defaultValue: null },
    contactEmail: { type: Sequelize.STRING, defaultValue: null },
    comments: { type: Sequelize.STRING, defaultValue: null },
    interview: { type: Sequelize.BOOLEAN, defaultValue: null },
    pursuing: { type: Sequelize.BOOLEAN, defaultValue: null }
  });

  return JobOpening; 
};
