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


module.exports = function(NbAgency, NbMaxAgentByAgency) {


//Faker bank Agent beginning...
AgentModel.remove({}, function(err) {
	
		for(var itemAgency=0; itemAgency<NbAgency; itemAgency++) {
	    AgencyModel.findOne({ agencyId : itemAgency}, function(err, agency) {
	    	if(!err)	{
	    		log.info("Welcome to agency n : %s ",  agency.agencyId);
	    		for(var itemAgent=0; itemAgent<NbMaxAgentByAgency; itemAgent++) {
	    	
	    			var idAgent = (agency.agencyId*NbMaxAgentByAgency) + itemAgent;
		    		log.info("idAgent calcul : %s ",  idAgent);

			    	//agent creation ---------------------------------------------------			    		
					var lastname = faker.Name.lastName().toLowerCase();
					var firstname = faker.Name.firstName().toLowerCase();
					var mail = faker.Internet.email();
					
					  var agent = new AgentModel({ 
							agentId: idAgent,
							description : 'AGENT',
							last_name: lastname,
							first_name : firstname,
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
							emails: [ {value: mail}],
							photos: [ {url: faker.Image.avatar()}]
					});
				
					agent.save(function(err, agent) {
					if(err)	{ return log.error(err); }
					else {
						log.info("New agent -- %s:%s:%s ",  agent.first_name, agent.last_name, agent.agentId);
						
			    		agency.agents.push(agent.agentId);
			    		agency.save(function(err, agency) {
			    			if(err)	return log.error(err);
			    			else log.info("relation agency %s with agent %s", agency.agencyId, agent.agentId );
			    			});		

					}
					}); 
	    		}
	    	}
	    });
	}
});
	


setTimeout(function() {
    mongoose.disconnect();
}, 3000);


}