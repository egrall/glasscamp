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
var PersonModel         = require('../schemas/person').PersonModel;
var CreditCardModel		= require('../schemas/creditcard').CreditCardModel;
var ContractModel		= require('../schemas/contract').ContractModel;
var TransactionModel	= require('../schemas/transaction').TransactionModel;



module.exports = function(NbPerson) {

var ExpirationYear		= 5;
var NbMaxProduct		= 5;
var NbMaxTransaction	= 20;


//Customer bank beginning...
PersonModel.remove({}, function(err) {
	
	//first Agent count
	var NbMaxAgent = 0;
	AgentModel.count({}, function( err, count){
		NbMaxAgent = count;
    	log.info("Nb Agent -- %s", count);           	


    for(var item=0; item<NbPerson; item++) {
    	
		var lastname = faker.Name.lastName().toLowerCase();
		var firstname = faker.Name.firstName().toLowerCase();
		var mail = faker.Internet.email();
    	
        //person creation ---------------------------------------------------	
        var person = new PersonModel({ 
        								userId: item,
        								name : {
        									last_name: lastname,
        									first_name : firstname 
        								},
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
        								photos: [ {url: faker.Image.avatar()}],
        								relation: [ { userId: 'to defined', kind: 'SINGLE'}]
        						});

        person.save(function(err, person) {
            if(err)	{ return log.error(err); }
            else { 
            	log.info("New person -- %s --%s:%s:%s ", person.personId, person.userId, person.name.first_name, person.name.last_name);           	
            	            	
    		    var findagent = faker.random.number(NbMaxAgent-1);
	            AgentModel.findOne({ agentId : findagent}, function(err, agent) {
	            	if(!err)	{
	            		agent.userIDs.push(person.userId);
	            		agent.save(function(err, agent) {
	            			if(err)	return log.error(err);
	            			else log.info("relation agent %s with customer %s", agent.agentId, person.userId);
	            			});    	
	            	}
	            });
            }
        });
        
        CreditCardModel.remove({}, function(err) {
        	//just remove all
        });

        
        //creditcard associated ---------------------------------------------------
    	var vendor = fakerBank.creditcard.vendor();
    	var month = fakerBank.creditcard.expirationMonthDate(ExpirationYear);
    	var year  = fakerBank.creditcard.expirationYearDate(ExpirationYear);
        var creditcard = new CreditCardModel({ 
        								userId: item,
        								type : vendor,
        								number : fakerBank.creditcard.cardNumber(vendor),
        								cryptogram : fakerBank.creditcard.cryptogramNumber(vendor),
        								expire_month : month,
        								expire_year : year,
        								valid_until : month+year,    								
        								first_name : firstname,
        								last_name : lastname
        						});

        creditcard.save(function(err, creditcard) {
            if(err) return log.error(err);
            //else log.info("New creditcard -- %s:%s:%s", creditcard.type, creditcard.number, creditcard.expire_year);
        });      

        //products associated ----------------------------------------------------
        ContractModel.remove({}, function(err) {
        	//just remove all
        });        
        
        var NbUserProduct = faker.random.number(NbMaxProduct); 
        
        var contract = new ContractModel({
			userId : item,
			contractId: '0',			
			kind : 'COMPTE COURANT',
			title : "Mon Compte Courant",
			duration : fakerBank.product.duration(ExpirationYear),
	        iban: fakerBank.product.iban(),
	        amount : fakerBank.product.amount(),
			created : fakerBank.product.created(ExpirationYear)
		});

		contract.save(function(err, contract) {
		if(err) return log.error(err);
		//else log.info("New contract -- %s:%s:%s", contract.kind, contract.duration, contract.account);
		});        
        
        
        for(var itemContract=1;itemContract<NbUserProduct;itemContract++)	{
        	
	        var type = fakerBank.product.all();
	        var contract = new ContractModel({
	        			userId : item,
	        			kind : type,
	        			contractId: itemContract,
	        			title : fakerBank.product.title(type),
	        			duration : fakerBank.product.duration(ExpirationYear),
	        	        iban: fakerBank.product.iban(),
	        	        amount : fakerBank.product.amount(),
	        			created : fakerBank.product.created(ExpirationYear)
	 			});
			
	        contract.save(function(err, contract) {
			if(err) return log.error(err);
			//else log.info("New contract -- %s:%s:%s", contract.kind, contract.duration, contract.amount);
			});
        }
        
        
        //transaction history  ------------------------------------
        TransactionModel.remove({}, function(err) {
        	//just remove all
        });        
        
        var NbUserTransaction = faker.random.number(NbMaxTransaction);
        for(var itemTransaction=0;itemTransaction<NbUserTransaction;itemTransaction++)	{
        
	        var type = fakerBank.transaction.type();
	        var title = fakerBank.product.title(type);
	        var vendor = fakerBank.transaction.shop();
	        var date = fakerBank.transaction.operationDate(ExpirationYear) ;
	        var transaction = new TransactionModel({
						userId : item,
						kind : type,
						title : title,
						vendor : vendor,
						description : fakerBank.transaction.description(title, date, vendor),
						amount : fakerBank.transaction.amount(),
						contract: '0',
						operationDate : date,
						customerDate : date,
						photos : [{ }]
					});
			
	        transaction.save(function(err, transaction) {
			if(err) return log.error(err);
			//else log.info("New transaction -- %s:%s:%s", transaction.kind, transaction.title, transaction.vendor);
			});
        }
    }
	});
});



setTimeout(function() {
    mongoose.disconnect();
}, 3000);



}
