var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('lab');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var RE_MIME = /^(?:multipart\/.+)|(?:application\/x-www-form-urlencoded)$/i;


function hasBody(req) {
  var encoding = 'transfer-encoding' in req.headers,
      length = 'content-length' in req.headers
               && req.headers['content-length'] !== '0';
  return encoding || length;
};

function mime(req) {
  var str = req.headers['content-type'] || '';
  return str.split(';')[0];
};


var busboy = require('connect-busboy');
// load the middleware
app.use(busboy());
// define a POST route
app.post('/', function(req, res) {

  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log(filename);
  });
  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    console.log(key, value);
  });
  req.busboy.on('finish', function() {
    console.log('OVER!');
    res.send('OK!');
  });
  req.pipe(req.busboy);

});

app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});


