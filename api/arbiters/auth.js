
var auth = {
 
 estaLogueado :function (req, res, next){


     if (req.isAuthenticated())        
        return next();
   
     res.json({error:true, message: 'no_autorizado'});

   }

  ,

  noLogueado : function (req, res, next){
     if (!req.isAuthenticated())   
       return next();

     res.redirect('/logueado');
   }

 }


module.exports = auth;