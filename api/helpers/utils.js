module.exports = {
		
		genToken : function(val){	

  		return this.md5(val + global.user_agent + new Date().getTime()) + '--';

		},
		encrypt_pass :  function(pass){
		
		var bcrypt = require('bcrypt-nodejs');			
		return 	bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
		
		},
		microtime : function(get_as_float) {
			
			var now = new Date()
			.getTime() / 1000;
			var s = parseInt(now, 10);
			
			return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
       },
       time : function(){
       	  
       	  return Math.floor(new Date().getTime() / 1000);
           
           },
       rand : function(min, max) {

		var argc = arguments.length;
		if (argc === 0) {
		min = 0;
		max = 2147483647;
		} else if (argc === 1) {
		throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
		}
		return Math.floor(Math.random() * (max - min + 1)) + min;

       },

       round : function(value, precision, mode) {


		var m, f, isHalf, sgn; // helper variables
		// making sure precision is integer
		precision |= 0;
		m = Math.pow(10, precision);
		value *= m;
		// sign of the number
		sgn = (value > 0) | -(value < 0);
		isHalf = value % 1 === 0.5 * sgn;
		f = Math.floor(value);
		
		if (isHalf) {
		
		switch (mode) {
		case 'PHP_ROUND_HALF_DOWN':
		// rounds .5 toward zero
		value = f + (sgn < 0);
		break;
		case 'PHP_ROUND_HALF_EVEN':
		// rouds .5 towards the next even integer
		value = f + (f % 2 * sgn);
		break;
		case 'PHP_ROUND_HALF_ODD':
		// rounds .5 towards the next odd integer
		value = f + !(f % 2);
		break;
		default:
		// rounds .5 away from zero
		value = f + (sgn > 0);
		}
		
		}
		
		return (isHalf ? value : Math.round(value)) / m;
	  },

	  strtotime : require('./strtotime'),
	  token_expirado : function(token_time){

	  	  console.log('restan',(token_time - this.time()) / 60,'mins de session');

	  	  return (token_time - this.time()) > 0;
	  },
	  validar_token : function(usr, listo){

	  	  var Credencial = require('../models/credenciales');          

	  	   if(!usr.uid || !usr.token)
	  	   	  listo(true, false);

	  	   	var self = this;


           Credencial.findOne({uid : usr.uid , token : usr.token} ,function(err, credencial){


				if(err) return listo(true, false);      
				if(!credencial) return listo(true, false);                                 


                if(!self.token_expirado(credencial.token_time) && !credencial.token_larga_vida)                	  	   	   
	  	   	       return listo(true, false)                             
                else
                   {
                   	credencial.token_time = self.strtotime('+1 hours')
                   	credencial.save(listo);                   	
                   };


           });

	  },
	  md5 : require('MD5'),
	  valida_permisos : function(uids, permisos){
	  	  // va y revisa si el usuario tiene permisos para acceder a su información basica
	  	  // de momento no estamos validando ningún permiso	  	  
	  	  // la idea es colocar aca un controlador para ello


	  	  // return !! (permisos in relacion.permisos);
	  	  // ... ver el modelo relaciones (/models/relaciones.js).

	  	  return !! (uids.uid === uids._uid);
	  }

}