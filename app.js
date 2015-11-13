var express         = require('express');
var path            = require('path');
var debug           = require('debug');
var logger          = require('morgan');
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var expressLayouts  = require('express-ejs-layouts');
// var ejs             = require('ejs');

var app     = express();
var port    = process.env.PORT || 3000;
var router  = express.Router();

var moongoose = require('mongoose');
moongoose.connect('mongodb://127.0.0.1/carpart');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
Car = require("./models/car");

// app.use(function(req, res, next){
//   console.log('%s request to %s from %s',
//         req.method, //GET
//         req.path, // /
//         req.ip); // ::1
//   next();
// });

app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

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

