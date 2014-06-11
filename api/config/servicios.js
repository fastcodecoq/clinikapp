module.exports = {
	"local" : {
		"callbackURL" : "http://localhost/clinikapp/app/frontend",
		"sistema_logueo" : 1
	},

	"google" : {
	  "id" : "676866663553-f1ju015m12ia1bu8nt99o85chqtrnt13.apps.googleusercontent.com",
	  "secret" : "m9rUagRj07jNM7r-W8q-lSk0",
	  "callbackURL" : "http://localhost:8080/auth/google/callback",
	  "sistema_logueo" : 2
	},

	"yahoo" : {
		"key" : "dj0yJmk9ekE0VkxKdmVFYjhTJmQ9WVdrOVdFUllkSEZJTkdVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1hNA--",
		"secret" : "af13dd72a4b8463cc32c3e5993124e8a31b5a6b7" ,
		"callbackURL" : "http://clinikapp-l.com/auth/yahoo/callback",
		"sistema_logueo" : 3
	},

	"live" : { // mismo outlook
		"id" : "000000004411DB93",
		"secret" : "LHxXCaf7iEKVcFKMkB-eBMxJdbfwd8xw",
		"callbackURL" : "http://clinikapp-l.com:8080/auth/live/callback",
		"sistema_logueo" : 4
	}, 

	"db" : {
		"url" : "clinikapp:clinikAPP.2014@localhost/clinikapp"
	}
}	