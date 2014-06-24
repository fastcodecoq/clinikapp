var utils = require('./utils');
var mongo = require('mongoose');
    

module.exports = {
	// validar_token:
	// ==============
	// retorna si el token es válido, si esto es cierto entonces aumenta de
	// nuevo su tiempo de creación
	validar_token : function(usr, listo) {
		var Credencial = require('../models/credenciales');          
		var Token      = require('../models/token');          
		
		if(!usr.uid || !usr.token)
			listo({error:true, message:'session_invalida'}, false);

		Token.findOne({token: usr.token}, function(err, token){	


			 Credencial.findOne({_id :  token._credencial}, function(err, credencial){

			 	if(err) return listo({error:true, message:'session_invalida'}, false);
			 	if(!credencial) return listo({error:true, message:'session_invalida'}, false);
				if(Token.expiro(token.time)) return listo({error:true, message:'session_invalida'}, false);

				token.time = utils.strtotime('+1 hours');

				token.save(function(err, token){
			 	   
			 	   if(err) return listo({error:true, message:'session_invalida'}, false);					
				   
				   listo(false, token);

				});


			 })

				
		});
		
	}
};
