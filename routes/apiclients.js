module.exports = function(app, log, passport, Client) {
	
	app.get('/register/client', function (req, res) {
	    res.sendfile('public/client.html');
	});

	app.post('/register/client', function (req, res) {
		return Client.findOne({ name : req.body.name }, function (err, client) {
			if(!client)	{
				var client = new Client({
			    	name: req.body.name,
			    	clientId: req.body.clientId,
			    	clientSecret: req.body.clientSecret
			    });

				client.save(function(err, user) {
			        if(err) {
			        	log.error(err);
			        	res.statusCode = 404;
				        return res.send({ error: 'Not found' });		        	
			        }	else {
			        	log.info("New client - %s",client.name);
					    return res.sendfile('index.html');		        	
			        }
			    });					
			} else {
		    	res.statusCode = 404;
		        return res.send({ error: 'Already exits' });
			}
		});
	});
	
}