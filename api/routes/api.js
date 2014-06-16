//api v1



function api(router){

		var authArb = require('../arbiters/auth.js');
		var servicios = require('../config/servicios');


        router.get('/v1/users/:user', authArb.estaLogueado, function(req, res){				
				
			  var uids = req.params.user === 'me' ? { uid : req.query.uid || req.user.uid, _uid : req.query.uid || req.user.uid} : {uid : req.params.user , _uid : req.query.uid || req.user.uid};

			  	console.log(uids);

			  require('../controllers/API_V1/usuario').info(uids, function(err, usuario, err_){
						
						if(err) return res.json({error:true, message: err_ || 'sin_registros'});

						res.json({error:false,message:usuario});

				});   


           });


        // ===== Organizaciones

        router.get('/v1/users/:user/organizaciones/:org\?', authArb.estaLogueado, function(req, res){				
					
				// obtener organizaciones

			  var uids = req.params.user === 'me' ? { uid : req.query.uid || req.user.uid, _uid : req.query.uid || req.user.uid} : {uid : req.params.user , _uid : req.query.uid || req.user.uid};				 

			  	 console.log(uids);
			  	 var org = require('../controllers/API_V1/organizacion');

			  	 if(req.params.org || req.query.params)
			  	    uids.org =  req.params.org || req.query.params;

			     org.info(uids, function(err, organizacion, err_){

			     	if(err) return res.json({error:true, message: err_ || 'sin_registros'});

			     		organizacion.total = organizacion.length;
						res.json({error:false,message:organizacion});

			     });


           });


        router.post('/v1/users/:uid/organizaciones/:token/:user\?', authArb.estaLogueado, function(req, res){				
					
				// crer organizaciones

				var uids = req.params.uid === 'me' ? { uid : req.body.me || req.user.uid, _uid : req.body.me || req.user.uid} : {uid : req.params.user , _uid : req.body.me};				 

			  	 console.log(uids);

			  	 var org = require('../controllers/API_V1/organizacion');
			  	     org.init(uids.uid);

			  	  org.crear(uids, req.body,function(err, organizacion, err_){

			     	if(err || !organizacion) return res.json({error:true, message: err_ || 'sin_registros'});

						res.json({error:false, message: organizacion });

			     });


           });


        router.put('/v1/users/:user/organizaciones', authArb.estaLogueado, function(req, res){				
					
				// actualizar organizaciones

           });


        router.delete('/v1/users/:user/organizaciones/:org\?', authArb.estaLogueado, function(req, res){				
					
				// eliminar organizaciones

			  var uids = req.params.user === 'me' ? { uid : req.query.uid || req.user.uid, _uid : req.query.uid || req.user.uid} : {uid : req.params.user , _uid : req.query.uid || req.user.uid};				 

			  	 console.log(uids);
			  	 var org = require('../controllers/API_V1/organizacion');

			  	 if(req.params.org || req.query.params)
			  	    uids.org =  req.params.org || req.query.params;

			     org.eliminar(uids, function(err, organizacion, err_){

			     	if(err || !organizacion ) return res.json({error:true, message: err_ || 'no_eliminado'});

						res.json({error:false, message : organizacion > 0 ? 'eliminado' : 'no_eliminado'  });

			     });



           });



        // ======= angendas


         router.get('/v1/users/:user/agendas', authArb.estaLogueado, function(req, res){				
					
				// obtener agendas

           });


        router.post('/v1/users/:user/agendas', authArb.estaLogueado, function(req, res){				
					
				// crer agendas

           });

        router.put('/v1/users/:user/agendas', authArb.estaLogueado, function(req, res){				
					
				// actualizar agendas

           });


        router.delete('/v1/users/:user/agendas', authArb.estaLogueado, function(req, res){				
					
				// eliminar agendas

           });





		return router;

}



module.exports = api;

