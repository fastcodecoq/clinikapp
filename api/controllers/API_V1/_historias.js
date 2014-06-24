module.exports = {

	  // opts es un objeto de la siguiente estructura:
	 /*    { 
	       particion : 'uid_del_usuario_que_creo_la_organizacion' ,  //no del usuario que solicita la info 
	       organizacion : 'id_organizacion', 
	       historia : 'id_historia',
	       evento : 'id_del_evento'  // Opcional. Solo se usa para obtener el modelo evoluciones 
	       }     */


	 ini : function(opts, modelos){

	 	 if(typeof opts != 'object') return false;


		 if(!this.models)
		    {
		    	
		    	this.models = {};
		    	var modelos = modelos || ['historias', 'plantillas_historias', 'eventos', 'tipos_eventos', 'evoluciones', 'examenes', 'recetas', 'acceso_historia'];

		    	for(x in modelos)
		    		this.models[x] = this.modelos(modelos[x], opts);

		    	return this.models;

		    }else
		    return this.models;	 	  

	 },

	 modelos : function(cual, opts){

	 	 switch(cual){

	 	 	  case 'historias':
	 	 	  		return require('../../models/historias')(opts.uid + '.' + opts.organizacion);
	 	 	  break;

	 	 	  case 'plantillas_historias':
	 	 	  		return require('../../models/plantillas_historias')(opts.uid + '.' + opts.organizacion);
	 	 	  break;	 	 

	 	 	  case 'tipos_eventos':
	 	 	  		return require('../../models/tipos_eventos')(opts.uid + '.' + opts.organizacion);
	 	 	  break;

	 	 	  case 'eventos':
	 	 	  		return require('../../models/especialidades')(opts.uid + '.' + opts.organizacion + '.' + opts.historia);
	 	 	  break;

   	 	 	  case 'evoluciones':
   	 	 	        if(!opts.historia || !opts.evento) return console.log('params_invalidos', 'para evoluciones'); 
	 	 	  		return require('../../models/evoluciones')(opts.uid + '.' + opts.organizacion + '.' + opts.historia + '.' + opts.evento);
	 	 	  break;

	 	 	  case 'examenes':
	 	 	  		return require('../../models/examenes')(opts.uid + '.' + opts.organizacion + '.' + opts.historia);
	 	 	  break;

	 	 	  case 'recetas':
	 	 	  		return require('../../models/recetas')(opts.uid + '.' + opts.organizacion + '.' + opts.historia);
	 	 	  break;

	 	 	  case 'acceso_historia':
	 	 	  		return require('../../models/acceso_historia')(opts.uid + '.' + opts.organizacion + '.' + opts.historia);
	 	 	  break;

	 	 }

	 }	
}