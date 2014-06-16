var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;

var admin = {
	 pacientes : 'rw',
	 agenda : 'rw',
	 citas : 'rw',
	 inventario : 'rw',
	 contable : 'rw',
	 org_info : 'rw',
	 usuarios : 'rw',
	 historias : 'rw'
};

var usrOrgSchema = new Schema({

	_usuario : {type : Schema.Types.ObjectId, required : true, ref : 'usuarios'},  //dueño de la agenda
	_organizacion : {type : Schema.Types.ObjectId, required : true},  //id de la organizacion   
	particion : {type : Schema.Types.ObjectId, required : true},
	_perfil : {type : Schema.Types.Mixed, required : true, default : admin}, //puede ser el id de un perfil o un objeto que otorgue todos los permisos sobre la org
	fecha_creacion : {type : Date, default: Date.now }

   });

// como estos son datos que crecen demasiado, le asignamos maximo 100mb de tam, o 1000 registros...



module.exports = mongoose.model('usuario_organizacion', usrOrgSchema);