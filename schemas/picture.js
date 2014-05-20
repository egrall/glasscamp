// Inclusion de Mongoose
var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var crypto      = require('crypto');
var log         = require('../libs/log')(module);


var Picture = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail', 'avatar', 'logo'],
        required: false
    },
    url: { 
    	type: String, 
    	required: false 
    }
}, {_id: false});


var PictureModel = mongoose.model('Picture', Picture);
module.exports.PictureModel = PictureModel;

