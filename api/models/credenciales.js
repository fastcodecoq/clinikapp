var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;



// ==== usaremos el caracter _ para diferenciar los campos que se relacionan a otras colecciones

// ............... es un helper para diferenciar facilmente que es un campo  populable

var credencialSchema = new Schema({

	_sistema_logueo : {type : Schema.Types.ObjectId, required : true, ref : 'sistemaLogueoSchema'}, 
	_usuario : {type : Schema.Types.ObjectId, ref : 'usuarioSchema'},   
	token : {type : String, required : true},
	email : {type : String, required : true},
	uid : {type : String, required : true},  //id del usuario en el sistema de logueo (google, outlook o yahoo)
  fecha : {type : Date, default: Date.now}
    
});





// ===================== mongoose middleware ====================================


// ... esto nos sirve para validar los datos que se ingresarán a la base de datos

credencialSchema.path('email').validate(function(datos){
   var validar = require('../helpers/validador.js');
   //verificamos si las variables contienen el formato adecuado...
   if(this.email)
    if(!validar.mail(this.email)) return false;  //validamos el email
  // como todo esta en orden, entonces retornamos positivo, para que guarde el documento
   return true;   
}, 'email invalido');

// ==========================================================



module.exports = mongoose.model('credenciales', credencialSchema);
