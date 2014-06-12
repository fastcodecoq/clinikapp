var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;


function get(particion){


 var agendasSchema = new Schema({

	_usuario : {type : Schema.Types.ObjectId, required : true, ref : 'usuarios'},  //dueño de la agenda
	nombre : {type : String, required : true},  //nombre de la agenda   
	iniciada : {type : Date, default: Date.now }

   });


   return mongoose.model(particion + '.agenda', agendasSchema);

}




module.exports = get;
