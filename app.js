var express         = require('express')
             , http = require('http');
var path            = require('path');
var debug           = require('debug');
var logger          = require('morgan');
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var expressLayouts  = require('express-ejs-layouts');
var methodOverride  = require('method-override');


var app     = express();
var port    = process.env.PORT || 3000;
var router  = express.Router();

var moongoose = require('mongoose');
var mongoUri  = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/carpart';

moongoose.connect(mongoUri);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
Car = require("./models/car");
app.use(methodOverride('_method'));
app.use('/', express.static(__dirname + '/public'));

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.use(require('./controllers/cars'));
app.listen(port);

