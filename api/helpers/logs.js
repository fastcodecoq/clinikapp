var log = function(req, listo){


					if(typeof req != 'object')
						return listo(true, false, 'params_invalidos');


	                var Log = require('../models/logs.js');
					
					var san = require('./sanitizador');
					
					var datos = { 
					ip : req.connection.remoteAddress,
					accion : req.url || 'desconido'
					};
					
					if(req.user )
				     datos.uid = san.hacer(req.user.uid);
				    else if(req.query)
				     datos.uid = san.hacer(req.query.uid);
				    else if(req.params)
				     datos.uid = san.hacer(req.params.uid);
				    else if(req.body)
				     datos.uid = san.hacer(req.body.uid);				   				   											
					else
				      datos.uid = 'desconido';

					datos.accion = san.hacer(datos.accion);
					
					
				   if(!require('./validador').ip(datos.ip))
					  san.hacer(datos.ip);
				
					
				    var log = new Log(datos);

					 log.save(function(err, log){
					 	if(err) return listo(err, false);

					 	listo(null, log);
					 });



}


module.exports = log;