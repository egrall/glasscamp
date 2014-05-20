// Inclusion de Mongoose
var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var crypto      = require('crypto');
var log         = require('../libs/log')(module);
var Picture = require('./picture').PictureModel;
var Location = require('./location').LocationModel;
var Phone = require('./phone').PhoneModel;
var Mail = require('./mail').MailModel;


var Profil = new Schema({
    userId: {
        type: String,
        required: true
    },	
	name:  {
		last_name: {
			type: String,
			required: true
		},
		first_name: {
			type: String,
			required: true
		},
		middle_name: {
			type: String
		}	
	},
	displayName: {
		type: String,
	},	
    locations: [Location.schema],
	phones: [Phone.schema],
	emails: [Mail.schema],
    photos: [Picture.schema],
    votes : {
        plus : { type : Number, min : 0 },
        like : { type : Number, min : 0 }
    }
});

Profil.virtual('profilId')
.get(function () {
    return this.id;
});

Profil.virtual('firstname')
	.set(function(firstname) {
	    this.name.first_name = firstname;
	})
	.get(function() { return this.name.first_name; }
);

Profil.virtual('lastname')
.set(function(lastname) {
    this.name.last_name = lastname;
})
.get(function() { return this.name.last_name; }
);


var ProfilModel = mongoose.model('Profil', Profil);
module.exports.ProfilModel = ProfilModel;

