// Inclusion de Mongoose

var mongoose = require('./mongoose').mongoose;
var Schema = require('./mongoose').Schema;
var crypto      = require('crypto');
var log         = require('./log')(module);

var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }, 
    created: {
        type: Date,
        default: Date.now
    },
    freeze: {
    	type: Boolean ,
    	default: true    	
    },
    dismiss: {
    	type: Date
    },    
	oAuthprovider : {
		type: String,
    	default: 'arkeaProvider'
	}
});
 
User.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

User.virtual('userId')
    .get(function () {
        return this.id;
    });

User.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('base64');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


User.methods.checkPassword = function(password) {
    log.info("checkPassword : "+password);
    return this.encryptPassword(password) === this.hashedPassword;
};


var UserModel = mongoose.model('User', User);
module.exports.UserModel = UserModel;

