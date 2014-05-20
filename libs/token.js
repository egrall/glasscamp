// Inclusion de Mongoose
var mongoose = require('./mongoose').mongoose;
var Schema = require('./mongoose').Schema;
var config      = require('./config');
var crypto      = require('crypto');
var log         = require('./log')(module);

var AccessToken = new Schema({
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});


// RefreshToken

var RefreshToken = new Schema({
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var AccessTokenModel = mongoose.model('AccessToken', AccessToken);
var RefreshTokenModel = mongoose.model('RefreshToken', RefreshToken);

module.exports.AccessTokenModel = AccessTokenModel;
module.exports.RefreshTokenModel = RefreshTokenModel;