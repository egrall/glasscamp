
var validator = require('validator');
var fakerBank 			= require('../faker/fakerbank');  //To generate latitude & longitude


module.exports = function(app, log, passport, Agent) {
	
	//
	// GET API ----------------------------------------------------------------------------
	//
	
	
	//PUBLIC API AGENT (without token oAuth.2.0) ------ >>FOR TESTING
	app.get('/api/agent', function (req, res) {
	    return Agent.find(function (err, agent) {
	        if (!err) { 
	            return res.json(agent);
	        } else {
	        	 res.statusCode = 404;
		         return res.send({ error: 'Not found' });
	        }
	    });
	});	
	
	
	app.get('/api/agent/id/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Agent.find({ agentId : req.params.id }, function (err, agent) {
			        if (!err) {
			            return res.json(agent);
			        } else {
			        	 res.statusCode = 404;
				         return res.send({ error: 'Not found' });
			        }
			    });
		}
	);	
	
	app.get('/api/agent/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Agent.findById(req.params.id, function (err, agent) {
			        if (!err) {
			            return res.json(agent);
			        } else {
			        	 res.statusCode = 404;
				         return res.send({ error: 'Not found' });
			        }
			    });
		}
	);
	
	
	app.get('/api/agent/person/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Agent.find({ userIDs : req.params.id }, function (err, agent) {
			        if (!err) {
			            return res.json(agent);
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
	
	app.post('/api/agent',
		//passport.authenticate('bearer', { session: false }), 
		function(req, res) {
			//mandatory --------------------------------
			if (req.body.hasOwnProperty('last_name') ||
				req.body.hasOwnProperty('first_name') ||
				req.body.hasOwnProperty('mail')
				)
			{ //------------------------------------------
			
			    var agent = new Agent({
			    	adviser	: req.body.hasOwnProperty('adviser')?req.body.adviser:'',
			    	description	: req.body.hasOwnProperty('description')?req.body.description:'',
			    	last_name: req.body.last_name,	
			    	first_name :  req.body.first_name,
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
			    	userIDs : [req.body.hasOwnProperty('userId')?req.body.userId:'' ]
			    });
		    
			    agent.save(function (err) {
			        if (!err) {
			            log.info("agent created");
			            return res.send({ status: 'OK', agent:agent });
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
	
	app.put('/api/agent/:id', 
			//passport.authenticate('bearer', { session: false }), 
			function (req, res){
			return Agent.findById(req.params.id, function (err, agent) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	                   
	        
	        //modify if necessary
	        req.body.hasOwnProperty('adviser')?(agent.adviser = req.body.userId):(agent.userId = agent.userId);
	        req.body.hasOwnProperty('description')?(agent.description = req.body.description):(agent.description = agent.description);
	        req.body.hasOwnProperty('last_name')?(agent.titlast_namele = req.body.last_name):(agent.last_name = agent.last_name);
	        req.body.hasOwnProperty('first_name')?(agent.first_name = req.body.first_name):(agent.first_name = agent.first_name);	  
	        req.body.hasOwnProperty('phone')?(agent.phones = [req.body.mail]):(agent.phones = agent.phones);	        	        
	        req.body.hasOwnProperty('mail')?(agent.emails = [{value: req.body.mail}]):(agent.emails = agent.emails);	        	        
	        
	        //save me
	        return agent.save(function (err) {
	            if (!err) {
	                log.info("agent updated");
	                return res.json({ status: 'OK', agent:agent });
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
	
	app.delete('/api/agent/:id', 
		//passport.authenticate('bearer', { session: false }), 
		function (req, res){
	    return Agent.findById(req.params.id, function (err, agent) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	        
	        return agent.remove(function (err) {
	            if (!err) {
	                log.info("agent removed");
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