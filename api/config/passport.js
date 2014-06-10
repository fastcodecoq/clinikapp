var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth');
var Credencial = require('../models/credenciales');
var Logueo = require('../models/sistemasLogueo');
var credencialCtrl = require('../controllers/credencial');
var passport = require('passport');


var getSistemaDeLogueo = function(nombre, callback){
  Logueo.findOne({nombre : nombre}, function(err,log){
    if(err || log === null) {
      // #TODO local solo deberia servir en desarrollo
      if (nombre === 'local'){
        logueo = new Logueo();
        logueo.nombre = 'local';
        logueo.key = 'local';
        logueo.secret = 'local';
        logueo.save(function(err){
          if(err) callback(err);
          else callback(null,logeo._id);
        });
      }else{
        console.log({ message: 'no existe el sistema de logueo ' + nombre });
        callback(err);
      }
    } else {
      callback(null,log._id);
    }
  });
};



passport.serializeUser(function(usuario,listo) {
  listo(null, usuario.id);
});
passport.deserializeUser(function(usuario,listo) {
  usuario.findById(id, function(err, usuario){
    listo(err, usuario);
  });
});
passport.use(new LocalStrategy({
  usernameField : 'email',
  passwordField : 'clave'
},
function(email, clave, listo){
  // TODO: checkear si el usuario existe
  if(false){
    return listo(null,false,'correo_existe'); //cada error se le debe crear una llave, y esta llave añadirla en /frontend/locales/es.json
  } else {

    var datos = {email : email, token : clave, uid : email};

    getSistemaDeLogueo('local',function(err,log){
      datos._id_sistema_logueo = log;
      
      if(! credencialCtrl.crear(datos, function(err) {
        if (err) throw err;
        return listo(null, nuevaCredencial);
      }) ) return listo(true, nuevaCredencial, 'params_invalidos'); //cada error se le debe crear una llave, y esta llave añadirla en /frontend/locales/es.json

    });
  }
}));
