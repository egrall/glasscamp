module.exports = function(app, log, passport) {
	
	var News = require('../schemas/news').NewsModel;

	//PUBLIC API NEWS (without token oAuth.2.0) -------------------------------------	
	app.get('/api/news', function (req, res) {
	    return News.find(function (err, news) {
	        if (!err) {
	            return res.send(news);
	        } else {
	            res.statusCode = 500;
	            log.error('Internal error(%d): %s',res.statusCode,err.message);
	            return res.send({ error: 'Server error' });
	        }
	    });
	});


	app.put('/api/news/:id', function (req, res) {
	    return News.findById(req.params.id, function (err, news) {
	        if(!news) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }

	        news.title = req.body.title;
	        news.description = req.body.description;
	        news.author = req.body.author;
	        news.images = req.body.images;
	        return news.save(function (err) {
	            if (!err) {
	                log.info("article updated");
	                return res.send({ status: 'OK', news:news });
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
	

	//PRIVATE API NEWS (with token oAuth.2.0) -------------------------------------	
	app.post('/api/news', passport.authenticate('bearer', { session: false }), function(req, res) {
	    var news = new News({
	        title: req.body.title,
	        author: req.body.author,
	        description: req.body.description,
	        images: req.body.images
	    });

	    news.save(function (err) {
	        if (!err) {
	            log.info("news created");
	            return res.send({ status: 'OK', news:news });
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
	});
	
	app.delete('/api/news/:id', passport.authenticate('bearer', { session: false }), function (req, res){
	    return News.findById(req.params.id, function (err, news) {
	        if(!news) {
	            res.statusCode = 404;
	            return res.send({ error: 'Not found' });
	        }
	        return news.remove(function (err) {
	            if (!err) {
	                log.info("news removed");
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