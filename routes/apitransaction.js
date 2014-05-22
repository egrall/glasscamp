
var validator = require('validator');
var Transaction = require('../schemas/transaction').TransactionModel;

module.exports = function(app, log, passport) {
	
	//
	// GET API ----------------------------------------------------------------------------
	//
	
	
	//PUBLIC API TRANSACTION (without token oAuth.2.0) ------ >>FOR TESTING
	app.get('/api/transaction', function (req, res) {
	    return Transaction.find(function (err, transaction) {
	        if (!err) { 
	            return res.json({transaction:transaction});
	        } else {
	        	 res.statusCode = 404;
		         return res.send({ error: 'Not found' });
	        }
	    });
	});	
	
	
	app.get('/api/transaction/person/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Transaction.find({ userId : req.params.id }, function (err, transaction) {
			        if (!err) {
			            return res.json({transaction:transaction});
			        } else {
			        	 res.statusCode = 404;
				         return res.send({ error: 'Not found' });
			        }
			    });
		}
	);
	
	app.get('/api/transaction/date/:id', function (req, res) {
        
		if (req.query.hasOwnProperty('mindate') ||
			req.query.hasOwnProperty('maxdate') 
			)
			{ //------------------------------------------
	        var mindateString = req.query.mindate.match(/\d{4}\/\d{2}\/\d{2}/);		// Format YYYY/MM/DD
	        var maxdateString = req.query.maxdate.match(/\d{4}\/\d{2}\/\d{2}/);
	
		    return	Transaction.find({ userId : req.params.id }).where('operationDate').gt(new Date(mindateString)).lt(new Date(maxdateString)).exec(function (err, transaction) {
		        if (!err) {
		            return res.json({transaction:transaction});
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
	
	app.post('/api/transaction',
		//passport.authenticate('bearer', { session: false }), 
		function(req, res) {
			//mandatory --------------------------------
			if (req.body.hasOwnProperty('userId') ||
				req.body.hasOwnProperty('kind') ||
				req.body.hasOwnProperty('title') ||	
				req.body.hasOwnProperty('account') ||			
				req.body.hasOwnProperty('operationDate')
				)
			{ //------------------------------------------
				
		        var operation = req.query.operationDate.match(/\d{4}\/\d{2}\/\d{2}/);		// Format YYYY/MM/DD
				
			    var transaction = new Transaction({
			        userId: req.body.userId,	
			        title:  req.body.title,
			        kind :  req.body.kind,
			        vendor : req.body.hasOwnProperty('vendor')?req.body.vendor:'',
			        description	: req.body.hasOwnProperty('description')?req.body.description:'',
			        account:  req.body.account,
			        operationDate: new Date(operation),
			        customerDate: req.body.hasOwnProperty('customerDate')?(new Date(req.query.customerDate.match(/\d{4}\/\d{2}\/\d{2}/))):'',
			        signature_date: req.body.hasOwnProperty('signature_date')?(new Date(req.query.signature_date.match(/\d{4}\/\d{2}\/\d{2}/))):'',
					photos: [ { url : req.body.hasOwnProperty('photo')?req.body.photo:''}],
			    });
		    
			    transaction.save(function (err) {
			        if (!err) {
			            log.info("transaction created");
			            return res.send({ status: 'OK', transaction:transaction });
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
	});	


	//
	// PUT API   ----------------------------------------------------------------------------
	//	
	
	app.put('/api/transaction/:id', 
			//passport.authenticate('bearer', { session: false }), 
			function (req, res){
			return Transaction.findById(req.params.id, function (err, transaction) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	        
	        //modify if necessary
	        req.body.hasOwnProperty('userId')?(transaction.userId = req.body.userId):(transaction.userId = transaction.userId);
	        req.body.hasOwnProperty('kind')?(transaction.kind = req.body.kind):(transaction.kind = transaction.kind);
	        req.body.hasOwnProperty('title')?(transaction.title = req.body.title):(transaction.title = transaction.title);
	        req.body.hasOwnProperty('account')?(transaction.account = req.body.account):(transaction.account = transaction.account);
	        req.body.hasOwnProperty('operationDate')?(transaction.operationDate = req.body.operationDate):(transaction.operationDate = transaction.operationDate);
	        
	        req.body.hasOwnProperty('vendor')?(transaction.vendor = req.body.vendor):(transaction.vendor = transaction.vendor);
	        req.body.hasOwnProperty('description')?(transaction.description = req.body.description):(transaction.description = transaction.description);
	        req.body.hasOwnProperty('vendor')?(transaction.vendor = req.body.vendor):(transaction.vendor = transaction.vendor);
	        req.body.hasOwnProperty('customerDate')?(transaction.customerDate = req.body.customerDate):(transaction.customerDate = transaction.customerDate);
	        req.body.hasOwnProperty('signature_date')?(transaction.signature_date = req.body.signature_date):(transaction.signature_date = transaction.signature_date);
	        req.body.hasOwnProperty('photos')?(transaction.photos = [{ url : req.body.photo}]):(transaction.photos = transaction.photos);
	        		        
	        //save me
	        return transaction.save(function (err) {
	            if (!err) {
	                log.info("transaction updated");
	                return res.json({ status: 'OK', transaction:transaction });
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
	
	app.delete('/api/transaction/:id', 
		//passport.authenticate('bearer', { session: false }), 
		function (req, res){
	    return Transaction.findById(req.params.id, function (err, transaction) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	        
	        return transaction.remove(function (err) {
	            if (!err) {
	                log.info("transaction removed");
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