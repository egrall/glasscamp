
var validator = require('validator');


module.exports = function(app, log, passport) {
	
	//
	// GET API ----------------------------------------------------------------------------
	//
	
	var jsondata = { test : 'test GET'};
		
	//PUBLIC API ABM AUTOMATIC BANKING MACHINE (without token oAuth.2.0)
	app.get('/api/test', function (req, res) {
         return res.json(jsondata);
	});	
	
	
	
	//
	// POST API  ----------------------------------------------------------------------------
	//
	
	app.post('/api/test',
		//passport.authenticate('bearer', { session: false }), 
		function(req, res) {
			//mandatory --------------------------------
			if (req.body.hasOwnProperty('test')	)
			{ //------------------------------------------
			    
				return res.send({ status: 'OK', test:req.body.test });
			}
	});	


	//
	// PUT API   ----------------------------------------------------------------------------
	//	
	
	app.put('/api/abm/:id', 
			//passport.authenticate('bearer', { session: false }), 
			function (req, res) {

	            res.statusCode = 404;
	            return res.send({ status: 'OK', put : req.params.id });
	});


	//
	// DELETE API  ----------------------------------------------------------------------------
	//		
	
	app.delete('/api/abm/:id', 
		//passport.authenticate('bearer', { session: false }), 
		function (req, res){
            res.statusCode = 404;
            return res.send({ status: 'OK', del : req.params.id });
	});	
	
}