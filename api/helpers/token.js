
module.exports = function(){
	// validar_token:
	// ==============
	// retorna si el token es válido, si esto es cierto entonces aumenta de
	// nuevo su tiempo de creación
	validar_token : function(datos, listo) {
		var Credencial = require('../models/credenciales');          
		var Token      = require('../models/token');          
		if(!usr.uid || !usr.token)
			listo({error:true, message:'session_invalida'}, false);
		Token.findOne({token: datos.token},function(err, token){
		});
		Credencial.findOne(
			{uid : usr.uid , token : usr._token.token},
			function(err, credencial){ 
				// si no hay credencial
				if(err || !credencial) return listo(true, false);    
				// si el token no expira
				if(credencial.token_larga_vida) return listo(false, credencial);
				if(!self.token_expirado(credencial._token.fecha_creacion))
					return listo(true, false);
				else {
					ttl = require('../config/vars').ttl;
					var ahora = new Date();
					credencial._token.fecha_creacion =
						ahora.setMilliseconds(ahora.getMilliseconds() + ttl);
					credencial.save(listo);
				}
			});
	}
};
