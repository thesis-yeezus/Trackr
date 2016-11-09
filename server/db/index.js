var db = require('./db');

var User = require('./user')(db);
var JobOpening = require('./jobOpening')(db);
var Blog = require('./blog')(db);
var Keyword = require('./keyword')(db);
var Coach_Seeker = require('./coachSeeker')(db);
var SharedJob = require('./sharedJob')(db);

// User.belongsToMany(User, {as: 'Coach', through: 'coachSeeker', foreignKey: 'coach_id'})
// User.belongsToMany(User, {as: 'Seeker', through: 'coachSeeker', foreignKey: 'seeker_id'})

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

db.sync({force: true});

module.exports = {
	db: db,
	User: User,
	JobOpening: JobOpening,
	Blog: Blog,
	Keyword: Keyword,
	Coach_Seeker: Coach_Seeker,
	SharedJob: SharedJob
};



// // Assign table relationships
// // PossibleActivities.belongsTo(Trip);
// // SavedActivities.belongsTo(Trip);
// // PossibleExpedia.belongsTo(Trip);
// // SavedExpedia.belongsTo(Trip);

// // Trip.hasMany(PossibleActivities, {foreignKey: 'PossibleActivitiesId', constraints: false});
// // Trip.hasMany(PossibleExpedia, {foreignKey: 'PossibleExpediaId', constraints: false});
// // Trip.hasMany(SavedActivities, {foreignKey: 'SavedActivitiesId', constraints: false});
// // Trip.hasMany(SavedExpedia, {foreignKey: 'SavedExpediaId', constraints: false});