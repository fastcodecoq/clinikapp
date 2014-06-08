
var usuarios = function(req, res, next){

	  // hacemos todos los controles de seguridad 

	  
	  console.log(req.url, "arbitro del modulo usuarios");


	  // si no queremos dar acceso, usamos:
	  // res.json({error:true, message: 'llave_error_mensaje'}); return;



	  // si todo esta bien. Damos paso siguiente a la petición usando next
	  next();
	  

}



module.exports = usuarios;