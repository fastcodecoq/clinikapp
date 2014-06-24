var mongoose  =  require('mongoose'),
    Schema  =  mongoose.Schema,
    config = require('../config/vars.js');

// Esquema de los tokens
// =====================
var tokenSchema = new Schema({
   token : {type: String, required : true },
   _credencial : {type : Schema.Types.ObjectId, ref : 'credenciales', required : true },
   time : {type:Number, required: true},
   creado : {type:Date, default: Date.now},
   expira : {type : Boolean, default : true}
});

// Métodos estaticos
// =================
// retorna si un token ha expirado o no
tokenSchema.statics.expiro = function(creado) {
   var now  = new Date();
   var diff   = (now.getTime() - creado);
   console.log(diff);
   return diff < config.ttl;
};

module.exports = mongoose.model('tokens', tokenSchema);
