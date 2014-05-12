var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var log         = require('../libs/log')(module);

var Location = require('./location').LocationModel;


var Abm = new Schema({
	name: { type: String,	required: true	},
    description : { type: String, required: false },
    locations: [Location.schema]
});


var AbmModel = mongoose.model('Abm', Abm);
module.exports.AbmModel = AbmModel;