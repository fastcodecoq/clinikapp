var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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
        callback({ message: 'no existe el sistema de logueo ' + nombre });
      }
    } else {
      callback(null,log._id);
    }
  });

};


passport.serializeUser(function(credencial,listo) {
  listo(null, credencial);
});

 passport.deserializeUser(function(credencial,listo) {
    listo(null, credencial);
}); 

passport.use('registro-local', new LocalStrategy(
  { 
    usernameField : 'email',
    passwordField : 'clave'

  },
  function(email, clave, listo){
    
    // TODO: checkear si el usuario existe


    
    credencialCtrl.existe({ email : email},
      function(err, exist){

        if(exist)
          return listo(null,false,'correro_existe'); //cada error lleva una llave que lo asocia con el json ubicado en /frontend/locales/es.json

      var datos = {email : email, token : "na", uid : email, clave : Credencial.schema.methods.genHash(clave)};

      getSistemaDeLogueo('local',function(err,log){
        datos._sistema_logueo = log;
        credencialCtrl.crear(datos, function(err,nuevaCredencial) {
          if (err) throw err;
          listo(null,nuevaCredencial);
          });
       });

      });

  }));




passport.use('ingreso-local', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'clave',
        passReqToCallback : true
    },
    
    function(req, email, clave, listo) {

      var validar = require('../helpers/validador');

      if(!validar.mail(email)) listo(null, false, 'params_invalidos');


      Credencial.findOne({ 'email' :  email },function(err, credencial) {

        console.log(credencial)
        
        if (err)
          return listo(err);
        
        if (!credencial)
          return listo(null, false, "correo_no_existe");

       
        if(! credencial.compararClaves(clave))
          return listo(null, false, "contraseña_incorrecta");

        credencial['clave'] = null;        
        
        console.log('hemos ingresado');
        return listo(null, credencial);
       

        });


    }));


passport.use('google', new GoogleStrategy({    
    clientID: '676866663553-f1ju015m12ia1bu8nt99o85chqtrnt13.apps.googleusercontent.com',
    clientSecret: 'm9rUagRj07jNM7r-W8q-lSk0',
    callbackURL: 'http://localhost:8080/auth/google/callback'
  },
  function(token, refreshToken, profile, listo) {
    
    process.nextTick(function(){

        console.log(token,profile);

        profile['token'] = token;

        listo(null, profile);

    });

  }
));
