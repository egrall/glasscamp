// Inclusion de Mongoose
var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var crypto      = require('crypto');
var log         = require('../libs/log')(module);

var Metakeys = new Schema({
	value: {
        type: String,
        required: true
    },
    type: { 
    	type: String, 
    	required: false
    }
});


var MetakeysModel = mongoose.model('Metakeys', Metakeys);
module.exports.MetakeysModel = MetakeysModel;

