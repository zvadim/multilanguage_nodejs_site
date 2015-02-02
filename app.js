// set up ======================================================================
var express = require('express');
var app = express();

var mongoose = require('mongoose');                     // mongoose for mongodb
var database = require('./config/database');            // load the database config
var bodyParser = require('body-parser');                // pull information from HTML POST (express4)
//var methodOverride = require('method-override');        // simulate DELETE and PUT (express4)
var logger = require('morgan');

var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');

// configuration ===============================================================
mongoose.connect(database.url);
app.use(express.static(path.join(__dirname, 'public')));        // set the static files location /public/img will be /img for users
app.use(logger('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(cookieParser());
//app.use(methodOverride());
app.use(require('less-middleware')(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// routes ======================================================================
require('./app/routes')(app);

// error handlers ======================================================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
