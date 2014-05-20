
var validator 			= require('validator');
var fakerBank 			= require('../faker/fakerbank');  //To generate latitude & longitude
var Abm 				= require('../schemas/abm').AbmModel;



module.exports = function(app, log, passport) {
	
	//
	// GET API ----------------------------------------------------------------------------
	//
	
	
	//PUBLIC API ABM AUTOMATIC BANKING MACHINE == GAB (without token oAuth.2.0)
	app.get('/api/abm', function (req, res) {
	    return Abm.find(function (err, abm) {
	        if (!err) { 
	            return res.json(abm);
	        } else {
	        	 res.statusCode = 404;
		         return res.send({ error: 'Not found' });
	        }
	    });
	});	
	
	
	
	app.get('/api/abm/:id',
			//passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Abm.findById(req.params.id, function (err, abm) {
			        if (!err) {
			            return res.json(abm);
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
	
	app.post('/api/abm',
		//passport.authenticate('bearer', { session: false }), 
		function(req, res) {
			//mandatory --------------------------------
			if (req.body.hasOwnProperty('name'))
			{ //------------------------------------------
			
			    var abm = new Abm({
			    	name: req.body.name,	
			    	description	: req.body.hasOwnProperty('description')?req.body.description:'',
			        locations: [ {	address : req.body.address,
        				postcode : req.body.postcode,
        				city : req.body.city,
        				country : req.body.country,
    				    locations : {
    				    	kind: 'personnal',    	
    				    	latitude : req.body.hasOwnProperty('latitude')?req.body.latitude:fakerBank.address.latitude(),
    				    	longitude : req.body.hasOwnProperty('longitude')?req.body.longitude:fakerBank.address.longitude()
    				   }
        			 }]
			    });
		    
			    abm.save(function (err) {
			        if (!err) {
			            log.info("abm created");
			            return res.send({ status: 'OK', abm:abm });
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
	
	app.put('/api/abm/:id', 
			//passport.authenticate('bearer', { session: false }), 
			function (req, res){
			return Abm.findById(req.params.id, function (err, abm) {
	        if(err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	
	        //modify if necessary
	        req.body.hasOwnProperty('name')?(abm.name = req.body.name):(abm.name = abm.name);
	        req.body.hasOwnProperty('description')?(abm.description = req.body.description):(abm.description = abm.description);
	        
	        //save me
	        return abm.save(function (err) {
	            if (!err) {
	                log.info("abm updated");
	                return res.json({ status: 'OK', abm:abm });
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
	
	app.delete('/api/abm/:id', 
		//passport.authenticate('bearer', { session: false }), 
		function (req, res){
	    return Abm.findById(req.params.id, function (err, abm) {
	        if(!err) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	        
	        return abm.remove(function (err) {
	            if (!err) {
	                log.info("abm removed");
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