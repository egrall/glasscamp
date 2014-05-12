// Inclusion de Mongoose
var mongoose = require('./mongoose').mongoose;
var Schema = require('./mongoose').Schema;

var config      = require('./config');
var crypto      = require('crypto');
var log         = require('./log')(module);

var Client = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    clientId: {
        type: String,
        unique: true,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    }
});

var ClientModel = mongoose.model('Client', Client);
module.exports.ClientModel = ClientModel;
