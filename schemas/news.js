// Inclusion de Mongoose
var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var config      = require('../libs/config');
var crypto      = require('crypto');
var log         = require('../libs/log')(module);
var Location = require('./location').LocationModel;
var Picture = require('./picture').PictureModel;


var News = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    images: [Picture.schema],
    locations: [Location.schema],
    modified: { type: Date, default: Date.now },
    parentId: {
        type: String,
        required: true
    },	    
    votes : {
        plus : { type : Number, min : 0 },
        like : { type : Number, min : 0 }
    }
});

// validation
News.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});


News.virtual('plus')
	.set(function(plus) {
		this.votes.plus = plus;
	})
	.get(function() { return this.votes.plus; }
);


News.virtual('like')
	.set(function(like) {
		this.votes.like = like;
	})
	.get(function() { return this.votes.like; }
);



var NewsModel = mongoose.model('News', News);

module.exports.NewsModel = NewsModel;