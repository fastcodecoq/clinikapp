//LA MAGIA INICIA AQUÍ

// ========================= requires ===============================


var express = require('express');
var app = express();
var session = require('express-session');
var flash = require('express-flash');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var cookieParser = require('cookie-parser')
var cluster = require('cluster');
var cores = require('os').cpus().length;  //numero de cpus
var passport = require('passport');
var MongoStore = require('connect-mongo')({ session: session });

// ... incluir arriba todos los requires principales

var db_address = 'clinikapp:clinikAPP.2014@localhost/clinikapp';

mongoose.connection.on('open', function(ref){
  return console.log('Conectado a Mongo');
});

mongoose.connection.on('error', function(err){
  console.log('no se pudo realizar la conexión con mongo');
  console.log(err);
  return console.log(err.message);
});

try {
  //nos conectamos a la base de datos
  mongoose.connect('mongodb://' + db_address);
  console.log('Iniciando conexión en: ' + ('mongodb://' + db_address) + ', esperando...');
} catch (err) {
  console.log('Conexión fallida a: ' + db_address);
}







//  ... incluir arriba todo lo relacionado con routes

// ============ app.use ===========================

app.use(multer());
// usaremos JSON raw para envío de datos en modo desarrollo de este modo
// testeamos mas rapido el api luego solo es cambiar bodyparser() por bodyparser.urlencoded()
app.use(bodyparser());
//le pasamos las routes al app express
var pass = require('./config/passport');
app.use(cookieParser());
app.use(session({
  secret: (process.env.SESSION_SECRET || 'Your Session Secret goes here'),
  store: new MongoStore({
      url: 'mongodb://' + db_address,
      auto_reconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// ============ app.use ===========================

var router = express.Router();
    router = require('./routes/base')(router,passport);  //incluimos el archivo ./routes/base, llamamos a la función y le pasamos el router del app

app.use(router);
// ================= la route base contendrá todas las llamadas principales  ===========================




// usamos todos los cores disponibles en la máquina
// para un mejor rendimiento del app


if (cluster.isMaster) {
  for (var i = 0; i < cores; i++)
  cluster.fork();
  cluster.on('exit', function(worker, code, signal) {
    console.log(worker.process.pid);
  });
}
else {
  // Instanciamiento del app
  var pto = process.env.PORT || 8080;
  app.listen(pto);
  console.log('Magia en el puerto',pto);
}

// ===========================================================
