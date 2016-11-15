var path = require('path');
var express = require('express');
require('dotenv').config();
var request = require('request');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var router = require('./routes');
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var session = require('express-session');
var db = require('./db').db;
var cookieParser = require('cookie-parser');
var jwt = require('jwt-simple');
var moment = require('moment');
var CronJob = require('cron').CronJob;
var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var User = require('./db').User;
var JobOpening = require('./db').JobOpening;

var app = express();

var port = process.env.PORT || 8000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("keyboard cat"));
app.use(session({ 
  secret: 'keyboard cat', 
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var yesterday = moment().subtract(1, 'days');
var jobCounter = {};

var job = new CronJob({
  cronTime: '00 47 13 * * 1-5',
  onTick: function() {
    User.findAll()
      .then(function(userArr) {
        userArr.forEach(function(user) {
          JobOpening.findAll({
            where: {
              userId: user.dataValues.id
            }
          })
            .then(function(jobs) {
              jobs.forEach(function(job) {
                var jobCreation = moment(job.dataValues.createdAt)
                if(jobCreation.diff(yesterday) > 0) {
                  var userId = job.dataValues.userId.toString()
                  if(jobCounter[userId] === undefined) {
                    jobCounter[userId] = 1
                  } else {
                    jobCounter[userId]++
                  }
                }
              })
            })
        })
      })
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();

var job2 = new CronJob({
  cronTime: '05 47 13 * * 1-5',
  onTick: function() {
    for(var key in jobCounter) {
      if(jobCounter[key] <= 4) {
        User.findOne({
          where: {
            id: key
          }
        })
          .then(function(user) {
            console.log("This is User email", user.dataValues.email)
            var from_email = new helper.Email(user.dataValues.email);
            var to_email = new helper.Email(user.dataValues.email);
            var subject = 'Hello World from the SendGrid Node.js Library!';
            var content = new helper.Content('text/plain', 'Hello, Email!');
            var mail = new helper.Mail(from_email, subject, to_email, content);
            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: mail.toJSON(),
            });

            sg.API(request, function(error, response) {
              console.log(response.statusCode);
              console.log(response.body);
              console.log(response.headers);
            });
          })
      } 
    }
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job2.start();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new LinkedInStrategy({
    consumerKey: process.env.linkedInKey,
    consumerSecret: process.env.linkedInSecret,
    callbackURL: "http://localhost:4200/api/auth/linkedin/callback",
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      User.findOrCreate({
        where: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          username: profile.id
        } 
      })
      .then(function(user) {
        return done(null, user);
      })
    })
  }));

app.use('/', express.static(path.join(__dirname, '../src')));

app.get('/api/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }))

app.get('/api/auth/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/signup' }),
  function(req, res) {
    // console.log("This is req", req.user)
  //   var token = jwt.encode({
  //       iss: req.user.id,
  //       exp: moment().add(7, 'd').valueOf()
  //     }, process.env.SECRET);
  //  res.cookie('token', token)
  console.log("this is req", req.user)
     var userId = req.user[0].dataValues.id
     var username = req.user[0].dataValues.username
      // username: req.user.id,
      // firstName: req.user.name.givenName,
      // lastName: req.user.name.familyName,
      // email: req.user.emails[0].value
    // Successful authentication, redirect home.
    res.status(200).cookie('userId', userId).cookie('username', username);
    res.redirect('/main');
});


app.use('/api', router);

// Display error 404 for unknown routes
app.use(function(req, res) {
  res.send('Error 404: Page not found');
});

app.listen(port, function() {
  console.log(`server listening on port ${port}`);
});
