var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;
var should = require('should');



// ==== usaremos el caracter _ para diferenciar los campos que se relacionan a otras colecciones

// ............... es un helper para diferenciar facilmente que es un campo  populable

var usuarioSchema = new Schema({

	nombres : {type : String, required : true},
	apellidos : {type : String, required: true},
	numero_doc : {type : Number, required : true},
	_tipo_doc : {type : Schema.Types.ObjectId, required : true},
	_sexo : {type : Schema.Types.ObjectId, required : true},
	divipola : {type : String, required : true},
	telefono : String,
	email : String

});



// ===================== mongoose middleware ====================================


// ... esto nos sirve para validar los datos que se ingresarán a la base de datos

 usuarioSchema.path('nombres').validate(function(datos){

  
 
   //verificamos si las variables contienen el formato adecuado...


   if(this.telefono)   
    if(!/[0-9]/g.test(this.telefono)) return false;  //validamos el telefono

   if(this.email)
    if(!/(.+)@(.+)\.(.+)/g.test(this.email)) return false;  //validamos el email



  // como todo esta en orden, entonces retornamos positivo, para que guarde el documento
   
   return true;   

 
}, 'parametros invalidos'); 



// ==========================================================



module.exports = mongoose.model('usuarios', usuarioSchema);