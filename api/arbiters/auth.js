

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


module.exports = {
  estaLogueado : estaLogueado,
  noLogueado : noLogueado
};		  