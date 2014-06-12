var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;


function get(particion){  

// para este modelo "la particion" 
// lleva el id de quien crea (usuario) la organizacion y el id de la organizacion
// ej. _usuario._organizacion   


 var perfilesSchema = new Schema({

	nombre : {type : String, required : true},  
	permisos : {type : ObjectId, required : true},  

   });


   return mongoose.model(particion + '.perfiles', perfilesSchema);

}



module.exports = get;








