// Inclusion de Mongoose
var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var crypto      = require('crypto');
var log         = require('../libs/log')(module);


var Location = new Schema({
	address: {
        type: String,
        required: true
    },
    postcode: { 
    	type: String, 
    	required: false
    },
    city: { 
    	type: String, 
    	required: true
    },
    country: { 
    	type: String, 
    	required: true
    },
    locations : {
    	kind: {
            type: String,
            enum: ['personnal','professional','local', 'head_office'],
            required: false
        },    	
    	latitude : { type : Number },
    	longitude : { type : Number }
    }    
}, {_id: false});


var LocationModel = mongoose.model('Location', Location);
module.exports.LocationModel = LocationModel;

