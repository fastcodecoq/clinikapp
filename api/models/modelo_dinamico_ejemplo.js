var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;


function modelo_dinamico(prefijo){


 var casaSchema = new Schema({

	dir : {type : String, required : true},    //los 2 nombres delimitados por coma (,) ej. Alberto,Andres
	ciudad : {type : String, required: true},   //la misma estructura que para los nombres ej. Acosta, Arteta	
	cod_postal : {type : Number, required : true},
	tipo_casa : {type : Schema.Types.ObjectId, required : true, ref : 'tipo_casa'},
	_colores_casa : {type : Schema.Types.ObjectId, required : true, ref : prefijo + '.colores_casa'},
	ubicacion : {type : String, required : true},
	telefono : String,
	registered : {type : Date, default: Date.now }

   });


   return mongoose.model(prefijo + '.casas', casaSchema);

}



//exportamos la funcion de modelo dinamico


module.exports = modelo_dinamico;



// ahora en el codigo
//  var casas = require('casas.js')(id_usuario);
//  var usrCasa = new casas({...});
//      usrCasa.save();
//  casas.find(console.log);  veremos como solo estan las casas de este usuario.

// Si vamos a la consola shell y usamos mongo
// podemos ver que se ha creado una colleción casas con el prefijo ...
// ... que hemos pasado como parametro. Escribimos:

// $ db['id_usuario.casas'].find()  
// y veremos como solo arroja las casas de el usuario especificado





