
var validator 			= require('validator');
var fakerBank 			= require('../faker/fakerbank');  //To generate latitude & longitude
var Person = require('../schemas/person').PersonModel;



module.exports = function(app, log, passport) {
	
	//
	// GET API ----------------------------------------------------------------------------
	//
	
	
	//PUBLIC API PERSON (without token oAuth.2.0) ------ >> FOR TESTING
	app.get('/api/person', function (req, res) {
	    return Person.find(function (err, person) {
	        if (!err) {
	            return res.json(person);
	        } else {
	        	 res.statusCode = 404;
		         return res.send({ error: 'Not found' });
	        }
	    });
	});	
	
	
	//PRIVATE API PERSON (with token oAuth.2.0) -------
	app.get('/api/person/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Person.findById(req.params.id, function (err, person) {
			        if (!err) {
			            return res.json(person);
			        } else {
			        	 res.statusCode = 404;
				         return res.send({ error: 'Not found' });
			        }
			    });
		});
	
	
	//PRIVATE API PERSON (with token oAuth.2.0) -----	
	app.get('/api/person/adresses/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Person.find({ userId : req.params.id }, function (err, person) {
			        if (!err) {
			            return res.json(person.locations);
			        } else {
			        	 res.statusCode = 404;
				         return res.send({ error: 'Not found' });
			        }
			    });
		});	
	
	app.get('/api/person/mails/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Person.find({ userId : req.params.id }, function (err, person) {
			        if (!err) {
			            return res.json(person.emails);
			        } else {
			        	 res.statusCode = 404;
				         return res.send({ error: 'Not found' });
			        }
			    });
		});	
	
	
	app.get('/api/person/phones/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Person.find({ userId : req.params.id }, function (err, person) {
			        if (!err) {
			            return res.json(person.phones);
			        } else {
			        	 res.statusCode = 404;
				         return res.send({ error: 'Not found' });
			        }
			    });
		});		
	
	
	app.get('/api/person/photos/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Person.find({ userId : req.params.id }, function (err, person) {
			        if (!err) {
			            return res.json(person.photos);
			        } else {
			        	 res.statusCode = 404;
				         return res.send({ error: 'Not found' });
			        }
			    });
		});		
	
	
	
	
	//
	// POST API  ----------------------------------------------------------------------------
	//
	
	app.post('/api/person',
		//passport.authenticate('bearer', { session: false }), 
		//var user-agent = req.headers['user-agent']
		function(req, res) {
		
			//mandatory --------------------------------
			if (req.body.hasOwnProperty('userId') ||
				req.body.hasOwnProperty('last_name') ||
				req.body.hasOwnProperty('first_name') ||	
				req.body.hasOwnProperty('mail') ||			
				req.body.hasOwnProperty('address') ||			
				req.body.hasOwnProperty('postcode') ||			
				req.body.hasOwnProperty('city') ||
				req.body.hasOwnProperty('country') ||			
				req.body.hasOwnProperty('phone')
				)
			{ //------------------------------------------
				//validator
				//if(validator.isEmail(req.body.mail)) {
				    var person = new Person({
				        userId: req.body.userId,	
				    	name:  {
				    		last_name: req.body.last_name,
				    		first_name: req.body.first_name,
				    		middle_name: req.body.hasOwnProperty('middle_name')?req.body.middle_name:''
				    	},
				    	displayName : req.body.hasOwnProperty('displayName')?req.body.displayName:'',
				        emails: [{value: req.body.mail}],
				        locations: [ {	address : req.body.address,
				        				postcode : req.body.postcode,
				        				city : req.body.city,
				        				country : req.body.country,
			        				    locations : {
			        				    	kind: 'personnal',    	
			        				    	latitude : req.body.hasOwnProperty('latitude')?req.body.latitude:fakerBank.address.latitude(),
			        				    	longitude : req.body.hasOwnProperty('longitude')?req.body.longitude:fakerBank.address.longitude()
			        				   }
				        			 }],
				        phones: [{number : req.body.phone}],
				        photos: [ { url : req.body.hasOwnProperty('avatar')?req.body.avatar:''}],
				    });
			    
				    person.save(function (err) {
				        if (!err) {
				            log.info("person created");
				            return res.send({ status: 'OK', person:person });
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


	//
	// PUT API   ----------------------------------------------------------------------------
	//	
	
	app.put('/api/person/:id', 
			//passport.authenticate('bearer', { session: false }), 
			function (req, res){
			return Person.findById(req.params.id, function (err, person) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }

	        //modify if necessary
	        req.body.hasOwnProperty('last_name')?person.name.last_name=req.body.last_name:'person.name.last_name';
	        req.body.hasOwnProperty('first_name')?person.name.first_name=req.body.first_name:'person.name.first_name';
	        req.body.hasOwnProperty('middle_name')?person.name.middle_name=req.body.middle_name:'person.name.middle_name';
	        
	        //save me
	        return person.save(function (err) {
	            if (!err) {
	                log.info("article updated");
	                return res.json({ status: 'OK', person:person });
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
	
	app.delete('/api/person/:id', 
		//passport.authenticate('bearer', { session: false }), 
		function (req, res){
	    return Person.findById(req.params.id, function (err, person) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	        
	        return person.remove(function (err) {
	            if (!err) {
	                log.info("person removed");
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