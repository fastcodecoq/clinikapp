var token = require('../helpers/token.js');
var logger = require('../helpers/logs.js');

var auth = {
  estaLogueado :function (req, res, next){
    process.nextTick(function(){
      logger(req, function(err, log){
        if (req.isAuthenticated()) {
          // Usuario autenticado usando passport
          next();
        }
        else if(
          // Usuario autenticado usando tokens
          (req.query.token && req.query.uid) ||
            (req.body.token && req.body.uid) ||
              (req.params.token && req.params.uid)){
          var query = { 
            uid : req.body.me || req.query.uid || req.body.uid || req.params.uid,
            token : req.query.token || req.body.token || req.params.token
          };
          token.validar_token(query, function(err, credencial){
            if(err)
              return res.json({error:true, message: 'no_autorizado'});
            next();
          });
        }
        else
          return res.json({error:true, message: 'no_autorizado'});

      });    
    });
  },

noLogueado : function (req, res, next){

  var logger = require('../helpers/logs.js');    

  logger(req, function(err, log){

    console.log(log);

    if (!req.isAuthenticated())   
      return next();

    res.redirect('/logueado');

  });    


}

}


module.exports = auth;
