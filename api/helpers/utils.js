module.exports = {
		
		genToken : function(val){

		var bcrypt = require('bcrypt-nodejs');		

  		return bcrypt.hashSync(val + global.user_agent + new Date().getTime(), bcrypt.genSaltSync(5), null) + '--';

		},
		encrypt_pass :  function(pass){
		
		var bcrypt = require('bcrypt-nodejs');			
		return 	bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
		
		}

}