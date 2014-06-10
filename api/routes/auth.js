
// ======= todas las rutas relacionadas con registro y login


var auth = function(router)

  router.post('/registrar', passport.authenticate('registro-local', {
    successRedirect : '/perfil', // enviar a completar perfil
    failureRedirect : '/registrar', // redirigir a registro en caso de fallo
  }));


  router.post('/auth/ingresar', passport.authenticate('ingreso-local', {
    successRedirect : '/perfil', // enviar a completar perfil
    failureRedirect : '/ingresar', // redirigir a registro en caso de fallo
  }));



  // esta ruta debería ir en las rutas de usuario :) 

  router.get('/perfil', estaLogueado, function(req, res){
    res.json(req.user);
  });

  return router;

}



module.exports = auth;