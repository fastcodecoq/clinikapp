var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;


function get(particion){


 var organizacionesSchema = new Schema({

	nombre : {type : String, required : true},  //quien inicia la relacion  
	direccion : {type : String, required : true},  //quien acepta la relacion   
	telefono : {type : String},
	email : {type : String},
	divipola : {type : String, required : true},  //solo estara presente cuando son relaciones preconfiguradas secretaria - medico 
	nit : {type : String, required: true }
	iniciada : {type : Date, default: Date.now }

   });


   return mongoose.model(particion + '.organizaciones', organizacionesSchema);

}




module.exports = get;








