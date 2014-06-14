// API V1

var usuario = {
 
     info : function(uids, listo){

     	var Credencial = require('../../models/credenciales');
		var utils = require('../../helpers/utils');

	  if(utils.valida_permisos(uids, ['info_basica']))
		Credencial.findOne({uid : uids.uid})
		.populate('_usuario')
		.exec(listo); 
	  else
	   return listo(true, false, 'no_autorizado');    	

     }

};


module.exports = usuario;