
var registro = {
 
      hacer : function(datos, callback){ 
        
      var usrCtrl = require('./usuario');

      	    if(!datos)
      	    	return false;
        	
        	 usrCtrl.crear(datos, callback);

        	 return true;

        }

}


module.exports = usuario;