
// ======= todas las rutas relacionadas con registro y login


var auth = function(router, passport){

  router.post('/registrar', passport.authenticate('registro-local', {
    successRedirect : '/perfil', // enviar a completar perfil
    failureRedirect : '/registrar' // redirigir a logueo en caso de fallo
  }));


  router.post('/auth/local', passport.authenticate('ingreso-local', {
    successRedirect : '/perfil', // enviar a completar perfil
    failureRedirect : '/ingresar' // redirigir a logueo en caso de fallo
  }));

  // esta ruta debería ir en las rutas de usuario :)

  router.get('/perfil', estaLogueado, function(req, res){
    if(!req.perfil_completado)
      res.redirect('/completar-peril');
    else
     res.json(req.user);
  });

  return router;



   function estaLogueado(req, res, next){
     if (req.isAuthenticated())   
        return next();
   
     res.redirect('/');
   }


}




module.exports = auth;