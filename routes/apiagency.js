
var validator = require('validator');
var fakerBank 			= require('../faker/fakerbank');  //To generate latitude & longitude


module.exports = function(app, log, passport, Agency) {
	
	//
	// GET API ----------------------------------------------------------------------------
	//
	
	
	//PUBLIC API AGENCY (without token oAuth.2.0)
	app.get('/api/agency', function (req, res) {
	    return Agency.find(function (err, agency) {
	        if (!err) { 
	            return res.json(agency);
	        } else {
	        	 res.statusCode = 404;
		         return res.send({ error: 'Not found' });
	        }
	    });
	});	
	
	
	
	app.get('/api/agency/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Agency.findById(req.params.id, function (err, agency) {
			        if (!err) {
			            return res.json(agency);
			        } else {
			        	 res.statusCode = 404;
				         return res.send({ error: 'Not found' });
			        }
			    });
		}
	);
	
	app.get('/api/agency/name/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Agency.find({ name : req.params.id }, function (err, agency) {
			        if (!err) {
			            return res.json(agency);
			        } else {
			        	 res.statusCode = 404;
				         return res.send({ error: 'Not found' });
			        }
			    });
		}
	);	
	
	
	//
	// POST API  ----------------------------------------------------------------------------
	//
	
	app.post('/api/agency',
		//passport.authenticate('bearer', { session: false }), 
		function(req, res) {
			//mandatory --------------------------------
			if (req.body.hasOwnProperty('name') ||
				req.body.hasOwnProperty('phone')
				)
			{ //------------------------------------------
			
			    var agency = new Agency({
			    	name: req.body.name,
			    	description	: req.body.hasOwnProperty('description')?req.body.description:'',
			        locations: [ {	address : req.body.hasOwnProperty('address')?req.body.address:'',
			        				postcode : req.body.hasOwnProperty('postcode')?req.body.postcode:'',
			        				city : req.body.hasOwnProperty('city')?req.body.city:'',
			        				country : req.body.hasOwnProperty('country')?req.body.country:'',
		        				    locations : {
		        				    	kind: 'professional',    	
		        				    	latitude : req.body.hasOwnProperty('latitude')?req.body.latitude:fakerBank.address.latitude(),
		        				    	longitude : req.body.hasOwnProperty('longitude')?req.body.longitude:fakerBank.address.longitude()
		        				   }
        			 }],
			    	phones :  [{number : req.body.hasOwnProperty('phone')?req.body.phone:''}],
			    	emails:  [{value: req.body.mail}],			    	
			    	photos :  [{url : req.body.hasOwnProperty('photo')?req.body.photo:''}]  	
			    });
		    
			    agency.save(function (err) {
			        if (!err) {
			            log.info("agency created");
			            return res.send({ status: 'OK', agency:agency });
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
	
	app.put('/api/agency/:id', 
			//passport.authenticate('bearer', { session: false }), 
			function (req, res){
			return Agency.findById(req.params.id, function (err, agency) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	
	        //modify if necessary
	        req.body.hasOwnProperty('name')?(agency.name = req.body.name):(agency.name = agency.name);
	        req.body.hasOwnProperty('description')?(agency.description = req.body.description):(agency.description = agency.description);
	        req.body.hasOwnProperty('phone')?(agency.phones = [req.body.mail]):(agency.phones = agency.phones);	        	        
	        req.body.hasOwnProperty('mail')?(agency.emails = [{value: req.body.mail}]):(agency.emails = agency.emails);	
	        req.body.hasOwnProperty('photo')?(agency.photos = [{value: req.body.photo}]):(agency.photos = agency.photos);	        	        
	        req.body.hasOwnProperty('agent')?(agency.agents = [{value: req.body.agent}]):(agency.agents = agency.agents);	        	        
	        
	        //save me
	        return agency.save(function (err) {
	            if (!err) {
	                log.info("agency updated");
	                return res.json({ status: 'OK', agency:agency });
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
	
	app.delete('/api/agency/:id', 
		//passport.authenticate('bearer', { session: false }), 
		function (req, res){
	    return Agency.findById(req.params.id, function (err, agency) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	        
	        return agency.remove(function (err) {
	            if (!err) {
	                log.info("agency removed");
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