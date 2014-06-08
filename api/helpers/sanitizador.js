var sanitizer = require('sanitizer');
var should = require('should');

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

var sanitizar = {
   
      hacer : function (valor){
               
               if(typeof valor === "number" || typeof valor === "object")
               	  return valor;


      		 	valor  = sanitizer.normalizeRCData(valor);
      		 	valor  = sanitizer.escape(valor);
      		 	valor  = sanitizer.unescapeEntities(valor);
      		 	valor = escapeHtml(valor); 


      		 	return valor;     		 	
      		 
      	}        

       
  
 }



 module.exports = sanitizar;