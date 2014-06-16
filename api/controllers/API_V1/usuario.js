// API V1

var usuario = {
 
     info : function(uids, listo){

     	var Credencial = require('../../models/credenciales');
		var utils = require('../../helpers/utils');

	  if(utils.valida_permisos(uids, ['info_basica']))
		Credencial.findOne({uid : uids.uid})
		.populate('_usuario')		
		.exec(function(err, credencial){

		   if(err) listo(err, false);


       	  var UsrOrg = require('../../models/usuario_organizacion');

       	   console.log('_id',credencial._usuario._id)

       	   UsrOrg.findOne({_usuario : credencial._usuario._id})       	      
       	      .exec(function(err, orgs){

					if(err) listo(err, false);

					var usr = credencial._usuario;
					delete usr['organizaciones'];

					var usuario = {
						 
						 info : usr,
						 organizaciones : orgs

					};					    
					
				
					
					listo(null, usuario);

       	      });

		}); 
	  else
	   return listo(true, false, 'no_autorizado');    	

     }

};


module.exports = usuario;