//Credit Card Schema description --

var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var crypto      = require('crypto');
var log         = require('../libs/log')(module);


var Links = new Schema({
    href: {
        type: String,
        required: false
    },
    rel: {
        type: String,
        required: false
    },
    method: {
        type: String,
        required: false
    },
});


var CreditCard = new Schema({
    userId: {
        type: String,
        required: true
    },	
    //paypal options -------
	idCard: {
        type: String,
        required: false
    },
    valid_until: {
        type: String,
        required: false
    },
    state: {
        type: String,
        default: 'active',
        required: false
    },
    payer_id:  {
        type: String,
        required: false
    },
    // end of
    type:  {
        type: String,
        required: true
    },
    number:  {
        type: String,
        required: true
    },
    cryptogram: {
        type: String,
        required: true    	
    },
    expire_month:  {
        type: String,
        required: true
    },
    expire_year:  {
        type: String,
        required: true
    },
    first_name:  {
        type: String,
        required: false
    },
    last_name:  {
        type: String,
        required: false
    },
    service : {
    	type : String,
        required: false    	
    },
    created: { 
    	type: Date, 
    	default: Date.now 
    },
    links: [Links]
});


var CreditCardModel = mongoose.model('CreditCard', CreditCard);
module.exports.CreditCardModel = CreditCardModel;

