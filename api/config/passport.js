var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var liveStrategy = require('passport-windowslive').Strategy;
var yahooStrategy = require('passport-yahoo-oauth').Strategy;
var Credencial = require('../models/credenciales');
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

      var datos = {email : email, uid : email, _sistema_logueo : servicios.local.sistema_logueo ,clave : Credencial.schema.methods.genHash(clave)};
          datos.token =  Credencial.schema.methods.genHash(datos.clave + datos.email + new Date().getTime());

        credencialCtrl.crear(datos, function(err,nuevaCredencial) {
          if (err) throw err;
          listo(null,nuevaCredencial);
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

        credencial.token_time = new Date().getTime();
        credencial.token = credencial._usuario + credencial.clave + credencial.email + new Date().getTime();             
        credencial.token = credencial.genHash(credencial.token);

        credencial.save(function(err, credencial){
           
           if(err) return listo(err, {});

             console.log('hemos ingresado');
             return listo(null, credencial);

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

        console.log(token,profile);


        var datos = {
           'email' : profile._json.email,
           'uid' : profile.id,
           'token' : token,
           '_sistema_logueo' :  servicios.google.sistema_logueo
        };


      credencialCtrl.existe(datos.email, function(err, exist){

          if(exist)
            {
              Credencial.findOne({uid : profile.id}, function(err, rs){
                if(err)
                  return listo(err, null);

                if(rs)
                {
                rs.token = token;
                rs.save(function(err,rs){
                
                console.log(rs);  
                if(!err)
                    return listo(err, rs); 
                    
                return listo(err, rs);

                });
                }
                return listo(err, rs);


                  
              })
            }
          else
            credencialCtrl.crear(datos, function(err, rs){
                  profile['perfil_completado'] = false;
                  return listo(err, rs);
            });

      });

        
    });

  }
));



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
           '_sistema_logueo' : servicios.live.sistema_logueo
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

  }
));




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
           '_sistema_logueo' : servicios.yahoo.sistema_logueo
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

  }
));