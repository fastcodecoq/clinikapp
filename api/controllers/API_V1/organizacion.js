// API V1



var organizacion = {
 	
 	init : function(particion){

 		// particion es el id del usuario
 		// particion_org es el id del usuario + id de la organizacion
 		// particion_org se usaran para pacientes e hcl,perfiles de una org

 		if(!this.utils)
 		this.utils = require('../../helpers/utils');

 		if(!this.Organizacion)  //no podemos compilar el modelo dos veces ... 
        this.Organizacion = require('../../models/organizaciones')(particion);
 	  
 	  },

     info : function(uids, listo){
     	
     	this.init(uids.uid);

	  if(this.utils.valida_permisos(uids, ['organizaciones']))
		{			
			
			this.Organizacion.find(uids.org ? {_id : uids.org} : {})
			.sort({ iniciada : -1})
		    .exec(listo); 		   

		}
	  else
	   return listo(true, false, 'no_autorizado');    	

     },

     crear : function(uids, data, listo){


     	console.log(data);

     	  if(this.utils.valida_permisos(uids, ['organizaciones']))
		{
			
			var self = this;


		  this.Organizacion.findOne({nit : data.nit}, function(err, organizacion){
	

		  	 if(err) return listo(err, false);
		  	 	
			 console.log('org', organizacion)

		  	 if(organizacion) return listo(err, false, 'organizacion_existe');


			
			 var organizacion = new self.Organizacion(data);			  	 
			 organizacion.save(listo);		    


		  });		

		}
	    else
	    return listo(true, false, 'no_autorizado');    	

     },

     eliminar : function(uids, listo){

     	this.init(uids.uid);
     	

     	  if(this.utils.valida_permisos(uids, ['organizaciones']))
		{
						
			this.Organizacion.remove( uids.org ? {_id : uids.org} : {}, listo);

		}
	    else
	    return listo(true, false, 'no_autorizado');    	

     },

     actualizar : function(uids, data, listo){

     	this.init(uids.uid);
     	

     	  if(this.utils.valida_permisos(uids, ['organizaciones']))
		{
							
			this.Organizacion.findOneAndUpdate({uid : uids.id_org}, data,listo);		    
		}
	    else
	    return listo(true, false, 'no_autorizado');    	

     }

};


module.exports = organizacion;