
var express = require('express');
//var router = express.Router();
var app = express();

app.use(function (req, res, next) {
  console.log('Req');
  next();
});

var a = function (req, res) {
  res.send('OK');
};

app.get('/a', a);

console.log(typeof(a));

var b = express.Router();
b.get('/b', function (req, res) {
  res.send('AK');
});
b.get('/bb', function (req, res) {
  res.send('BK');
});
console.log(typeof(b));
console.log(b.stack);
app.use('/x', b);

app.route('/c')
    .get(function (req, res) {
      res.send('LOL');
    })
    .post(function (req, res) {
      res.send('HAHA');
    })

var server = app.listen(3000, function() {
  console.log('Express server listening on port ' + server.address().port);
});

