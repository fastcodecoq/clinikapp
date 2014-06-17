var Token = require('../models/token');
var mongoose = require('mongoose');
var uuid = require('node-uuid');


module.exports = {
  // **existe:** verifica que exista el token
  existe : function(datos, callback){
    credenciales.count( datos, function(err, count){
       callback(err, count > 0); 
    });
  },
  // **crear:** crea un nuevo token para un usuario
  crear : function(uid,callback){
    var self = this;
    t = uuid.v4();
    token = new Token({token: t, _credencial : uid});
  },
  // **eliminar:** elimina un token
  eliminar : function(id, callback){
    credenciales.remove({_id: mongoose.Types.ObjectId(id)}, callback);
    return true;

  }

};

