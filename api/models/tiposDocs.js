var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;

var tiposDocSchema = new Schema({
	 tipo : { type : Number, required :  true},
	 nombre : { type : String, required : true}
});


module.exports = mongoose.model('tiposDocs', tiposDocSchema);