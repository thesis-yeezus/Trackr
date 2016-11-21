var Sequelize = require('sequelize');

module.exports = function(db) {
  var JobOpening = db.define('jobOpening', {
    companyName: { type: Sequelize.STRING, defaultValue: null },
    position: { type: Sequelize.STRING, defaultValue: null },
    url: { type: Sequelize.STRING, defaultValue: null },
    contactName: { type: Sequelize.STRING, defaultValue: null },
    contactEmail: { type: Sequelize.STRING, defaultValue: null },
    contactNumber: { type: Sequelize.STRING, defaultValue: null },
    comments: { type: Sequelize.STRING, defaultValue: null },
    interviewDate: { type: Sequelize.STRING, defaultValue: null },
    phonescreenDate: { type: Sequelize.STRING, defaultValue: null },
    date: { type: Sequelize.STRING, defaultValue: null }
  });

  return JobOpening; 
};
