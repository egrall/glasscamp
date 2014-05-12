var nodemailer = require('nodemailer');
var config = require('./config');
var jade = require('jade');
var path = require('path');
var log  = require('./log')(module);
var style = require('../templates/style').style;

var templatesDir = path.resolve(__dirname, '..', 'templates');
var EmailAddressRequiredError = new Error('email address required');

// create a defaultTransport using gmail and authentication that are stored in the `config.js` file.
var defaultTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "x@gmail.com",
        pass: "x@x"
    }
});

var sendMail = function (templateName, mailOptions , fn) {
	 // make sure that we have an user email
	 if (!mailOptions.email) {
	   return fn(EmailAddressRequiredError);
	 }
	 // make sure that we have a message
	 if (!mailOptions.subject) {
	   return fn(EmailAddressRequiredError);
	 }
	 var options = {
			  model: {
				    name: mailOptions.name,
				    confimUrl: mailOptions.confimUrl
				  }
			};	 
	  
	 jade.renderFile(templatesDir + '/' + templateName + '.jade', options, function(err, html){
		 if (err) {
			 return fn(err);
		 } else {
			 
			 //insert style css
			 var html = html.replace("<head>",style);

			 var transport = defaultTransport;
    	     transport.sendMail({
    	       from: config.get('mailer:defaultFromAddress'),
    	       to: mailOptions.email,
    	       subject: mailOptions.subject,
    	       generateTextFromHTML: true,   
    	       html: html
    	     	}, function (err, responseStatus) {
    	       if (err) {
    	         return fn(err);
    	       }
    	       
    	       return fn(null, responseStatus.message, html);
    	     });			 
		 }
	});
};


module.exports.sendMail = sendMail;