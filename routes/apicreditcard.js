var validator = require('validator');
var assert = require('../libs/assert');

var CreditCard = require('../schemas/creditcard').CreditCardModel;


module.exports = function(app, log, passport) {

	
	//PUBLIC API CREDITCARD (without token oAuth.2.0) -------- >> FOR TESTING
	app.get('/api/creditcard', 
			//passport.authenticate('bearer', { session: false }), 
			function (req, res) {
		    return CreditCard.find(function (err, creditCard) {
		        if (!err) {
		            return res.json({creditCard:creditCard});
		        } else {
		            res.statusCode = 500;
		            log.error('Internal error(%d)',res.statusCode);
		            return res.send({ error: 'Server error' });
		        }
		    });
	});		
	
	app.get('/api/creditcard/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return CreditCard.findById(req.params.id, function (err, creditcard) {
			        if (!err) {
			            return res.json({creditCard:creditCard});
			        } else {
			            res.statusCode = 500;
			            log.error('Internal error(%d)',res.statusCode);
			            return res.send({ error: 'Server error' });
			        }
			    });
		});
	
	app.get('/api/creditcard/person/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			log.info('/api/creditcard/person/%s', req.params.id);
	
		    return CreditCard.find({ userId : req.params.id }, function (err, creditCard) {
		        if (!err) {
		            return res.send({creditCard:creditCard});
		        } else {
		            res.statusCode = 500;
		            log.error('Internal error(%d)',res.statusCode);
		            return res.send({ error: 'Server error' });
		        }
		    });
		});	
	
	
	app.post('/api/creditcard',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {		
			
				if (//mandatory ------------------------------------
					req.body.hasOwnProperty('userId') ||
					req.body.hasOwnProperty('number') ||
					req.body.hasOwnProperty('cryptogram') ||				
					req.body.hasOwnProperty('type') ||				
					req.body.hasOwnProperty('expire_month')||				
					req.body.hasOwnProperty('expire_year')
					)
				{ //---------------------------------------------------
					//validator
					//if(validator.isCreditCard (req.body.number)) {
						
					    var creditcard = new CreditCard({
					        userId: req.body.userId,	
					        type: req.body.type,
					        number: req.body.number,	
					        expire_month: req.body.expire_month,	
					        expire_year: req.body.expire_month,
					        cryptogram: req.body.expire_year,
					        first_name : req.body.hasOwnProperty('first_name')?req.body.first_name:'',
						    last_name : req.body.hasOwnProperty('last_name')?req.body.last_name:'',
						    //paypal options -------
						    idCard : req.body.hasOwnProperty('idCard')?req.body.idCard:'',
						    valid_until : req.body.hasOwnProperty('valid_until')?req.body.valid_until:'',
						    payer_id : req.body.hasOwnProperty('payer_id')?req.body.payer_id:''
					    });
				    
					    creditcard.save(function (err) {
					        if (!err) {
					            log.info("creditcard created");
					            return res.send({ status: 'OK', creditcard:creditcard });
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
					//}
				}	else {
					 res.statusCode = 404;
			         return res.send({ error: 'Mandatory Not found' });
				}
	 });		


	app.put('/api/creditcard/:id', 
			//passport.authenticate('bearer', { session: false }), 
			function (req, res){
			return CreditCard.findById(req.params.id, function (err, creditCard) {
	        if(!creditCard) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }

	        creditCard.title = req.body.title;
	        
	        //To be defined
	        return creditCard.save(function (err) {
	            if (!err) {
	                log.info("article updated");
	                return res.send({ status: 'OK', creditCard:creditCard });
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


	app.delete('/api/creditcard/:id', 
		//passport.authenticate('bearer', { session: false }), 
		function (req, res){
	    return CreditCard.findById(req.params.id, function (err, creditCard) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	        return creditCard.remove(function (err) {
	            if (!err) {
	                log.info("CreditCard removed");
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