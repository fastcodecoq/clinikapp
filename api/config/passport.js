var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var liveStrategy = require('passport-windowslive').Strategy;
var yahooStrategy = require('passport-yahoo-oauth').Strategy;
var Credencial = require('../models/credenciales');
var Token = require('../models/token');
var Logueo = require('../models/sistemasLogueo');
var credencialCtrl = require('../controllers/credencial');
var passport = require('passport');
var servicios = require('./servicios');
var bcrypt = require('bcrypt-nodejs');



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




passport.use('ingreso-local', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'clave',
  passReqToCallback : true
},

function(req, email, clave, listo) {


  console.log(email);

  var validar = require('../helpers/validador');

  if(!validar.mail(email)) listo(null, false, 'params_invalidos');


  Credencial.findOne({ 'email' :  email , 'sistema_logueo' : servicios.local.sistema_logueo },function(err, credencial) {

    console.log(credencial)

    if (err)
      return listo(err);

    if(!credencial) 
      return listo(null, false, 'credencial_invalida');

    if (!credencial)
      return listo(null, false, 'correo_no_existe');


    if(! credencial.compararClaves(clave))
      return listo(null, false, 'contraseña_incorrecta');

    var utils = require('../helpers/utils');
    var Tokens = require('../models/token.js');    
    var token  = {};

    token.token = utils.genToken( credencial._id + credencial.uid + credencial.token );
    token.time = utils.strtotime('+1 hours');
    token._credencial = credencial._id;

    token = new Token(token);

    token.save(function(err, token){

      if(err) return listo(err, {});

      console.log('hemos ingresado');

      var _credencial = {
        'token' : token.token,
        'uid' : credencial.email,
        'email' : credencial.email,
        'perfil_completado' : !!credencial.perfil_completado,
        'local' : true              
      }; 

      if(credencial.perfil_completado)
        {

          var Credencial = require('../models/credenciales');

          Credencial.findOne(credencial).populate('_usuario').exec(function(err, credencial){



            var _credencial = {
              'token' : token.token,
              'uid' : credencial.uid,
              'email' : credencial.email,
              'perfil_completado' : true,
              'usuario' : credencial._usuario,
              'local' : true                            
            }; 

            return listo(null, _credencial);

          });

        }              
        else                              
          return listo(null, _credencial);
    });


  });


}));


passport.use('google', new GoogleStrategy({    
  clientID: servicios.google.id,
  clientSecret: servicios.google.secret,
  callbackURL: servicios.google.callbackURL
},
function(token, refreshToken, profile, listo) {
  process.nextTick(function(){
    credencialCtrl.existe({ email : profile._json.email}, function(err, exist){
      if(err) return listo(err, null);
      if(exist) {
        Credencial.findOne({uid : profile.id}, function(err, rs){
          if(err)
            return listo(err, null);
          if(rs) {
            rs.auth.google = token;
            rs.save(function(err,rs){
              console.log(rs);  
              if(!err)
                return listo(err, rs); 
              return listo(err, rs);
            });
          }
          return listo(err, rs);
        });
      }
      else {
        var datos = {
          'email' : profile._json.email,
          'uid' : profile.id,
          'sistema_logueo' :  servicios.google.sistema_logueo,
        };
        credencialCtrl.crear(datos, function(err, rs){
          return listo(err, rs);
        });
      }
    });
  });
}));



passport.use('live', new liveStrategy({    
  clientID: servicios.live.id,
  clientSecret: servicios.live.secret,
  callbackURL: servicios.live.callbackURL
},
function(token, refreshToken, profile, listo) {



  process.nextTick(function(){

    console.log(token,profile);


    var datos = {
      'email' : profile._json.emails.preferred,
      'uid' : profile.id,
      'token' : token,
      'sistema_logueo' : servicios.live.sistema_logueo
    };


    credencialCtrl.existe({email : datos.email}, function(err, exist){

      console.log('live')


      if(exist)
        {
          Credencial.findOne({uid : profile.id}, function(err, credencial){
            if(err)
              return listo(err, err);

            if(credencial)
              {
                credencial.token = token;
                credencial.save(function(err,credencial){

                  if(!err)
                    return listo(err, credencial); 

                  return listo(err, credencial);

                });
              }
              return listo(err, credencial);



          })
        }
        else
          credencialCtrl.crear(datos, function(err, rs){
            profile['perfil_completado'] = false;
            return listo(err, rs);
          });

    });


  });

}));




passport.use('yahoo', new yahooStrategy({    
  consumerKey: servicios.yahoo.key,
  consumerSecret: servicios.yahoo.secret,
  callbackURL: servicios.yahoo.callbackURL
},
function(token, refreshToken, profile, listo) {



  process.nextTick(function(){

    console.log(token,profile);


    var datos = {
      'email' : profile._json.emails.preferred,
      'uid' : profile.id,
      'token' : token,
      'sistema_logueo' : servicios.yahoo.sistema_logueo
    };


    credencialCtrl.existe({email : datos.email}, function(err, exist){

      console.log('yahoo')


      if(exist)
        {
          Credencial.findOne({uid : profile.id}, function(err, credencial){
            if(err)
              return listo(err, err);

            if(credencial)
              {
                credencial.token = token;
                credencial.save(function(err,credencial){

                  if(!err)
                    return listo(err, credencial); 

                  return listo(err, credencial);

                });
              }
              return listo(err, credencial);



          })
        }
        else
          credencialCtrl.crear(datos, function(err, rs){
            profile['perfil_completado'] = false;
            return listo(err, rs);
          });

    });


  });

}));
