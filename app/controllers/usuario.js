var usuarios = require('../models/usuario');
var should = require('should');
var mongoose = require('mongoose');

    

var usuario = {

 
      crear : function(datos, callback){ 

            if(!datos.should.type("object")) return false;            
            if(!callback.should.be.type("function")) return false;
      	     
            datos = this.sanitizar(datos); 

            if(datos.email)
               datos.email = { dir : datos.email};

          
           	 new usuarios(datos).save( callback ); 

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

     }

      

}


module.exports = usuario;