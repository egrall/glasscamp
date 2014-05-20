var defbank = require('./defbank');
var random = require('./random');
var helpers = require('./helpers');

var addressbank = {

    latitude: function () {
        return (random.between(430586362, 505045029) / 10000000.0).toFixed(7);
    },

    longitude: function () {
        return (-(random.between(0.0000000, 45688916) / 10000000.0).toFixed(7));
    },
    
    streetAddress: function () {
        return random.between(1,50) + " " + random.street_address();
    },
    
    zipCode: function()	{
    	return helpers.replaceSymbolWithNumber("#####", "#");
    },
    
    city: function()	{
        return random.city();
    }
};

module.exports = addressbank;