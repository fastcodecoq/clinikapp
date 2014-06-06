
var base = function(router){

			router.get("/", function(req, res){
			
			  res.json({error:false, message:"Bienvenid@ a nuestra API"});
			
			});
			
			router.get("/hola", function(req, res){
			
			  res.json({error:false, message:"Hola como estas?"});
			
			});
			
			router.get("/soy/:nombre", function(req, res){
			
			  res.json({error:false, message:"Bienvenid@ a nuestra API " + nombre});         
			
			});
			
			return router;

}



module.exports = base;