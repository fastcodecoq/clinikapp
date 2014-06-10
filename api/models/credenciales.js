var mongoose  =  require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema  =  mongoose.Schema;

// ==== usaremos el caracter _ para diferenciar los campos que se relacionan a otras colecciones

// ............... es un helper para diferenciar facilmente que es un campo  populable

var credencialSchema = new Schema({
  
  _sistema_logueo : {type : Schema.Types.ObjectId, required : true, ref : 'sistemaLogueoSchema'},
  _usuario : {type : Schema.Types.ObjectId, ref : 'usuarioSchema'},
  token : {type : String, required : true},
  email : {type : String, required : true},
  uid : {type : String, required : true},  //id del usuario en el sistema de logueo (google, outlook o yahoo)
  fecha : {type : Date, default: Date.now},
  clave : String,
  perfil_completado : {type : Boolean, default : false} // solo en la eventualidad de que el registro sea local, lo cambiaremos a true

});

// ===================== mongoose middleware ====================================




// ... esto nos sirve para validar los datos que se ingresarán a la base de datos

credencialSchema.path('email').validate(function(datos){
  
   var validar = require('../helpers/validador');
   //verificamos si las variables contienen el formato adecuado...
   if(this.email)
    if(!validar.mail(this.email)) return false;  //validamos el email
  // como todo esta en orden, entonces retornamos positivo, para que guarde el documento
   return true;

}, 'email invalido');

// ==========================================================



// encriptamos y agregamos saltos a la conrtraseña con un metodo sincronico
credencialSchema.methods.genHash = function(clave) {

    return bcrypt.hashSync(clave, bcrypt.genSaltSync(8), null);
    
};


//comparamos claves con metodos sincronicos

credencialSchema.methods.compararClaves = function(clave) {

  console.log(this)

   return bcrypt.compareSync(clave, this.clave);

};




module.exports = mongoose.model('credenciales', credencialSchema);
