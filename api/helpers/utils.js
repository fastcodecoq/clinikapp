module.exports = {
		
		genToken : function(val){

		var bcrypt = require('bcrypt-nodejs');		

  		return bcrypt.hashSync(val + global.user_agent + new Date().getTime(), bcrypt.genSaltSync(5), null) + '--';

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
	  	  return !!this.time > token_time;
	  }

}