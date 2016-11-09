var path = require('path');
var express = require('express');
require('dotenv').config();
var request = require('request');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var router = require('./routes');

var app = express();

var port = process.env.PORT || 8000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../src')));

app.use('/api', router);


// Display error 404 for unknown routes
app.use(function(req, res) {
  res.send('Error 404: Page not found');
});

app.listen(port, function() {
  console.log(`server listening on port ${port}`);
});
