var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;


function get(particion){


 var usrOrgSchema = new Schema({

	_usuario : {type : Schema.Types.ObjectId, required : true, ref : 'usuarios'},  
	_organizacion : {type : Schema.Types.ObjectId, required : true, ref : particion + '.organizaciones'},  
	particion : {type : String, required : true, default : particion},
	_perfil : {type : Schema.Types.ObjectId, ref : particion + '.perfiles'},  
	iniciada : {type : Date, default: Date.now }

   });


   return mongoose.model('usrOrg', usrOrgSchema);

}



module.exports = get;








