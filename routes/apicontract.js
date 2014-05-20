
var validator 		= require('validator');
var fakerBank 		= require('../faker/fakerbank');


module.exports = function(app, log, passport, Contract) {
	
	//
	// GET API ----------------------------------------------------------------------------
	//
	
	
	//PUBLIC API PRODUCT (without token oAuth.2.0) ------ >> ONLY FOR TESTING
	app.get('/api/contract', function (req, res) {
	    return Contract.find(function (err, contract) {
	        if (!err) { 
	            return res.json(contract);
	        } else {
	        	 res.statusCode = 404;
		         return res.send({ error: 'Not found' });
	        }
	    });
	});	
	
	//recuperation des contrats de la personne par l'identifiant userId
	app.get('/api/contract/person/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Contract.find({ userId : req.params.id }, function (err, contract) {
			        if (!err) {
			            return res.json(contract);
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
		            return res.json(contract);
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
		            return res.json(contract);
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
				req.body.hasOwnProperty('kind') ||
				req.body.hasOwnProperty('duration') ||	
				req.body.hasOwnProperty('account') ||			
				req.body.hasOwnProperty('created')
				)
			{ //------------------------------------------
				
		        var createdContract = req.query.created.match(/\d{4}\/\d{2}\/\d{2}/);		// Format YYYY/MM/DD
				
			    var contract = new Contract({
			        userId: req.body.userId,	
			        kind :  req.body.kind,
			        title	: req.body.hasOwnProperty('title')?req.body.title:'',
			        duration :  req.body.duration,
			        iban: req.body.hasOwnProperty('iban')?(req.body.iban):(fakerBank.product.iban()),	        
			        account:  req.body.account,
			        created: new Date(createdContract),
			        dismiss: req.body.hasOwnProperty('dismiss')?(new Date(req.query.dismiss.match(/\d{4}\/\d{2}\/\d{2}/))):'',
			        signature_date: req.body.hasOwnProperty('signature_date')?(new Date(req.query.signature_date.match(/\d{4}\/\d{2}\/\d{2}/))):''
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
	        req.body.hasOwnProperty('userId')?(transaction.userId = req.body.userId):(contract.userId = contract.userId);
	        req.body.hasOwnProperty('kind')?(contract.kind = req.body.kind):(contract.kind = contract.kind);
	        req.body.hasOwnProperty('title')?(contract.title = req.body.title):(contract.title = contract.title);
	        req.body.hasOwnProperty('duration')?(contract.duration = req.body.account):(contract.duration = contract.duration);	  
	        req.body.hasOwnProperty('iban')?(contract.iban = req.body.iban):(contract.iban = contract.iban);	        	        
	        req.body.hasOwnProperty('account')?(contract.account = req.body.account):(contract.account = contract.account);
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