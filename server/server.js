var path = require('path');
require('dotenv').config();
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var router = require('./routes');
var db = require('./db')

var app = express();

var port = process.env.PORT || 8000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../src')));

app.use('/api', router);


// Display error 404 for unknown routes
// app.use(function(req, res) {
//   res.send('Error 404: Page not found');
// });

app.listen(port, function() {
  console.log(`server listening on port ${port}`);
});
