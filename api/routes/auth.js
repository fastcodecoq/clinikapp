
// ======= todas las rutas relacionadas con registro y login



var auth = function(router, passport){

  var authArb = require('../arbiters/auth.js');

  router.post('/registro/local', passport.authenticate('registro-local', {
    successRedirect : '/auth/local', // enviar a completar perfil
    failureRedirect : '/registrar' // redirigir a logueo en caso de fallo
  }));


  router.post('/auth/local', passport.authenticate('ingreso-local', {
    successRedirect : '/logueado', // enviar a completar perfil
    failureRedirect : '/ingresar' // redirigir a logueo en caso de fallo
  }));

 
  // servicios de login externos ==============================

  
  router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


  router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect : '/logueado', // enviar a completar perfil
    failureRedirect : '/ingresar' // redirigir a logueo en caso de fallo
  }));
  

  // ----- Outlook

  router.get('/auth/outlook', passport.authenticate('google', { scope : ['profile', 'email'] }));


  router.get('/auth/outlook/callback', passport.authenticate('google', {
    successRedirect : '/logueado', // enviar a completar perfil
    failureRedirect : '/ingresar' // redirigir a logueo en caso de fallo
  }));


  // ----- Yahoo


  router.get('/auth/yahoo', passport.authenticate('google', { scope : ['profile', 'email'] }));


  router.get('/auth/yahoo/callback', passport.authenticate('google', {
    successRedirect : '/logueado', // enviar a completar perfil
    failureRedirect : '/ingresar' // redirigir a logueo en caso de fallo
  }));


 // servicios de login externos ==============================


  router.get('/ingresar', authArb.noLogueado, function(req, res){
    console.log(req.user, res)
  });

  // esta ruta debería ir en las rutas de usuario :)

  router.get('/logueado', authArb.estaLogueado, function(req, res){
      
      console.log('ingresamos', req);

      res.json({error : false, message : req.user});
    

  });


  router.get('/salir', authArb.estaLogueado, function(req, res){

      req.logout();

      res.json({error:false, message:'session_cerrada'});

  });

  return router;


}




module.exports = auth;