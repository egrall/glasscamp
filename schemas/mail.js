// Inclusion de Mongoose
var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var crypto      = require('crypto');
var log         = require('../libs/log')(module);
var validator = require('validator');



var Mail = new Schema({
	value: {
        type: String,
        required: true
    },
    kind: { 
    	type: String, 
    	required: false
    }
}, {_id: false});


var MailModel = mongoose.model('Mail', Mail);
module.exports.MailModel = MailModel;

