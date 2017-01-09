var db = require('./db');

var User = require('./user')(db);
var JobOpening = require('./jobOpening')(db);
var Blog = require('./blog')(db);
var Keyword = require('./keyword')(db);
var Coach_Seeker = require('./coachSeeker')(db);
var SharedJob = require('./sharedJob')(db);
var Setting = require('./keyword')(db);

User.belongsToMany(User, {as: 'Coach_Seeker', through: 'coachSeeker', foreignKey: 'coach_id', otherKey: 'seeker_id'});
User.hasOne(Blog);
User.hasOne(JobOpening);
User.hasOne(Setting);
Blog.belongsToMany(Keyword, {through: 'BlogKeyword'});
Keyword.belongsToMany(Blog, {through: 'BlogKeyword'});

JobOpening.hasOne(SharedJob);

// db.sync({force: true});
db.sync();

module.exports = {
	db: db,
	User: User,
	JobOpening: JobOpening,
	Blog: Blog,
	Keyword: Keyword,
	Coach_Seeker: Coach_Seeker,
	SharedJob: SharedJob,
	Setting: Setting
};