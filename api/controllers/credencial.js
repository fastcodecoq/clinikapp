var credenciales = require('../models/credencial');
var should = require('should');
var mongoose = require('mongoose');

    

var credencial = {

 
      crear : function(datos, callback){ 

            if(!datos.should.type("object")) return false;            
            if(!callback.should.be.type("function")) return false;
      	     
            datos = this.sanitizar(datos); 

           
         // ========== validamos si la credencial existe ====== //

            this.existe(datos, function(err, exist){  // ....... este método se encuentra al final

              if(err)
                {
                  callback(err, exist);
                  return;
                }

 
         // ==== verifiamos si no existe la credencial, sino existe, lo creamos ======= //

              if(!exist)
               new credenciales(datos).save( callback );
              else
                callback(true, "usuario_existe"); 


            });

            

             return true;
            

       },

      eliminar : function(id, callback){  

            if(!id.should.type("string")) return false;            
      
          	credenciales.remove({_id: mongoose.Types.ObjectId(id)}, callback); 

            return true;
            

      },

      actualizar : function(id, datos, callback){  

            if(!id.should.type("string")) return false;
            if(!datos.should.type("object")) return false;
            if(!callback.should.be.type("function")) return false;     

            datos = this.sanitizar(datos);                                 
                                          
      
      	    credenciales.findOneAndUpdate({_id : mongoose.Types.ObjectId(id)}, datos, callback); 

            return true;
            

      },

      buscar : function(callback){  

            if(!callback.should.be.type("function")) return false; 
      
      	var rs = credenciales.find(callback); 

            return true;
            

      },
      
      buscarUno : function(id, callback){
        
        if(!id.should.type("string")) return false;        
        if(!callback.should.be.type("function")) return false; 

        credenciales.findOne({_id : mongoose.Types.ObjectId(id)}, callback);  // usamos mongoose.Types.ObjectId para compilar el id, evitando que nos coloquen otro tipo de variable

       
       return true;
         


      },

      // solo disponible para modo desarrollo 

      eliminarTodos : function(callback){

         credenciales.remove({}, callback);

         return true;

      },

      sanitizar : function(datos){

                var sanitizar = require('../helpers/sanitizador');
                                  

             // ... recorremos el objeto this que contiene las variables a enviar. 
          
              for(x in datos) 
                datos[x] = sanitizar.hacer(datos[x]);  // sanitizamos los valores
        
        
              console.log(datos);  // valores sanitizados
              
              datos._id_usuario = mongoose.Types.ObjectId(datos._id_usuario);
              datos._id_sistema_logueo = mongoose.Types.ObjectId(datos._id_sistema_logueo);

              return datos;

     },

     existe : function(datos, callback){  // valida si un usuario existe. Retorna error en el primer parametro y un boolean que indica si existe en el segundo parametro

           var validar = require('../helpers/validador');                      
           var id_usuario = datos.id_usuario;

          // contamos los credenciales existentes 

           credenciales.count({  _id_usuario : mongoose.Types.ObjectId(id_usuario)}, function(err, count){

                callback(err, count > 0);  //si count es igual a cero devolvemos false (no existe)

           });

           return true;

     }

      

}


module.exports = credencial;