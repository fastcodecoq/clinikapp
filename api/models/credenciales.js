var mongoose  =  require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema  =  mongoose.Schema;

// ==== usaremos el caracter _ para diferenciar los campos que se relacionan a otras colecciones

// ............... es un helper para diferenciar facilmente que es un campo  populable

var credencialSchema = new Schema({
  _id_sistema_logueo : {type : Schema.Types.ObjectId, required : true, ref : 'sistemaLogueoSchema'},
  _usuario : {type : Schema.Types.ObjectId, ref : 'usuarioSchema'},
  token : {type : String, required : true},
  email : {type : String, required : true},
  uid : {type : String, required : true},  //id del usuario en el sistema de logueo (google, outlook o yahoo)
  fecha : {type : Date, default: Date.now},
  password : String
});

// ===================== mongoose middleware ====================================


// encriptamos la contraseña, asignamos un salt
credencialSchema.pre('save', function(next) {
  var credencial = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
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
