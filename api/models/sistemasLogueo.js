var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;

// ==== usaremos el caracter _ para diferenciar los campos que se relacionan a otras colecciones

// ............... es un helper para diferenciar facilmente que es un campo  populable

var sistemaLogueoSchema = new Schema({
  nombre : {type : String, required : true}, 
  key : {type : String, required : true}, //app key del sistema de logueo   
  secret : {type : String, required : true}, //app secret del sistema de logueo (google, outlook o yahoo)
  fecha : {type : Date, default: Date.now}
});
// ===================== mongoose middleware ====================================


// ... esto nos sirve para validar los datos que se ingresarán a la base de datos

 sistemaLogueoSchema.path('key').validate(function(datos){
   //verificamos si las variables contienen el formato adecuado...
    if(!typeof this.key === 'string') return false;  //validamos el formato del key
    if(!typeof this.secret === 'string') return false;  //validamos el formato del secret
  // como todo esta en orden, entonces retornamos positivo, para que guarde el documento
   return true;   
}, 'parametros no validos'); 



// ==========================================================



module.exports = mongoose.model('sistemasLogueo', sistemaLogueoSchema);
