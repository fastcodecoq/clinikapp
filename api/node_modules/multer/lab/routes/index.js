var express = require('express');
var router = express.Router();
var Busboy = require('busboy');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {

  console.log(req.body);
  console.log(req.files);
  res.send('OK');

});

module.exports = router;
