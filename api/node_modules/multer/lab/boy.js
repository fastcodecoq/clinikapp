var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Busboy = require('busboy');
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

// busboy
app.use(function (req, res, next) {

  if (req.busboy
      || req.method === 'GET'
      || req.method === 'HEAD'
      || !hasBody(req)
      || !RE_MIME.test(mime(req)))
    return next();

  var busboy = req.busboy = new Busboy({ headers: req.headers, immediate: true });

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding);
    file.on('data', function(data) {
      console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
    });
    file.on('end', function() {
      console.log('File [' + fieldname + '] Finished');
    });
  });

  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
    console.log('Field [' + fieldname + ']: value: ' + inspect(val));
  });

  busboy.on('finish', function() {
    console.log('Done parsing form!');
    res.send('Parsed');
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


