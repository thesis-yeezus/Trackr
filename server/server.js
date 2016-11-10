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
var User = require('./db').User(db);

var app = express();

var port = process.env.PORT || 8000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
      console.log("this is profile ", profile)
      User.findOrCreate({where: {username: profile.id} });
      return done(null, profile);
    })
  }));

app.use('/', express.static(path.join(__dirname, '../src')));

app.get('/api/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }))

app.get('/api/auth/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/signup' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
});


app.use('/api', router);

// Display error 404 for unknown routes
app.use(function(req, res) {
  res.send('Error 404: Page not found');
});

app.listen(port, function() {
  console.log(`server listening on port ${port}`);
});
