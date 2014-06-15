var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;


var logsSchema = new Schema({

	uid : {type : String, required : true},  //dueño de la agenda
	accion : {type : String, required : true},  //nombre de la agenda   
	fecha_accion : {type : Date, default: Date.now },
	ip : {type:String, required : true}

   }, { capped: { size: 102400, max: 1000, autoIndexId: true } });

// como estos son datos que crecen demasiado, le asignamos maximo 100mb de tam, o 1000 registros...



module.exports = mongoose.model('logs', logsSchema);