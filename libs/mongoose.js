// Inclusion de Mongoose
var mongoose = require('mongoose');
var config      = require('./config');
var log         = require('./log')(module);


// On se connecte à la base de données
mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error :', err.message);
});
db.once('open', function callback () {
    log.info("Connected to MongoDB!");
});
 
var Schema = mongoose.Schema;


//export schema module
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

