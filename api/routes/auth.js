
// ======= todas las rutas relacionadas con registro y login



var auth = function(router, passport){

  var authArb = require('../arbiters/auth.js');
  var servicios = require('../config/servicios');


  router.post('/registro/local', passport.authenticate('registro-local', {
    successRedirect : '/auth/local', // enviar a completar perfil
    failureRedirect : '/registro' // redirigir a logueo en caso de fallo
  }));


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
      
      console.log('hacemos el registro', req);

      res.send("<h1>Vista de registro en server</h1>");
    

  });


  router.get('/logueado', authArb.estaLogueado, function(req, res){
      
      console.log('ingresamos', req);

      var servicios = require('../config/servicios');

      res.redirect( servicios.local.callbackURL + '/user/' + req.user.uid + '/' + req.user.token );
    

  });


  router.get('/auth/salir', authArb.estaLogueado, function(req, res){

      req.logout();

      var servicios = require('../config/servicios');

      res.redirect( servicios.local.callbackURL + '/ingresar');

  });


  router.get('/no-autorizado', function(req, res){

      res.json({error:true, message:'session_invalida'});

  });

  return router;


}




module.exports = auth;