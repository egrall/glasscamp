
var validator 		= require('validator');
var fakerBank 		= require('../faker/fakerbank');

var Contract = require('../schemas/contract').ContractModel


module.exports = function(app, log, passport) {
	
	//
	// GET API ----------------------------------------------------------------------------
	//
	
	
	//PUBLIC API PRODUCT (without token oAuth.2.0) ------ >> ONLY FOR TESTING
	app.get('/api/contract', function (req, res) {
	    return Contract.find(function (err, contract) {
	        if (!err) { 
	            return res.json({contract:contract});
	        } else {
	        	 res.statusCode = 404;
		         return res.send({ error: 'Not found' });
	        }
	    });
	});	
	
	
	//recuperation des contrats de la personne par l'identifiant contractId
	app.get('/api/contract/id/:contractId',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Contract.find({ contractId : req.params.contractId }, function (err, contract) {
			        if (!err) {
			            return res.json({contract:contract});
			        } else {
			        	 res.statusCode = 404;
				         return res.send({ error: 'Not found' });
			        }
			    });
		}
	);	
	
	//recuperation des contrats de la personne par l'identifiant userId
	app.get('/api/contract/person/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Contract.find({ userId : req.params.id }, function (err, contract) {
			        if (!err) {
			            return res.json({contract:contract});
			        } else {
			        	 res.statusCode = 404;
				         return res.send({ error: 'Not found' });
			        }
			    });
		}
	);
	
	
	//recuperation globale des contrats compris en 2 dates (min et max).
	app.get('/api/contract/date', function (req, res) {
        
		if (req.query.hasOwnProperty('mindate') ||
			req.query.hasOwnProperty('maxdate') 
			)
			{ //------------------------------------------
	        var mindateString = req.query.mindate.match(/\d{4}\/\d{2}\/\d{2}/);		// Format YYYY/MM/DD
	        var maxdateString = req.query.maxdate.match(/\d{4}\/\d{2}\/\d{2}/);
	
		    return	Contract.find().where('created').gt(new Date(mindateString)).lt(new Date(maxdateString)).exec(function (err, contract) {
		        if (!err) {
		            return res.json({contract:contract});
		        } else {
		        	 res.statusCode = 404;
			         return res.send({ error: 'Not found' });
		        }	    	
		    });
		}
	});			
	
	
	//recuperation des contrats d'une personne compris en 2 dates (min et max).	
	app.get('/api/contract/date/:id', function (req, res) {
        
		if (req.query.hasOwnProperty('mindate') ||
			req.query.hasOwnProperty('maxdate') 
			)
			{ //------------------------------------------
	        var mindateString = req.query.mindate.match(/\d{4}\/\d{2}\/\d{2}/);		// Format YYYY/MM/DD
	        var maxdateString = req.query.maxdate.match(/\d{4}\/\d{2}\/\d{2}/);
	
		    return	Contract.find({ userId : req.params.id }).where('created').gt(new Date(mindateString)).lt(new Date(maxdateString)).exec(function (err, contract) {
		        if (!err) {
		            return res.json({contract:contract});
		        } else {
		        	 res.statusCode = 404;
			         return res.send({ error: 'Not found' });
		        }	    	
		    });
		}
	});	
	
	
	
	//
	// POST API  ----------------------------------------------------------------------------
	//
	
	//creation d'un contrat associé à une personne userId
	app.post('/api/contract',
		//passport.authenticate('bearer', { session: false }), 
		function(req, res) {
			//mandatory --------------------------------
			if (req.body.hasOwnProperty('userId') ||
				req.body.hasOwnProperty('contractId') ||	
				req.body.hasOwnProperty('kind') ||
				req.body.hasOwnProperty('duration') ||	
				req.body.hasOwnProperty('amount') ||			
				req.body.hasOwnProperty('created')
				)
			{ //------------------------------------------
								
			    var contract = new Contract({
			        userId: req.body.userId,
			        contractId: req.body.contractId,
			        kind :  req.body.kind,
			        title	: req.body.hasOwnProperty('title')?req.body.title:'',
			        duration :  req.body.duration,
			        iban: req.body.hasOwnProperty('iban')?(req.body.iban):(fakerBank.product.iban()),	        
			        amount:  req.body.amount,
			        created: new Date(req.query.created),
			        dismiss: req.body.hasOwnProperty('dismiss')?(new Date(req.query.dismiss)):'',
			        signature_date: req.body.hasOwnProperty('signature_date')?(new Date(req.query.signature)):''
			    });
		    
			    contract.save(function (err) {
			        if (!err) {
			            log.info("contract created");
			            return res.send({ status: 'OK', contract:contract });
			        } else {
			            console.log(err);
			            if(err.name == 'ValidationError') {
			                res.statusCode = 400;
			                res.send({ error: 'Validation error' });
			            } else {
			                res.statusCode = 500;
			                res.send({ error: 'Server error' });
			            }
			            
			            log.error('Internal error(%d): %s',res.statusCode,err.message);
			        }
			    });
			}	else {
				 res.statusCode = 404;
		         return res.send({ error: 'Mandatory Not found' });
			}
	});	


	//
	// PUT API   ----------------------------------------------------------------------------
	//	
	
	//modification d'un contrat (via son id MongoDb)
	app.put('/api/contract/:id', 
			//passport.authenticate('bearer', { session: false }), 
			function (req, res){
			return Contract.findById(req.params.id, function (err, contract) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	        
	        //update if parameter
	        req.body.hasOwnProperty('userId')?(contract.userId = req.body.userId):(contract.userId = contract.userId);
	        req.body.hasOwnProperty('contractId')?(contract.contractId = req.body.contractId):(contract.contractId = contract.contractId);
	        req.body.hasOwnProperty('kind')?(contract.kind = req.body.kind):(contract.kind = contract.kind);
	        req.body.hasOwnProperty('title')?(contract.title = req.body.title):(contract.title = contract.title);
	        req.body.hasOwnProperty('duration')?(contract.duration = req.body.account):(contract.duration = contract.duration);	  
	        req.body.hasOwnProperty('iban')?(contract.iban = req.body.iban):(contract.iban = contract.iban);	        	        
	        req.body.hasOwnProperty('amount')?(contract.amount = req.body.amount):(contract.amount = contract.amount);
	        req.body.hasOwnProperty('created')?(contract.created = req.body.created):(contract.created = contract.created);
	        req.body.hasOwnProperty('dismiss')?(contract.dismiss = req.body.dismiss):(contract.dismiss = contract.dismiss);
	        req.body.hasOwnProperty('signature_date')?(contract.signature_date = req.body.signature_date):(contract.signature_date = contract.signature_date);
	        
	        //save me
	        return contract.save(function (err) {
	            if (!err) {
	                log.info("contract updated");
	                return res.json({ status: 'OK', contract:contract });
	            } else {
	                if(err.name == 'ValidationError') {
	                    res.statusCode = 400;
	                    res.send({ error: 'Validation error' });
	                } else {
	                    res.statusCode = 500;
	                    res.send({ error: 'Server error' });
	                }
	                
	                log.error('Internal error(%d): %s',res.statusCode,err.message);
	            }
	        });
	    });
	});


	//
	// DELETE API  ----------------------------------------------------------------------------
	//		
	
	//suppression d'un contrat (via son id MongoDb)		
	app.delete('/api/contract/:id', 
		//passport.authenticate('bearer', { session: false }), 
		function (req, res){
	    return Contract.findById(req.params.id, function (err, contract) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	        
	        return contract.remove(function (err) {
	            if (!err) {
	                log.info("contract removed");
	                return res.send({ status: 'OK' });
	            } else {
	                res.statusCode = 500;
	                log.error('Internal error(%d): %s',res.statusCode,err.message);
	                return res.send({ error: 'Server error' });
	            }
	        });
	    });
	});	
	
}