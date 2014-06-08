
var base = function(router){


		  // ========= Arbitro base: Este arbitro se ejecuta primero que todos.
		  // ========= En este controlaremos el acceso al api en el primer nivel

		  
		   router.use(require('../arbiters/base.js'));

		   
		   router.get('/', function(req, res){
			
			  res.json({error:false, message:'Bienvenid@ a nuestra API'});
			
			});



		    // ===================== easter eggs  =====================

			
			router.get('/hola', function(req, res){
			
			  res.json({error:false, message:'Hola como estas?'});
			
			});
			
			router.get('/soy/:nombre', function(req, res){
			
			  res.json({error:false, message:'Bienvenid@ a nuestra API ' + nombre});         
			
			});
			


			

            // ============================= incluimos las rutas basicas ===================


			router = require('./usuarios')(router); //iniciamos las rutas para los usuarios


			// ================================= requires =================================



			


			router.get('*', function(req, res) {
  			   	
			  res.json({error:true, message:'La petición no es valida'});           			   	

            });


            
            console.log('rutas iniciadas');


			
			return router;  // siempre se retorna el router 

}


module.exports = base;