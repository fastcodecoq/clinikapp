
// ======= todas las rutas relacionadas con registro y login


var auth = function(router, passport){

  router.post('/registro/local', passport.authenticate('registro-local', {
    successRedirect : '/auth/local', // enviar a completar perfil
    failureRedirect : '/registrar' // redirigir a logueo en caso de fallo
  }));


  router.post('/auth/local', passport.authenticate('ingreso-local', {
    successRedirect : '/logueao', // enviar a completar perfil
    failureRedirect : '/ingresar' // redirigir a logueo en caso de fallo
  }));


  router.get('/ingresar', noLogueado, function(req, res){
    console.log(req.user, res)
  });

  // esta ruta debería ir en las rutas de usuario :)

  router.get('/logueado', estaLogueado, function(req, res){
      
      console.log('ingresamos', req);


      res.json({error : false, message : req.user});
    

  });


  router.get('/salir', estaLogueado, function(req, res){

      req.logout();

      res.json({error:false, message:'session_cerrada'});

  });

  return router;



   function estaLogueado(req, res, next){
     if (req.isAuthenticated())   
        return next();
   
     res.redirect('/');
   }

   // esto lo usamos para cuando el user va a la pgina de login
   // si ya esta logueado lo regresamos a su dashboard

   function noLogueado(req, res, next){
     if (!req.isAuthenticated())   
        return next();
   
     res.redirect('/logueado');
   }


}




module.exports = auth;