
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

			router.get('*', function(req, res) {
  			   	
			  res.json({error:true, message:"La petición no es valida"});           			   	

            });

            console.log("router base iniciado");
			
			return router;

}

//hola

module.exports = base;