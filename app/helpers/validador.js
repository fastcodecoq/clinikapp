
var validar = {
	
   mail : function(val){
      return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g.test(val);
   },

   tel : function(val){
     return /^([0-9+]{1})?\s?([0-9]{2})?\s?([\s]{1})?\s?([(]{1}[0-9]{2,3}[)]{1})?\s?([-]{1})?\s?([0-9]{3})?\s?([-]{1})?\s?[0-9]{7}$/g.test(val);
   },

   cedula : function(val){
   	  return /^[1-9]{1}([0-9]{0,2})?('||[.])?[0-9]{3}([.])?[0-9]{3}([0-9]{1,3}||[.][0-9]{3})?$/g.test(val);

   },

   clave : function(val){  //valida que la clave no este vacía y que tenga de 6 a 8 carácteres.
   	  return /^(.+){6,18}$/.test(val);

   },
   
   vacia : function(val){  // valida que una variable no este vacia
   	   return !/^(?!\s*$).+/g.test(val);
   },

   url : function(val){  
   	   return !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/g.test(val);
   },

   ip : function(val){
       return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g.test(val);
   },

   tc : {  // tarjetas de creditos

   	    master_card : function(num){
   	    	num = num + '';
   	    	return /^5[1-5]/g.test(num) && num.length  === 16;
   	    },
   	    visa : function(num){
   	    	num = num + '';
   	    	return /^[4]/g.test(num) && num.length === 16;
   	    },
   	    maestro : function(num){
   	    	num = num + '';
   	    	return /^(5018|5020|5038|6304|6759|676[1-3])/g.test(num) 
   	    	      && (num.length >= 12 && num.length <= 19);
   	    }

   }

}


// ========== USO ============================================================================

// if(validar.tc.cedula(1111111111)) //correcto else //incorrecto ;
// if(validar.mail("mi@correo.com")) //correcto else //incorrecto ;
// if(validar.tel("+57 314 3333333") || validar.tel("314 333 3333") || validar.tel("3143333333")) //correcto else //incorrecto ;
// if(validar.clave(myClave)) //correcto else //incorrecto ;
// if(validar.ip("192.9.9.9")) //correcto else //incorrecto ;
// if(validar.tc.master_card(5399181818388111)) //correcto else //incorrecto ;
// if(validar.url('http://mi.url')) //correcto else //incorrecto ;
// if(validar.vacia('')) //correcto else //incorrecto ;
// if(validar.tc.master_card(5399181818388111)) //correcto else //incorrecto ;
// if(validar.tc.visa(5399181818388111)) //correcto else //incorrecto ;
// if(validar.tc.maestro(5399181818388111)) //correcto else //incorrecto ;

//============================================================================================

module.exports = validar;
