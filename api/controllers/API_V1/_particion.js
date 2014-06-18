module.exports = {
	 ini : function(particion, modelos){

	 	 if(typeof particion != 'object') return false;


		 if(!this.models)
		    {
		    	
		    	this.models = {};
		    	var modelos = modelos || ['organizaciones', 'agenda', 'eventos', 'relaciones'];

		    	for(x in modelos)
		    		this.models[x] = this.modelos(modelos[x], opts.particion);

		    	return this.models;

		    }else
		    return this.models;	 	  

	 },

	 modelos : function(cual, particion){

	 	 switch(cual){

	 	 	  case 'organizaciones':
	 	 	  		return require('../../models/organizaciones')(particion);
	 	 	  break;

	 	 	  case 'agenda':
	 	 	  		return require('../../models/agendas')(particion);
	 	 	  break;

	 	 	  case 'eventos':
	 	 	  		return require('../../models/eventos')(particion);
	 	 	  break;

	 	 	  case 'relaciones':
	 	 	  		return require('../../models/relaciones')(particion);
	 	 	  break;

	 	 }

	 }	
}