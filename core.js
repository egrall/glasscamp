var express = require('express');
var config = require('./libs/config');
var log = require('./libs/log')(module);
var path = require('path');

var cookieParser	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var favicon 		= require('static-favicon');
var session     	= require('express-session')

var flash = require('connect-flash');
var passport = require('passport');
var oauthprovider	= require('./libs/oauthprovider');
var mailer = require('./libs/mailer');


//BANK SCHEMA USING ------------------------------------------------
var Agency = require('./schemas/agency').AgencyModel;
var Agent = require('./schemas/agent').AgentModel;
var Person = require('./schemas/person').PersonModel;
var CreditCard = require('./schemas/creditcard').CreditCardModel;
var Transaction = require('./schemas/transaction').TransactionModel;
var Contract = require('./schemas/contract').ContractModel


//OAuth Front Module
require('./libs/strategy');

var app = express();
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {

	app.use(cookieParser('glasscamp'));
	app.use(bodyParser());
	app.use(session({ secret: 'glasscamp' }));
	app.use(favicon(__dirname + '/public/favicon.ico'));
	//app.use(express.methodOverride());
    
	app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use('/public', express.static(path.join(__dirname, 'public')));    
}


//public access --------------

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
 * API BANK ARKEA   ----------------------------
 */

require('./routes/apiversion')(app, log, passport);						//API INFOS (without token oAuth.2.0) -------------------------------------
require('./routes/apitest')(app, log, passport);						//API TEST PRIMITIVES (without token oAuth.2.0) -------------------------------------

require('./routes/apiagency')(app, log, passport, Agency);				//API AGENCY (without token oAuth.2.0) -------------------------------------
require('./routes/apiagent')(app, log, passport, Agent);				//API AGENT (without token oAuth.2.0) -------------------------------------
require('./routes/apiperson')(app, log, passport, Person);				//API PERSON (without token oAuth.2.0) -------------------------------------
require('./routes/apicreditcard')(app, log, passport, CreditCard);  	//API CREDITCARD (without token oAuth.2.0) -------------------------------------
require('./routes/apicontract')(app, log, passport, Contract);			//API PRODUCTS (without token oAuth.2.0) -------------------------------------
require('./routes/apitransaction')(app, log, passport, Transaction);	//API TRANSACTION (without token oAuth.2.0) -------------------------------------

require('./routes/apivirtualis')(app, log, passport, CreditCard);		//API VIRTUALIS (without token oAuth.2.0) -------------------------------------


/*  -----------------------------------------
 *  -----------------------------------------
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

