var log                 = require('../libs/log')(module);
var mongoose 			= require('../libs/mongoose').mongoose;
var assert 				= require('../libs/assert');
var validator 			= require('validator');


//faker functions
var faker               = require('Faker');
var fakerBank 			= require('../faker/fakerbank');

//Models Bank to created.
var AgencyModel         = require('../schemas/agency').AgencyModel;
var AgentModel         = require('../schemas/agent').AgentModel;


module.exports = function(NbAgency) {


//Faker bank beginning...
AgencyModel.remove({}, function(err) {
    for(var itemAgency=0; itemAgency<NbAgency; itemAgency++) {
	
	    //Agency creation ---------------------------------------------------	
		  var agency = new AgencyModel({ 
			    agencyId : itemAgency,
				name: faker.Name.lastName().toLowerCase(),
				description : 'ARKEA AGENCY',				
				locations: [{
					address: fakerBank.address.streetAddress(),
					postcode:fakerBank.address.zipCode(),
					city:fakerBank.address.city(),
					country: 'France',
					locations : {
						latitude: fakerBank.address.latitude(),
						longitude: fakerBank.address.longitude()
					}
				}],
				phones: [ {number:faker.PhoneNumber.phoneNumber()}],
				emails: [ {value: faker.Internet.email()}],
				photos: [ {url: faker.Image.business()}]
		});
	
		agency.save(function(err, agency) {
		if(err)	{ return log.error(err); }
		else {
			log.info("New agency - name :%s - id :%s",  agency.name, agency.agencyId);
		  }
		});    		
	}
	
});


setTimeout(function() {
    mongoose.disconnect();
}, 3000);

}