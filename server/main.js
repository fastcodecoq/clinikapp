//la magia inicia aquí


var express = require("express");
var app = express();
var bodyparser = require("body-parser");



app.use(bodyparser());

var router = express.Router();

 router.get("/", function(req, res){
 	 res.json({error:false, message:"Bienvenid@ a nuestra API"});
 });

var pto = process.env.PORT || 4000;

app.listen(pto);