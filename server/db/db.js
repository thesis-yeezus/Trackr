require('dotenv').config()
var Sequelize = require('sequelize');

var db = new Sequelize(process.env.composeURI);

db.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

var Blog = db.define('blog', {
  public: { type: Sequelize.BOOLEAN, defaultValue: null },
  content: { type: Sequelize.STRING, defaultValue: null }
});

var Coach_Seeker = db.define('coachSeeker', {
  name: { type: Sequelize.STRING }
});

var JobOpening = db.define('jobOpening', {
  position: { type: Sequelize.STRING, defaultValue: null },
  url: { type: Sequelize.STRING, defaultValue: null },
  contact: { type: Sequelize.STRING, defaultValue: null },
  contactEmail: { type: Sequelize.STRING, defaultValue: null },
  comments: { type: Sequelize.STRING, defaultValue: null },
  interview: { type: Sequelize.BOOLEAN, defaultValue: null },
  pursuing: { type: Sequelize.BOOLEAN, defaultValue: null }
});

var Keyword = db.define('keyword', {
  tag: { type: Sequelize.STRING, defaultValue: null }
});

var SharedJob = db.define('sharedJob', {
});

var User = db.define('user', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  role: { type: Sequelize.STRING }
});

User.belongsToMany(User, {as: 'Coach_Seeker', through: 'coachSeeker', foreignKey: 'coach_id', otherKey: 'seeker_id'});
// User.belongsToMany(User, {as: 'coach_id', through: 'coachSeeker'});
User.hasOne(Blog);
User.hasOne(JobOpening);
Blog.belongsToMany(Keyword, {through: 'BlogKeyword'});
Keyword.belongsToMany(Blog, {through: 'BlogKeyword'});
JobOpening.belongsToMany(Keyword, {through: 'JobOpeningKeyword'});
Keyword.belongsToMany(JobOpening, {through: 'JobOpeningKeyword'});

// JobOpening.belongsToMany(JobOpening, {as: 'JobPosting', through: 'SharedJobs', foreignKey: 'jobOpening_id'} )

// ASK MARCO ABOUT THIS SELF-RELATIONAL TABLE.

// SharedJob.hasOne(User, {as: 'Giver'});
// SharedJob.hasMany(User, {as: 'Receiver'});
JobOpening.hasOne(SharedJob);

db.sync({force: true}).then(function () {
  console.log('Tables have been Created')
});

module.exports = {
	User: User,
	JobOpening: JobOpening,
	Blog: Blog,
	Keyword: Keyword,
	Coach_Seeker: Coach_Seeker,
	SharedJob: SharedJob
};
