//LA MAGIA INICIA AQUÍ

// ========================= requires ===============================


var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var cluster = require('cluster');
var cores = require('os').cpus().length;  //numero de cpus





app.use(multer());
app.use(bodyparser());  // usaremos JSON raw para envío de datos en modo
                        // desarrollo de este modo testeamos mas rapido el api
                        // luego solo es cambiar bodyparser() por bodyparser.urlencoded() 


// ... incluir arriba todos los requires principales


mongoose.connect('mongodb://clinikapp:clinikAPP.2014@localhost/clinikapp');  //nos conectamos a la base de datos


var router = express.Router();
    router = require('./routes/base')(router);  //incluimos el archivo ./routes/base, llamamos a la función y le pasamos el router del app


// ================= la route base contendrá todas las llamadas principales  ===========================
 


//  ... incluir arriba todo lo relacionado con routes

// ================= routes  ==========================================================================



app.use(router);  //le pasamos las routes al app express


// ============ app.uses ===========================






// usamos todos los cores disponibles en la máquina
// para un mejor rendimiento del app


if (cluster.isMaster) {
  
  for (var i = 0; i < cores; i++)
     cluster.fork();
  

  cluster.on('exit', function(worker, code, signal) {
    console.log(worker.process.pid);
  });

}
else
{

// Instanciamiento del app 

var pto = process.env.PORT || 8080;

app.listen(pto);
console.log('Magia en el puerto',pto);

}


// ===========================================================