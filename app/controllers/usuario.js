var usuarios = require('../models/usuario');
var should = require('should');
var mongoose = require('mongoose');

    

var usuario = {

 
      crear : function(datos, callback){ 

            if(!datos.should.type("object")) return false;            
            if(!callback.should.be.type("function")) return false;
      	     
            datos = this.sanitizar(datos); 

           
         // ========== validamos si el usuario existe ====== //

            this.existe(datos, function(err, exist){  // ....... este método se encuentra al final

              if(err)
                {
                  callback(err, exist);
                  return;
                }

         // ==== le damos el formato correcto al campo email, acorde al Schema usuarios ======= //

              if(datos.email)
               datos.email = { dir : datos.email};

 
         // ==== verifiamos si no existe el usuario, sino existe, lo creamos ======= //

              if(!exist)
               new usuarios(datos).save( callback );
              else
                callback(true, "usuario_existe"); 


            });

            

             return true;
            

       },

      eliminar : function(id, callback){  

            if(!id.should.type("string")) return false;            
      
          	usuarios.remove({_id:id}, callback); 

            return true;
            

      },

      actualizar : function(id, datos, callback){  

            if(!id.should.type("string")) return false;
            if(!datos.should.type("object")) return false;
            if(!callback.should.be.type("function")) return false;     

            console.log(id)  

            datos = this.sanitizar(datos);                                 
            
            if(datos.email)
               datos.email = { dir : datos.email};                                
      
      	    usuarios.findOneAndUpdate({_id : id}, datos, callback); 

            return true;
            

      },

      buscar : function(callback){  

            if(!callback.should.be.type("function")) return false; 
      
      	var rs = usuarios.find(callback); 

            return true;
            

      },
      
      buscarUno : function(id, callback){
        
        if(!id.should.type("string")) return false;        
        if(!callback.should.be.type("function")) return false; 

        usuarios.findOne({_id : id}, callback);

       
       return true;
         


      },

      // solo disponible para modo desarrollo 

      eliminarTodos : function(callback){

         usuarios.remove({}, callback);

         return true;

      },

    sanitizar : function(datos){

                var sanitizar = require('../helpers/sanitizador');
                                  

             // ... recorremos el objeto this que contiene las variables a enviar. 
          
              for(x in datos) 
                datos[x] = sanitizar.hacer(datos[x]);  // sanitizamos los valores
        
        
              console.log(datos);  // valores sanitizados
              
              datos._tipo_doc = mongoose.Types.ObjectId(datos._tipo_doc);
              datos._sexo = mongoose.Types.ObjectId(datos._sexo);

              return datos;

     },

     existe : function(datos, callback){  // valida si un usuario existe. Retorna error en el primer parametro y un boolean que indica si existe en el segundo parametro

           var validar = require('../helpers/validador');           
           var numero_doc = datos.numero_doc;


           if(!validar.cedula(numero_doc)) {             
             callback(true, "numero_doc_incorrecto");
             return false;
            };            

           usuarios.count({ numero_doc : numero_doc}, function(err, count){

                callback(err, count > 0);  //si count es igual a cero devolvemos false (no existe)

           });

           return true;

     }

      

}


module.exports = usuario;