var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;


function get(particion){



 var organizacionesSchema = new Schema({

	nombre : {type : String, required : true},    
	direccion : {type : String, required : true},    
	telefono : {type : String},
	email : {type : String},
	divipola : {type : String, required : true},  
	nit : {type : String, required: true},
	tipo : {type : Schema.Types.ObjectId , ref : 'tiposOrg'},
	iniciada : {type : Date, default: Date.now }

   });


   return mongoose.model(particion + '.organizaciones', organizacionesSchema);

}




module.exports = get;








