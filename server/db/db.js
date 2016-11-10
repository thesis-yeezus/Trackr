require('dotenv').config();
var Sequelize = require('sequelize');

// var db = new Sequelize('postgres://admin:WYNLXLEPCHCXIISQ@aws-us-east-1-portal.23.dblayer.com:16288/compose');
var db = new Sequelize(process.env.composeURI);


db.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = db;