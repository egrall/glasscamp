var log                 = require('../libs/log')(module);
var mongoose 			= require('../libs/mongoose').mongoose;
var assert 				= require('../libs/assert');
var validator 			= require('validator');


//faker functions
var faker               = require('Faker');
var fakerBank 			= require('../faker/fakerbank');

//Models ABM to created.
var AbmModel         = require('../schemas/abm').AbmModel;

module.exports = function(NbABM) {


//Faker bank beginning...
AbmModel.remove({}, function(err) {
    for(var itemAbm=0; itemAbm<NbABM; itemAbm++) {
	
	    //Agency creation ---------------------------------------------------	
		  var abm = new AbmModel({ 
				name: faker.Address.streetName().toLowerCase(),
				description : 'ABM ARKEA : ' + itemAbm,				
				locations: [{
					address: faker.Address.streetAddress(),
					postcode:faker.Address.zipCode(),
					city:faker.Address.city(),
					country: 'France',
					locations : {
						latitude: fakerBank.address.latitude(),
						longitude: fakerBank.address.longitude()
					}
				}]
		});
	
		abm.save(function(err, abm) {
		if(err)	{ return log.error(err); }
		else {
			log.info("New ABM - name :%s",  abm.name);
		  }
		});    		
	}
	
});


setTimeout(function() {
    mongoose.disconnect();
}, 3000);

}