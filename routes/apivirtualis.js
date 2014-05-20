var validator 			= require('validator');
var assert 				= require('../libs/assert');
var fakerBank 			= require('../faker/fakerbank');
var CreditCard = require('../schemas/creditcard').CreditCardModel;


module.exports = function(app, log, passport) {

	//PUBLIC API VIRTUALIS (without token oAuth.2.0) --------
	
	//Service permettant de générer, à partir d'une carte réelle, une carte virtuelle
	app.get('/api/virtualis/virtualcard/:id', 
			//passport.authenticate('bearer', { session: false }), 
			function (req, res) {
				var virtualcard = fakerBank.creditcard.card();
				
			    var creditcard = new CreditCard({
			        userId: req.params.id,	
			        type: virtualcard.vendor,
			        number: virtualcard.cardNumber,	
			        expire_month: virtualcard.expire_month,	
			        expire_year: virtualcard.expire_month,
			        cryptogram: virtualcard.cryptogramNumber,
				    //arkea options -------
			        service : 'VIRTUALIS'
			    });
		    
			    creditcard.save(function (err) {
			        if (!err) {
			            log.info("virtualcard created");
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
		}
	);	
	
	//Service permettant d'obtenir la liste des cartes virtuelles actives générées à partir d'une carte réelle
	app.get('/api/virtualis/listvirtualcards/:id', 
			//passport.authenticate('bearer', { session: false }), 
			function (req, res) {
				return CreditCard.find()
						.where('userId').equals(req.params.id)
						.where('service').equals('VIRTUALIS')
						.sort('-created')
						.exec(function (err, creditCard) {
			        if (!err) {
			            return res.json(creditCard);
			        } else {
			            res.statusCode = 500;
			            log.error('Internal error(%d)',res.statusCode);
			            return res.send({ error: 'Server error' });
			        }
			 	});
		 	}
	);	
	
	
	//
	// DELETE API  ----------------------------------------------------------------------------
	//		
	
	app.delete('/api/virtualis/virtualcard/:id', 
		//passport.authenticate('bearer', { session: false }), 
		function (req, res){
	    return CreditCard.findById(req.params.id, function (err, creditCard) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	        
	        return creditCard.remove(function (err) {
	            if (!err) {
	                log.info("virtualcard removed");
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