

var base = function(req, esta, next){

		  	  // arbitro base. Se encargará de ver si el request proviene ...
		  	  // de un app valida
		  	  // Este arbitro se ejecuta primero que todos los demas

		  	  console.log('arbitro base', req.url);

		  	  next();

		  };





module.exports = base;		  