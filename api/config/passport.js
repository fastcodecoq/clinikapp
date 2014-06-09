var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth');
var Credencial = require('../models/credenciales');

module.exports = function(passport) {
  passport.serializeUser(function(usuario,listo) {
    listo(null, usuario.id);
  });
  passport.deserializeUser(function(usuario,listo) {
    usuario.findById(id, function(err, usuario){
      listo(err, usuario);
    });
  });
  passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'clave'
  },
    function(email, clave, listo){
      // TODO: checkear si el usuario existe
      if(false){
	return listo(null,false,'ya hay un usuario con ese correo');
      } else {
	var nuevaCredencial = new Credencial();
	nuevaCredencial.email = email;
	nuevaCredencial.token = clave;
	nuevaCredencial.uid = email;
	nuevaCredencial.save(function(err) {
          console.log(email);
          console.log(clave);
          if (err) throw err;
          return listo(null, nuevaCredencial);
	});
      }
  }));
};
