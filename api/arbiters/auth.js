
var auth = {
 
 estaLogueado :function (req, res, next){
    
     if (req.isAuthenticated())        
        {

           var usr = req.user;
           var utils = require('../helpers/utils.js');

           utils.validar_token(usr, function(err, credencial){

              if(err) return nex(err);

              next();

           })


        }
        else
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