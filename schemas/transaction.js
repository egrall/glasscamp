// Inclusion de Mongoose
var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var log         = require('../libs/log')(module);

var Picture = require('./picture').PictureModel;


var Transaction = new Schema({
    userId: {
        type: String,
        required: true
    },	
    title : { type: String , required: true},
	kind: { type: String, required: true} ,    ///enum : ['CREDIT', 'DEBIT'], 
    vendor : { type: String},   
    description : { type: String},    
    account: {type: String, required: true},        
	operationDate: { type: Date, required: true},
	customerDate: { type: Date },    
    lastmodified: { type: Date, default: Date.now },
    photos: [Picture.schema],
    signature_date: { type: Date }
});


var TransactionModel = mongoose.model('Transaction', Transaction);
module.exports.TransactionModel = TransactionModel;
