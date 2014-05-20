module.exports = function(app, log, passport, Profil) {

	app.get('/api/profil/:id',
			passport.authenticate('bearer', { session: false }), 
			function(req, res) {
			    return Profil.findById(req.params.id, function (err, profil) {
			        if (!profil) {
			            return res.send(profil);
			        } else {
			            res.statusCode = 500;
			            log.error('Internal error(%d): %s',res.statusCode,err.message);
			            return res.send({ error: 'Server error' });
			        }
			    });
		});


	app.put('/api/profil/:id', passport.authenticate('bearer', { session: false }), function (req, res){
	    return Profil.findById(req.params.id, function (err, profils) {
	        if(!profils) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }

	        profils.title = req.body.title;
	        //To be defined
	        return profils.save(function (err) {
	            if (!err) {
	                log.info("article updated");
	                return res.send({ status: 'OK', profils:profils });
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


	app.delete('/api/profil/:id', passport.authenticate('bearer', { session: false }), function (req, res){
	    return Profil.findById(req.params.id, function (err, profil) {
	        if(!profil) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	        return profil.remove(function (err) {
	            if (!err) {
	                log.info("profil removed");
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