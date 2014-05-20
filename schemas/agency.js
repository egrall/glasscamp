var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var log         = require('../libs/log')(module);

var Location = require('./location').LocationModel;
var Phone = require('./phone').PhoneModel;
var Mail = require('./mail').MailModel;
var Picture = require('./picture').PictureModel;
var Agent = require('./agent').AgentModel;


var Agency = new Schema({
	agencyId : { type: String,	required: true	},
	name: { type: String,	required: true	},
    description : { type: String, required: false },
    locations: [Location.schema],
	phones: [Phone.schema],
	emails: [Mail.schema],
    photos: [Picture.schema],	
	agents: [{ type : String }]
});


var AgencyModel = mongoose.model('Agency', Agency);
module.exports.AgencyModel = AgencyModel;