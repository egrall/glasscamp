// Inclusion de Mongoose
var mongoose 	= require('../libs/mongoose').mongoose;
var Schema 		= require('../libs/mongoose').Schema;
var log         = require('../libs/log')(module);


var Relation = new Schema({
    userId: {
        type: String,
        required: true
    },
	kind: {
        type: String,
        required: false
    }
}, {_id: false});


var RelationModel = mongoose.model('Relation', Relation);
module.exports.RelationModel = RelationModel;
