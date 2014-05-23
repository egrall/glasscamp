// Inclusion de Mongoose
var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var log         = require('../libs/log')(module);



var Contract = new Schema({
    userId: {
        type: String,
        required: true
    },	
	contractId: { type: String, required: true} ,    
	kind: { type: String, required: true} ,
    title : { type: String , required: false},	
    duration: {type: String, required: true},
    iban: { type: String, required: true}, 
    amount: {type: String, required: true},    
    created: { type: Date, required: true},
    dismiss: { type: Date },    
    lastmodified: { type: Date, default: Date.now },
    signature_date: { type: Date }
});


var ContractModel = mongoose.model('Contract', Contract);
module.exports.ContractModel = ContractModel;
