
var usuarios = function(router){

	   
	     var usrCtrl = require('../controllers/usuario');  // definimos el controlador a usar, en este caso el de usaurios
       var mongoose = require('mongoose');
       var arbAuth = require('../arbiters/auth');

     
      // ========== Hacemos todos los controles de seguridad necesarios
      // ========== usamos el arbitro de usuarios

       
       // ============== con el verbo HTTP Get Obtenemos todos los usuarios      


      router.get('/usuarios', arbAuth.estaLogueado ,function (req, res){


			if ( ! usrCtrl.buscar( function (err, rs){  //

         if(!err) 			 
  			    res.json({error:false, message: rs});     
  				else
			  	  res.json({error:true, message: 'sin_registros'});   // sin_registros es una llave de referencia del mensaje de error.

 
			  }) ) res.json({ error:true, message: 'params_invalidos'}) ; 
			      
			
		  });




 router.get('/credenciales', function (req, res){

    var credencialesCtrl = require('../controllers/credencial');

      if ( ! credencialesCtrl.buscar( function (err, rs){  //

         if(!err)        
            res.json({error:false, message: rs});     
          else
            res.json({error:true, message: 'sin_registros'});   // sin_registros es una llave de referencia del mensaje de error.

 
        }) ) res.json({ error:true, message: 'params_invalidos'}) ; 
            
      
      });


      // ruta para obtener los usuarios hasta cierto limite
       // se reciben las variables limit y skip

       //  /usuarios/limit/1  || /usuarios/limit/1/2(skip)

      router.get('/usuarios/limit/:limit/:skip\?', function (req, res){

        var validar = require('../helpers/validador');


        var delim = {};
            delim['limit'] = req.params.limit || false;
            delim['skip'] = req.params.skip || false;
       

       if(!validar.int(delim['limit']))   
       {
        res.json({error:true,message:'params_invalidos'});
        return;
       }


       if ( ! usrCtrl.buscar( delim , function (err, rs){  //

         if(!err)        
            res.json({error:false, message: rs});     
          else if(err.message)
          res.json({error:true, message: err.message});   // sin_registros es una llave de referencia del mensaje de error.
          else
          res.json({error:true, message: 'error_desconocido'});  

 
        }) ) res.json({ error:true, message: 'params_invalidos'}) ; 
            
      
      });


       // ======================================================================


       // ============== con el verbo HTTP Get pasando el id como param obtenemos un usuario


      router.get('/usuarios/:id', function (req, res){

        	var id = req.params.id;

			if ( ! usrCtrl.buscarUno(id, function (err, rs){

          if(!err) 			 
  			    res.json({error:false, message: rs});     
  				else
			  	res.json({error:true, message: 'sin_registros'}); 

 
			  }) ) res.json({ error:true, message: 'params_invalidos'}) ; 
			      
			
		  });

       
       // ======================================================================



       // ============== con el verbo HTTP Delete con parametro id, eliminamos un usuario


        router.delete('/usuarios/:id', function (req, res) {
         	   	 
         	   	 var id = req.params.id || req.body.id;


         		if( ! usrCtrl.eliminar( id, function (err, rs){

         		  if(!err) 			 
  			         res.json({error:false, message: 'ok'});     
  				    else
			       	   res.json({error:true, message: 'no_eliminado'}); 


         		 }) ) res.json({ error:true, message: 'params_invalidos'}) ;

         }); 

       // ======================================================================


       
       // ============== con el verbo HTTP Put actualizamos / modificamos un usuario (trabaja como el POST)


        router.put('/usuarios/:id', function (req, res){

         	 	 var id = req.params.id;
         	 	 var datos = req.body;

         		 if ( ! usrCtrl.actualizar( id, datos, function (err, rs){

         		    if(!err) 			 
  			         res.json({error:false, message: 'ok'});     
  				      else
			       	   res.json({error:true, message: 'no_editable'}); 


         		 }) ) res.json({ error:true, message: 'params_invalidos'}) ;

         });

       // ======================================================================



       // ============== con el verbo HTTP Post creamos un usuario


    	 router.post('/usuarios', function (req, res){    	 	               
                   
         var datos = req.body;
                  

            
                if ( ! usrCtrl.crear(datos, function(err, rs, llave_err){

                   if(typeof llave_err  === 'string')       // verificamos si rs es un string, ya que se retorna un String en caso de que el error no sea de base de datos    
                     res.json({error:true, message : llave_err});
                   else if(!err)
                          res.json({error:false,message:'ok'});
                   else
                          res.json({error:true, message : 'params_invalidos'});                                     


                  }) ) res.json({error:true, message : 'params_invalidos'}); 

			 						          
			
			  });


       router.post('/credenciales', function (req, res){                       
                   
         var datos = req.body;
                  
        var credencialesCtrl = require('../controllers/credencial');
            
                if ( ! credencialesCtrl.crear(datos, function(err, rs, llave_err){

                   if(typeof llave_err  === 'string')       // verificamos si rs es un string, ya que se retorna un String en caso de que el error no sea de base de datos    
                     res.json({error:true, message : llave_err});
                   else if(!err)
                          res.json({error:false,message:'ok'});
                   else
                          res.json({error:true, message : 'params_invalidos'});                                     


                  }) ) res.json({error:true, message : 'params_invalidos'}); 
                         
      
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
                  res.json({error:true, message: datos}); //como hubo un error retornamos lo que recibimos, para procesar en el cliente que errores hay en los datos
                  
              
                 }) ) res.json({ error:true, message: 'params_invalidos'}) ;

        });




   

    
    	 // ============== con el verbo HTTP Delete eliminamos los usaurios

    	 // ============== esto solo estará disponible en modo de desarrollo ===============


        router.delete('/usuarios', function (req, res) {
         	   	 
         	   	 var id = req.body.id || req.params;

         		if( ! usrCtrl.eliminarTodos(function (err, rs){

         		    if(!err) 			 
  			         res.json({error:false, message: 'ok'});     
  				    else
			       	   res.json({error:true, message: 'no_eliminable'}); 


         		 }) ) res.json({ error:true, message: 'params_invalidos'}) ;

         }); 

       // ======================================================================





    	return router; // siempre se retorna el router 

}






module.exports = usuarios;
