
var base = function(router,passport) {
  // ========= Arbitro base: Este arbitro se ejecuta primero que todos.
  router.use(require('../arbiters/base.js'));
  // ========= En este controlaremos el acceso al api en el primer nivel
  router.get('/', function(req, res){
    res.json({error:false, message:'Bienvenid@ a nuestra API'});
  });
  // ===================== easter eggs  =====================
  router.get('/hola', function(req, res){
    res.json({error:false, message:'Hola como estas?'});
  });
  router.get('/soy/:nombre', function(req, res){
    res.json({error:false, message:'Bienvenid@ a nuestra API ' + nombre});
  });

  // ============================= incluimos las rutas basicas ===================
  router = require('./usuarios')(router); //iniciamos las rutas para los usuarios
  router = require('./auth')(router);
  // ================================= requires =================================
  //route.get('/registro',function(req,res){
  //});


  router.get('*', function(req, res) {
    res.json({error:true, message:'peticion_invalida'});
  });

  console.log('rutas iniciadas');
  return router;  // siempre se retorna el router

};


module.exports = base;

function estaLogueado(req, res, next){
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
