var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;


function get(particion){


 var eventosSchema = new Schema({

	_id_agenda : {type : Schema.Types.ObjectId, required : true, ref : particion '.agenda'},  //quien inicia la relacion  
	tipo : {type : Number, required : true}, //tipo del evento 1 excepcion 2 normal
	titulo : {type : String, required : true},
	fecha_inicio : {type : Date, required : true},
	fecha_fin : {type : Date, required : true},
	hora_inicio : {type : Number},
	hora_fin : {type : Number},
	detalles : {type : String}
	iniciada : {type : Date, default: Date.now }

   });


   return mongoose.model(particion + '.eventos', eventosSchema);

}



module.exports = get;
