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
var User = require('./db').User;
var JobOpening = require('./db').JobOpening;
require('./helpers/reminders')

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

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new LinkedInStrategy({
    consumerKey: process.env.linkedInKey,
    consumerSecret: process.env.linkedInSecret,
    callbackURL: "http://ec2-54-244-61-0.us-west-2.compute.amazonaws.com:8000/api/auth/linkedin/callback",
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

app.use('/', express.static(path.join(__dirname, '../dist')));
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

app.get('/api/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }))

app.get('/api/auth/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/signup' }),
  function(req, res) {

  console.log("this is req", req.user)
     var userId = req.user[0].dataValues.id
     var username = req.user[0].dataValues.username
     var firstName = req.user[0].dataValues.firstName

    res.status(200).cookie('userId', userId).cookie('username', username).cookie('firstName', firstName);
    res.redirect('/main');
});


app.use('/api', router);

app.listen(port, function() {
  console.log(`server listening on port ${port}`);
});
