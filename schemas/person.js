var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var log         = require('../libs/log')(module);

var Location = require('./location').LocationModel;
var Phone = require('./phone').PhoneModel;
var Mail = require('./mail').MailModel;
var Picture = require('./picture').PictureModel;
var Relation = require('./relation').RelationModel;



var Person = new Schema({
    userId: {
        type: String,
        required: true
    },
	name:  {
		last_name: { type: String, required: true },
		first_name: { type: String, required: true },
		middle_name: { type: String}
	},
    displayName: { type: String },	
    locations: [Location.schema],
    phones: [Phone.schema],
    emails: [Mail.schema],
    photos: [Picture.schema],
    relation: [Relation.schema],
    created: { type: Date, default: Date.now },
    dismiss: { type: Date }, 
    lastmodified: { type: Date, default: Date.now } 
 });

Person.virtual('personId')
.get(function () {
    return this.id;
});



var PersonModel = mongoose.model('Person', Person);
module.exports.PersonModel = PersonModel;