//la magia inicia aquí

var express = require("express");
var app = express();
var bodyparser = require("body-parser");

// ... incluir arriba todos los requires principales

// ========================= requires ===============================


app.use(bodyparser());


var router = express.Router();
    router = require("./routes/base")(router);  //incluimos el archivo ./routes/base, llamamos a la función y le pasamos el router del app

// ================= la route base contendrá todas las llamadas principales  ===========================
 


//  ... incluir arriba todo lo relacionado con routes

// ================= routes  ==========================================================================



app.use(router);  //le pasamos las routes al app express


// Instanciamiento del app 

var pto = process.env.PORT || 4000;

app.listen(pto);

console.log("Magia en el puerto "+pto);


// ===========================================================