module.exports = {

	 // opts es un objeto de la siguiente estructura:
	 /*    { 
	       particion : 'uid_del_usuario_que_creo_la_organizacion' ,  //no del usuario que solicita la info 
	       organizacion : 'id_organizacion'
	       }     */

	 ini : function(opts, modelos){

	 	 if(typeof opts != 'object') return false;


		 if(!this.models)
		    {
		    	
		    	this.models = {};
		    	var modelos = modelos || ['perfiles', 'especialidades', 'pacientes', 'metadatos'];

		    	for(x in modelos)
		    		this.models[x] = this.modelos(modelos[x], opts.particion + '.' + opts.organizacion);

		    	return this.models;

		    }else
		    return this.models;	 	  

	 },

	 modelos : function(cual, particion){

	 	 switch(cual){

	 	 	  case 'perfiles':
	 	 	  		return require('../../models/perfiles')(particion);
	 	 	  break;

	 	 	  case 'especialidades':
	 	 	  		return require('../../models/especialidades')(particion);
	 	 	  break;

	 	 	  case 'pacientes':
	 	 	  		return require('../../models/pacientes')(particion);
	 	 	  break;

	 	 	  case 'metadatos':
	 	 	  		return require('../../models/metadatos')(particion);
	 	 	  break;

	 	 }

	 }	
}