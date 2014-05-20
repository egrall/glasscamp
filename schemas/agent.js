var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var log         = require('../libs/log')(module);

var Location = require('./location').LocationModel;
var Phone = require('./phone').PhoneModel;
var Mail = require('./mail').MailModel;
var Picture = require('./picture').PictureModel;

var Agent = new Schema({
    agentId : { type: String, required: false },
    description : { type: String, required: false },
	last_name: { type: String,	required: true	},
	first_name: {type: String, required: true },
    locations: [Location.schema],
	phones: [Phone.schema],
	emails: [Mail.schema],
    photos: [Picture.schema],	
	userIDs: [ { type : String }]

});


var AgentModel = mongoose.model('Agent', Agent);
module.exports.AgentModel = AgentModel;