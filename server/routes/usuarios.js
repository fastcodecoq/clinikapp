
var usuarios = function(router){

	   
	   var ctrl = require('../controllers/usuario.js');  // definimos el controlador a usar, en este caso el de usaurios
       var mongoose = require('mongoose');
       
       // ============== con el verbo HTTP Get Obtenemos todos los usuarios
       

       router.get('/usuarios', function (req, res){

			if ( ! ctrl.buscar(function (err, rs){

                if(!err) 			 
  			    res.json({error:false, message: rs});     
  				else
			  	res.json({error:true, message: 'no hay usuarios para mostrar'}); 

 
			  }) ) res.json({ error:true, message: 'parametros no validos'}) ; 
			      
			
		  });


       // ======================================================================


       // ============== con el verbo HTTP Get pasando el id como param obtenemos un usuario


        router.get('/usuarios/:id', function (req, res){

        	var id = req.params.id;

			if ( ! ctrl.buscarUno(id, function (err, rs){

                if(!err) 			 
  			    res.json({error:false, message: rs});     
  				else
			  	res.json({error:true, message: 'no hay usuario para mostrar'}); 

 
			  }) ) res.json({ error:true, message: 'parametros no validos'}) ; 
			      
			
		  });

       
       // ======================================================================



       // ============== con el verbo HTTP Delete con parametro id, eliminamos un usuario


         router.delete('/usuarios/:id', function (req, res) {
         	   	 
         	   	 var id = req.params.id;


         		if( ! ctrl.eliminar( id, function (err, rs){

         		    if(!err) 			 
  			         res.json({error:false, message: "ok"});     
  				    else
			       	 res.json({error:true, message: 'no se puede eliminar el usuario'}); 


         		 }) ) res.json({ error:true, message: 'parametros no validos'}) ;

         }); 

       // ======================================================================


       
       // ============== con el verbo HTTP Put actualizamos / modificamos un usuario (trabaja como el POST)


         router.put('/usuarios/:id', function (req, res){

         	 	 var id = req.params.id;
         	 	 var datos = req.params.datos;

         		 if ( ! ctrl.actualizar( id, datos, function (err, rs){

         		    if(!err) 			 
  			         res.json({error:false, message: "ok"});     
  				    else
			       	 res.json({error:true, message: 'no se puede modificar el usuario'}); 


         		 }) ) res.json({ error:true, message: 'parametros no validos'}) ;

         });

       // ======================================================================



       // ============== con el verbo HTTP Post creamos un usuario


    	 router.post('/usuarios', function (req, res){

    	 	      

			var sanitizar = require('../helpers/sanitizar.js');
					

			var datos = {
				
					nombres : '<div onhover="alert("hey")">Javier,Arturo</div>',
					apellidos : 'Gomez,Mora',
					numero_doc : 1103094999,
					_tipo_doc : mongoose.Types.ObjectId('5391a6e6a7143cdf4d0585a0'),
					_sexo : mongoose.Types.ObjectId('5391a6e6a7143cdf4d0585a0'),
					divipola : '005,05',
		     		telefono : '3015734372',
				    email : 'info@gomosoft.com'
				
				};


			// ... recorremos el objeto this que contiene las variables a enviar. 
					
					for(x in datos) 
					 datos[x] = sanitizar.hacer(datos[x]);  // sanitizamos los valores
        
				
				console.log(datos);  // valores sanitizados


			  if ( ! ctrl.crear(datos, function (err, rs){

			  	 if(!err)			  	
			  	 res.json({error:false, message: 'ok'}); 
			  	 else
			  	 res.json({error:true, message: 'no se pudo registrar'}); 

			  	 
			   }) ) res.json({ error:true, message: 'parametros no validos'}) ;
			 						          
			
			});





    	 // ============== con el verbo HTTP Delete eliminamos los usaurios

    	 // ============== esto solo estará disponible en modo de desarrollo ===============


         router.delete('/usuarios', function (req, res) {
         	   	 
         	   	 var id = req.params.id;

         	   	 console.log(id);

         		if( ! ctrl.eliminarTodos(function (err, rs){

         		    if(!err) 			 
  			         res.json({error:false, message: "se han eliminado los usuarios"});     
  				    else
			       	 res.json({error:true, message: 'no se puede eliminar el usuario'}); 


         		 }) ) res.json({ error:true, message: 'parametros no validos'}) ;

         }); 

       // ======================================================================





    	return router; // siempre se retorna el router 

}






module.exports = usuarios;
