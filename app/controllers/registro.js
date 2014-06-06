var usuarios = require('./usuario.js');

var registro = {
 
      hacer : function(datos){ 

      	    if(!datos)
      	    	return;
        	
        	 usuarios.crear(datos);

        }

}


module.exports = usuario;