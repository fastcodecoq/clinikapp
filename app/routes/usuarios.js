
var usuarios = function(router){

	   
	     var usrCtrl = require('../controllers/usuario.js');  // definimos el controlador a usar, en este caso el de usaurios
       var mongoose = require('mongoose');
       
       // ============== con el verbo HTTP Get Obtenemos todos los usuarios
       

      router.get('/usuarios', function (req, res){

			if ( ! usrCtrl.buscar(function (err, rs){

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

			if ( ! usrCtrl.buscarUno(id, function (err, rs){

                if(!err) 			 
  			    res.json({error:false, message: rs});     
  				else
			  	res.json({error:true, message: 'no hay usuario para mostrar'}); 

 
			  }) ) res.json({ error:true, message: 'parametros no validos'}) ; 
			      
			
		  });

       
       // ======================================================================



       // ============== con el verbo HTTP Delete con parametro id, eliminamos un usuario


        router.delete('/usuarios/:id', function (req, res) {
         	   	 
         	   	 var id = req.params.id || req.body.id;


         		if( ! usrCtrl.eliminar( id, function (err, rs){

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
         	 	 var datos = req.body;

         		 if ( ! usrCtrl.actualizar( id, datos, function (err, rs){

         		    if(!err) 			 
  			         res.json({error:false, message: "ok"});     
  				      else
			       	   res.json({error:true, message: 'no se puede modificar el usuario'}); 


         		 }) ) res.json({ error:true, message: 'parametros no validos'}) ;

         });

       // ======================================================================



       // ============== con el verbo HTTP Post creamos un usuario


    	 router.post('/usuarios', function (req, res){    	 	               
          
          
         var datos = usrCtrl.sanitizar(req.body);
                  

			  if ( ! usrCtrl.crear(datos, function (err, rs){

			  	 if(!err)			  	
			  	 res.json({error:false, message: 'ok'}); 
			  	 else
			  	 res.json({error:true, message: err}); 

			  	 
			   }) ) res.json({ error:true, message: 'parametros no validos'}) ;
			 						          
			
			});




        router.post('/usuarios/registro', function (req, res){
               
               var regCtrl = require('../controllers/registro.js');               

               var datos = usrCtrl.sanitizar(req.body);
        
               
              
              if ( ! regCtrl.crear(datos, function (err, doc){
              
                if(!err)         
                  {
                     // como no hay error procedemos a instaciar credenciales y sistema de logueo
                     // tener en cuenta que los datos para instanciar dichas entidades son enviados desde el cliente

                     //incluimos modelos de credenciales y sistemas de logueo para conseguir el objetivo


                      
                  }
                else
                  res.json({error:true, message: err}); 
                  
              
                 }) ) res.json({ error:true, message: 'parametros no validos'}) ;

        });





    	 // ============== con el verbo HTTP Delete eliminamos los usaurios

    	 // ============== esto solo estará disponible en modo de desarrollo ===============


        router.delete('/usuarios', function (req, res) {
         	   	 
         	   	 var id = req.body.id || req.params;

         		if( ! usrCtrl.eliminarTodos(function (err, rs){

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
