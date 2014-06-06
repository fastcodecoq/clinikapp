var usuarios = require('../models/usuario.js');
var onPolicy = usuarios
var should = require('should');
var mongoose = require('mongoose');

    

var usuario = {

 
      crear : function(datos, callback){ 

            if(!datos.should.type("object")) return false;            
            if(!callback.should.be.type("function")) return false;
      	
      	new usuarios(datos).save( callback ); 

            return true;
            

       },

      eliminar : function(id){  

            if(!id.should.type("string")) return false;            
      
      	usuarios.remove({_id:id}, callback); 

            return true;
            

      },

      actualizar : function(id, datos, callback){  

            if(!id.should.type("string")) return false;
            if(!datos.should.type("object")) return false;
            if(!callback.should.be.type("function")) return false;                            
      
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

      }

      

}


module.exports = usuario;