
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
  // ================================= requires =================================
  router.get('*', function(req, res) {
    res.json({error:true, message:'La petición no es valida'});
  });
  //route.get('/registro',function(req,res){
  //});
  router.post('/registrar', passport.authenticate('registro-local', {
    successRedirect : '/perfil', // enviar a completar perfil
    failureRedirect : '/registrar', // redirigir a registro en caso de fallo
  }));
  router.post('/ingresar', passport.authenticate('ingreso-local', {
    successRedirect : '/perfil', // enviar a completar perfil
    failureRedirect : '/ingresar', // redirigir a registro en caso de fallo
  }));
  router.get('/perfil', estaLogueado, function(req, res){
    res.json(req.user);
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
