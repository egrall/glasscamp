module.exports = function(app, log, passport) {
	
	var pjson = require('../package.json');
	var infos = {
			name : pjson.name,
			version : pjson.version,
			author : pjson.author,
			description : pjson.description,
			contributors : pjson.contributors,
			repository : pjson.repository.url,
			license : pjson.license
		    };
	
	app.get('/api/version', function (req, res) {
        return res.json(infos);
	});	
	
}