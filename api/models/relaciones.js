var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;


function get(particion){


 var relacionesSchema = new Schema({

	_usuario_a : {type : Schema.Types.ObjectId, required : true, ref : 'usuarios'},  //quien inicia la relacion  
	_usuario_b : {type : Schema.Types.ObjectId, required : true, ref : 'usuarios'},  //quien acepta la relacion   
	permisos : {type : Array, required : true},
	_tipo_relacion : {type : Schema.Types.ObjectId, ref : 'relaciones'},  //solo estará presente cuando son relaciones preconfiguradas secretaria - medico 
	iniciada : {type : Date, default: Date.now }

   });


   return mongoose.model(particion + '.relaciones', relacionesSchema);

}




module.exports = get;








