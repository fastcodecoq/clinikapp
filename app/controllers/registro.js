var usuarios = require('./usuario.js');

var registro = {
 
      hacer : function(datos, callback){ 

      	    if(!datos)
      	    	return false;
        	
        	 usuarios.crear(datos, callback);

        	 return true;

        }

}


module.exports = usuario;