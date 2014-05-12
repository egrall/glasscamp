// Inclusion de Mongoose
var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var crypto      = require('crypto');
var log         = require('../libs/log')(module);

var Web = new Schema({
	value: {
        type: String,
        required: true
    },
    type: { 
    	type: String, 
    	required: false
    }
}, {_id: false});


var WebModel = mongoose.model('Web', Web);
module.exports.WebModel = WebModel;

