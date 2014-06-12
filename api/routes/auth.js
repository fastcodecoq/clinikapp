
// ======= todas las rutas relacionadas con registro y login



var auth = function(router, passport){

  var authArb = require('../arbiters/auth.js');
  var servicios = require('../config/servicios');
  var registro = require('../controllers/registro');


  router.post('/registro/local', function(req, res){

       global.user_agent = req.headers['user-agent'];

       registro.local(req.body, function(err, listo){

            delete global.user_agent;

            if(err) console.log(err);

            res.redirect(servicios.local.callbackURL + '/ingresar');

       });

  });


  router.post('/auth/local', passport.authenticate('ingreso-local', {
    successRedirect : '/logueado', // enviar a completar perfil
    failureRedirect : servicios.local.callbackURL + '/ingresar/falla/local' // redirigir a logueo en caso de fallo
  }));

 
  // servicios de login externos ==============================

  
  router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


  router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect : '/logueado', // enviar a completar perfil
    failureRedirect : servicios.local.callbackURL + '/ingresar/falla/google' // redirigir a logueo en caso de fallo
  }));
  

  // ----- Outlook || live

  router.get('/auth/live', passport.authenticate('live', { scope: ['wl.signin', 'wl.basic', 'wl.emails'] }));


  router.get('/auth/live/callback', passport.authenticate('live', {
    successRedirect : '/logueado', // enviar a completar perfil
    failureRedirect : servicios.local.callbackURL + '/ingresar/falla/live' // redirigir a logueo en caso de fallo
  }));


  // ----- Yahoo


  router.get('/auth/yahoo', passport.authenticate('yahoo'));


  router.get('/auth/yahoo/callback', passport.authenticate('yahoo', {
    successRedirect : '/logueado', // enviar a completar perfil
    failureRedirect : servicios.local.callbackURL + '/ingresar/falla/yahoo' // redirigir a logueo en caso de fallo
  }));


 // servicios de login externos ==============================

  router.get('/registro', authArb.noLogueado, function(req, res){
      
      console.log('hacemos el registro');

      res.send("<h1>Vista de registro en server</h1>");
    

  });


  router.get('/completar-registro', authArb.estaLogueado, function(req, res){
      
      console.log('hacemos el registro', req);

      var user_raw = JSON.stringify(req.user);
      console.log(req.body);
      var style = 'word-break: break-all;width: 466px;';

      res.send('<h1>Vista de completar registro en server</h1><br><p style="' + style +'">' + user_raw + '</p> <br><a href="/auth/salir">Cancelar</a>');
    

  });


 //completar registro listo

  router.post('/completar-registro', authArb.estaLogueado, function(req, res){
      

      var datos = req.body;
          datos.token = req.user.token;
          datos.email = req.user.email;

      
     if(req.user.perfil_completado)
        res.redirect( servicios.local.callbackURL + '/inicio');
     else
         require('../controllers/registro').completar(datos, function(err, usuario){

            if(err) res.json({"error": true, message : 'no se pudo completar'});
            else
            res.redirect( servicios.local.callbackURL + '/inicio/' + req.user.uid + '/' + req.user.token );
    

         });
     

  });


  

  router.get('/logueado', authArb.estaLogueado, function(req, res){
      
      console.log('ingresamos');

      var servicios = require('../config/servicios');

      //verificamos si el perfil esta completado

      if(req.user.perfil_completado || req.user.usuario)
      res.redirect( servicios.local.callbackURL + '/inicio/' + req.user.uid + '/' + req.user.token );
      else
      res.redirect( '/completar-registro' );      
        
  });


  router.get('/auth/salir', authArb.estaLogueado, function(req, res){

     var Credencial = require('../models/credenciales');


         Credencial.findOne({email : req.user.email , token : req.user.token}, function(err, credencial){
        

            if(err) return res.redirect(servicios.local.callbackURL + '/inicio');
            if(!credencial) return res.redirect(servicios.local.callbackURL + '/ingresar');


            // revocamos permisos al token si no es de larga vida (famoso recuerdame)
            if(!credencial.token_larga_vida)
              credencial.token_time = Math.round( (new Date().getTime() - 3600) / 1000);

              credencial.save(function(err, credencial){

                if(err) return res.redirect(servicios.local.callbackURL + '/inicio');

                 req.logout();
                 console.log('salimos');

            
                 res.redirect( servicios.local.callbackURL + '/ingresar');

             });

         });

  });


  router.get('/no-autorizado', function(req, res){

      res.json({error:true, message:'session_invalida'});

  });

  return router;


}




module.exports = auth;