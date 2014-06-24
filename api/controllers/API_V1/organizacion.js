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

    	if(!this.Usuario_organizacion)
    	this.UsrOrg = require('../../models/usuario_organizacion');
 	  
 	  },

     info : function(uids, listo){
     	
     	this.init(uids.uid);

	  if(this.utils.valida_permisos(uids, ['organizaciones']))
		{		

			var self = this;	
			
			this.Organizacion.find(uids.org ? {_id : uids.org} : {})
			.sort({ iniciada : -1})
		    .exec(function(err, organizaciones){

		    	 if(err) return listo(err, null);		    	 

		    	 var rs = {};
		    	 	 rs.propias = organizaciones;

		    	 var query = {};
		    	     query._usuario = uids.uid;

		    	  if(uids.org)
		    	  	 query._organizacion = uids.org;

		    	 self.UsrOrg.find(query, function(err, orgs){

		    	 	    if(err) return listo(err, null);

		    	 	    rs.todas = orgs;

		    	 	    listo(err, rs);

		    	 })

		    }); 		   

		}
	  else
	   return listo(true, false, 'no_autorizado');    	

     },

     crear : function(uids, data, listo){


     	console.log(data);

     	  if(this.utils.valida_permisos(uids, ['organizaciones']))
		{
			
			var self = this;
			var sanitizar = require('../../helpers/sanitizador');
			var validar = require('../../helpers/validador');

			for(x in data)
				data[x] = sanitizar.hacer(data[x]);

			var errors = [];

			if(!data.nombre)
				errors.push('nombre_incorrecto');

			if(!data.direccion)
				errors.push('direccion_incorrecta');

			if(!data.nit)
				errors.push('nit_incorrecto');

			if(!data.mcpio)
				errors.push('mcpio_incorrecto')

		    if(!data.depto)
				errors.push('depto_incorrecto')			

			if(data.email)
				if(!validar.mail(data.email))
				errors.push('email_incorrecto')

			if(data.telefono)
				if(!validar.tel(data.telefono))
				errors.push('tel_incorrecto')


			if(errors.length > 0)
				return listo(true, false, errors);

			data.divipola = data.depto+','+data.mcpio;

			delete data['depto'];
			delete data['mcpio'];


		  this.Organizacion.findOne({nit : data.nit}, function(err, organizacion){
	

		  	 if(err) return listo(err, false);

			 console.log('org', organizacion)

		  	 if(organizacion) return listo(err, false, 'organizacion_existe');


				
			 var organizacion = new self.Organizacion(data);			  	 
			 organizacion.save(function(err, organizacion){

			 	  if(err) return listo(err, false);

			 	  //guardamos la relacion entre el usuario y la organizacion
			 	  var datos = {
			 	  	  _usuario : uids.uid,
			 	  	  _organizacion : organizacion._id,
			 	  	  particion : uids.uid
			 	  }

			 	  var usr_org = new self.UsrOrg(datos);
			 	  usr_org.save(listo);

			 });		    


		  });		

		}
	    else
	    return listo(true, false, 'no_autorizado');    	

     },

     agregar_miembro :  function(uids, listo){},

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
     	
     	var sanitizar = require('../../helpers/sanitizador');
		var validar = require('../../helpers/validador');
		var errors = [];

			for(x in data)
				data[x] = sanitizar.hacer(data[x]);


			if(data.email)
				if(!validar.mail(data.email))
				errors.push('email_incorrecto')

			if(data.telefono)
				if(!validar.tel(data.telefono))
				errors.push('tel_incorrecto')


			if(errors.length > 0)
				return listo(true, false, errors);


     	  if(this.utils.valida_permisos(uids, ['organizaciones']))
		{
							
			this.Organizacion.findOneAndUpdate({uid : uids.id_org}, data,listo);		    
		}
	    else
	    return listo(true, false, 'no_autorizado');    	

     }

};


module.exports = organizacion;