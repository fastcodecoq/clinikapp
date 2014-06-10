var credenciales = require('../models/credenciales');
var should = require('should');
var mongoose = require('mongoose');


var credencial = {


  existe : function(datos, callback){  // valida si un usuario existe. Retorna error en el primer parametro y un boolean que indica si existe en el segundo parametro
   
    var validar = require('../helpers/validador');
    
     this.sanitizar(datos);
    
    // contamos los credenciales existentes

    console.log(datos)

    credenciales.count( datos, function(err, count){
       callback(err, count > 0); 
    });
  },

  crear : function(datos, callback){
    if(datos.should.type("object") && callback.should.be.type("function")) {
      datos = this.sanitizar(datos);
      console.log(datos);
      // ========== validamos si la credencial existe ====== //
      this.existe(datos, function(err, exist){  // ....... este método se encuentra al final
        if(exist) {
          // ==== verifiamos si no existe la credencial, sino existe, lo creamos ======= //
          callback({message: 'credencial_existe'}, null);
        } else{
          console.log(datos);
          credenciales.create(datos, callback);
        }
      });
    } else {
      callback({message:'parametros_incorrectos'}, null);
    }
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

      buscar : function(opts, callback){

            if(typeof opts === 'function')
               {var callback = opts; var opts = undefined; }

            if(!callback.should.be.type("function")) return false;


            var sanitizar = require('../helpers/sanitizador');

            var opts = opts || {};  //miramos por las opts

            var query = opts.query  || {};     // miramos si está definido un query

            var variables = opts.variables || {};  // miramos si se han especificado tomar unas variables especificas

             //sanitizamos las variables del query
             for(x in query)
                query[x] = sanitizar(query[x]);


            credenciales.find(
                          query,
                          variables,
                          { skip : parseInt(opts.skip) || 0 , limit : parseInt(opts.limit) || 0},
                          callback
                         );


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

              if(datos._usuario)
              datos._usuario = mongoose.Types.ObjectId(datos._usuario);

              if(datos._sistema_logueo)
              datos._sistema_logueo = mongoose.Types.ObjectId(datos._sistema_logueo);

              return datos;

     },




}


module.exports = credencial;
