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

var busboy = require('connect-busboy');
app.get('/', function (req, res) {

  //res.render('index', { title: 'Express' });


  res.send('<html><head></head><body>\
               <form method="POST" enctype="multipart/form-data">\
                <input type="text" name="textfield"><br />\
                <input type="file" name="filefield"><br />\
                <input type="submit">\
              </form>\
            </body></html>');
});

/*
app.get('/', function(req, res) {
  res.send('<html><head></head><body>\
               <form method="POST" enctype="multipart/form-data">\
                <input type="text" name="textfield"><br />\
                <input type="file" name="filefield"><br />\
                <input type="submit">\
              </form>\
            </body></html>');
});
*/

// load the middleware
app.use(busboy());
// define a POST route
app.post('/', function(req, res) {

  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('file', filename);
    file.resume();
  });
  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    console.log('field', key, value);
  });
  req.busboy.on('finish', function() {
    console.log('OVER!');
    res.send('OK!');
  });
  req.pipe(req.busboy);

});
app.listen(3000);
