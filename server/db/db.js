//JEFF - Oliver, can you please look through this and index.js db and delete the relationships in HERE? Please confirm.

// User.belongsToMany(User, {as: 'Coach_Seeker', through: 'coachSeeker', foreignKey: 'coach_id', otherKey: 'seeker_id'});
// // User.belongsToMany(User, {as: 'coach_id', through: 'coachSeeker'});
// User.hasOne(Blog);
// User.hasOne(JobOpening);
// Blog.belongsToMany(Keyword, {through: 'BlogKeyword'});
// Keyword.belongsToMany(Blog, {through: 'BlogKeyword'});
// JobOpening.belongsToMany(Keyword, {through: 'JobOpeningKeyword'});
// Keyword.belongsToMany(JobOpening, {through: 'JobOpeningKeyword'});

// JobOpening.belongsToMany(JobOpening, {as: 'JobPosting', through: 'SharedJobs', foreignKey: 'jobOpening_id'} )

// ASK MARCO ABOUT THIS SELF-RELATIONAL TABLE.

// SharedJob.hasOne(User, {as: 'Giver'});
// SharedJob.hasMany(User, {as: 'Receiver'});
// JobOpening.hasOne(SharedJob);

var Sequelize = require('sequelize');

var db = new Sequelize('postgres://admin:WYNLXLEPCHCXIISQ@aws-us-east-1-portal.23.dblayer.com:16288/compose');

db.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = db;