var mongoose = require('../libs/mongoose').mongoose;
var Schema = require('../libs/mongoose').Schema;
var log         = require('../libs/log')(module);


var arkeaHeader = new Schema({
	codeSI : { type : Number, min : 0 },
	codeEFS : { type : Number, min : 0 },
	structure : { type : String, min : 0 },
	timeStamp: { type: Date, default: Date.now }
});


var arkeaHeaderModel = mongoose.model('arkeaHeader', arkeaHeader);
module.exports.arkeaHeaderModel = arkeaHeaderModel;