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
      });
      console.log("this is profile ", profile)
      User.findOrCreate({
        where: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          username: profile.id
        } 
      });
      return done(null, profile);
    })
  }));

app.use('/', express.static(path.join(__dirname, '../src')));

app.get('/api/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }))

app.get('/api/auth/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/signup' }),
  function(req, res) {
    // console.log("This is req", req.user)
    var token = jwt.encode({
        iss: req.user.id,
        exp: moment().add(7, 'd').valueOf()
      }, process.env.SECRET);
   res.cookie('token', token)

    var userObj = {
      username: req.user.id,
      firstName: req.user.name.givenName,
      lastName: req.user.name.familyName,
      email: req.user.emails[0].value
    }
    res.status(200).cookie('user', JSON.stringify(userObj));
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
