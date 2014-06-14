
var auth = {
 
 estaLogueado :function (req, res, next){
   
    
     if (req.isAuthenticated())        
        {

           var usr = req.user;
           var utils = require('../helpers/utils.js');

           utils.validar_token(usr, function(err, credencial){

              if(err){ 
                 req.logout();
                 return next(err);
               }

              next();

           })


        }
        else if((req.query.token && req.query.uid) || (req.body.token && req.body.uid) || (req.params.token && req.params.uid)){
           
            var utils = require('../helpers/utils.js');   
            var query = { uid : req.body.me || req.query.uid || req.body.uid || req.params.uid, token : req.query.token || req.body.token || req.params.token};
            console.log(query);

            utils.validar_token(query, function(err, credencial){

                if(err) return res.json({error:true, message: 'no_autorizado'});

                next();

            });

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