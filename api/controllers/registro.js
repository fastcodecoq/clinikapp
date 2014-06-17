var servicios = require('../config/servicios');

var registro = {

  local : function(datos, callback){
    var self = this;
    if(typeof datos.clave === 'undefined')
      return callback({ error: true, message : 'error_clave'}, null);
    this.usuario(datos, function(err, usuario){
      if(err) return callback(err, null);
      usuario.clave = datos.clave;
      usuario.perfil_completado = true;
      self.credencial(usuario, callback);
    });
  },

  credencial : function(usuario, callback){
    var utils = require('../helpers/utils');
    var credencialCtrl = require('./credencial');
    var credencial = {};
    credencial.email = usuario.email;
    credencial._usuario =  usuario._id; //tomamos el _id del usuario que se acaba de crear
    credencial.uid = usuario._id;
    credencial.clave = utils.encrypt_pass(usuario.clave);
    credencial.sistema_logueo = servicios.local.sistema_logueo;
    credencial.token = utils.genToken(credencial.email + credencial._usuario + credencial.clave);
    credencial.perfil_completado = !!usuario.perfil_completado;
    credencialCtrl.crear(credencial, function(err, credencial){
      console.log(credencial);
      if(err) return callback(err, null);
      var _credencial = {};
      _credencial.uid = credencial._id;
      _credencial.token = credencial.token;
      _credencial._id = credencial._id;
      callback(null, _credencial);
    });
  },

  usuario : function(datos, callback){
    var usrCtrl = require('./usuario');
    if(!datos)
      return callback({error:true, message : 'params_invalidos'}, null);
    var errors = [];
    if(typeof datos.tipo_doc === 'undefined')
      errors.push('error_tipo_doc');
    if(typeof datos.numero_doc === 'undefined')
      errors.push('error_numero_doc');
    if(typeof datos.nombres === 'undefined')
      errors.push('error_nombres');
    if(typeof datos.apellidos === 'undefined')
      errors.push('error_apellidos');
    if(typeof datos.email === 'undefined')
      errors.push('error_email');
    if(typeof datos.sexo === 'undefined')
      errors.push('error_sexo');
    if(typeof datos.depto === 'undefined')
      errors.push('error_depto');
    if(typeof datos.mcpio === 'undefined')
      errors.push('error_mcpio');
    if(typeof datos.fecha_nacimiento === 'undefined')
      errors.push('error_fecha_nacimiento');
    if(errors.length > 0)
      return callback({ error: true, message : errors}, null);
    var usuario = {};
    usuario.nombres = datos.nombres;
    usuario.apellidos = datos.apellidos;
    usuario.email = datos.email;
    usuario._tipo_doc = datos.tipo_doc;
    usuario.numero_doc = datos.numero_doc;
    usuario.sexo = datos.sexo;
    usuario.divipola = datos.depto  + ',' + datos.mcpio;
    usuario.fecha_nacimiento = datos.fecha_nacimiento;
    if(usuario.telefono)
      usuario.telefono = datos.telefono;
    usrCtrl.crear(usuario, callback);
  },

  completar : function(datos, callback){
    this.usuario(datos, function(err, usuario){
      if(err) callback(err, null);
      usuario.email_verificado = true;
      var Credencial = require('../models/credenciales');
      var _datos = {};
      _datos._usuario = usuario._id;
      _datos.perfil_completado = true;
      Credencial.findOneAndUpdate({email : datos.email, token : datos.token}, _datos, callback);
    });
  }
};


module.exports = registro;
