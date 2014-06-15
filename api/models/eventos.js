var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;


// @params
// <String particion> _id del usuario. 


function get(particion){


 var eventosSchema = new Schema({

	_agenda : {type : Schema.Types.ObjectId, required : true, ref : particion '.agenda'},  //quien inicia la relacion  
	tipo : {type : Number, required : true}, //tipo del evento 1 excepcion 2 normal
	nombre : {type : String, required : true},
	fecha_inicio : {type : Date, required : true},
	fecha_fin : {type : Date, required : true},
	hora_inicio : {type : Number},
	hora_fin : {type : Number},
	todo_el_dia : {type:Boolean, default: false},
	es_recurrente : {type:Boolean, default: false},
	recurrencia :  String, // < String, 'lun,mar,mie,jue,vie,sab,dom'> cadena de los dias que se repetirá el evento, en caso de repetirse. 
	ubicacion: String,
	disponibilidad : {type: String , default : 'libre'}, // disponibilidad del usuario durante el evento <libre, ocupado, por_fuera_de_la_oficina>  
	es_publico : {type:Boolean, default:true},  // visibilidad del evento 
	recordar_en : {type : Number, default: 0}, // tiempo en minutos (int), antes del evento, para alertar al usuario, se usará para google calendar y outlook
	detalles : {type : String},
	fecha_creacion : {type : Date, default: Date.now },
	fecha_actualizacion : Date // solo si el evento sufre una modificacion

   });


   return mongoose.model(particion + '.eventos', eventosSchema);

}



module.exports = get;
