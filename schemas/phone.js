// Inclusion de Mongoose
var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var crypto      = require('crypto');
var log         = require('../libs/log')(module);


var Phone = new Schema({
	number: {
        type: String,
        required: false
    },
   	kind: {
        type: String,
        required: false
    },
}, {_id: false});


var PhoneModel = mongoose.model('Phone', Phone);
module.exports.PhoneModel = PhoneModel;

