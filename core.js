var express = require('express');
var config = require('./libs/config');
var log = require('./libs/log')(module);
var path = require('path');
var fs = require('fs');

var cookieParser	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var favicon 		= require('static-favicon');
var session     	= require('express-session')

var flash = require('connect-flash');
var passport = require('passport');
var oauthprovider	= require('./libs/oauthprovider');
var mailer = require('./libs/mailer');


//OAuth Front Module
require('./libs/strategy');

var app = express();
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {

	app.use(cookieParser('glasscamp'));
	app.use(bodyParser());
	app.use(session({ secret: 'glasscamp' }));
	app.use(favicon(__dirname + '/public/favicon.ico'));	//TBD
	//app.use(express.methodOverride());
    
	app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin',      req.headers.origin);
        res.header('Access-Control-Allow-Methods',     'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers',     'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
      });    
    
    app.use('/public', express.static(path.join(__dirname, 'public')));    
}


//public access --------------
//app.all('/', function(req, res, next) {
//	  res.header("Access-Control-Allow-Origin", "*");
//	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
//	  next();
//	 });    

app.get('/', function (req, res) {
    res.sendfile('public/index.html');
});


//oAUTH PROVIDER   -------------------------------------
app.post('/oauth/token', oauthprovider.token);

//oAUTH PROVIDER INFO ------------------------------------
app.get('/api/userInfo',
	    passport.authenticate('bearer', { session: false }),
	        function(req, res) {
	            res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
	        }
	);


/*
 * API BANK ARKEA   ######################################################################
 */

fs.readdirSync(__dirname + '/routes').forEach(function(filename) {
	  if (/\.js$/.test(filename)) {
	    var name = path.basename(filename, '.js');
	    require('./routes/' + name)(app, log, passport);
	  }
	});


/*
 *  ######################################################################################
 */



// more middleware (executes after routes) -- error handling middleware

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(req, res, next){
    res.status(401);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});    

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});  



//HTTP or API Server -------------------------------------
app.listen(config.get('port'), function(){
    log.info('Glass Camp Faker server listening on port ' + config.get('port'));
});

