module.exports = function(app, log, passport, mailer, User, Profil) {
	
	app.get('/register/user', function (req, res) {
	    res.sendfile('public/register.html');
	});	
	
	app.post('/register/user', function (req, res) {
		return Profil.findOne({ displayName : req.body.username }, function (err, profil) {
			if(!profil)	{
		    
			    var user = new User({ 
			    	username: req.body.username, 
			    	password: req.body.password,
			    	freeze:true	//mail confirmation waiting.
			    });
			    
			    user.save(function(err, user) {
			        if(err) return log.error(err);
			        else log.info("New user - %s:%s:%s",user.userId,user.username,user.password);
			    });
			    		    
			    var profil = new Profil({
			    	userId: user.userId,
			    	lastname: req.body.last_name,
			    	firstname: req.body.first_name,
			    	displayName: req.body.username,
			    	emails: [{ value : req.body.mail, kind: 'default' }]
			    });

			    profil.save(function (err) {
			        if(err) return log.error(err);
			        else log.info("New Profil - %s:%s:%s",profil.profilId,profil.displayName,profil.userId);
			    });
			    
			    
			    var locals = {
			    		   name: req.body.first_name,
			    	       email: req.body.mail,
			    	       subject: 'Confirmation Account User',
			    	       confimUrl: 'http://www.vytriol.com:8080/api/register/user/'+user.userId
			    	     };
			    
			    mailer.sendMail('register', locals, function (err, responseStatus, html) {
			        if(err) return log.error(err);
			        else log.info("Mail sending - %s",locals.name);
			    });  
			    
			    //return res.send({ status: 'OK'});
			    return res.sendfile('index.html');

			} else {
		    	res.statusCode = 404;
		        return res.send({ error: 'Not found' });
			}
		});
    });


app.get('/api/register/user/:id', function (req, res) {
	    return User.findById(req.params.id, function (err, user) {
	        if (!user) {
	            res.statusCode = 500;
	            log.error('Internal error(%d)',res.statusCode);
	            return res.send({ error: 'Server error' });	//html d'erreur de confirmation.
	        } else {
	        	//already registry
	        	if(!user.freeze)	{
	        		return res.sendfile('public/index.html');
	        	} else {
	            	user.freeze = false;
		            return user.save(function (err) {
		                if (!err) {
		                    log.info("user updated");
		    			    return  res.sendfile('public/confirm.html');
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
	        	}
	        }
	    });
	});
	
}