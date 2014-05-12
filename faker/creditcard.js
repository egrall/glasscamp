var random = require('./random');
var defbank = require('./defbank');
var helpers = require('./helpers');
var date = require('./date');


var creditCard = {
		
	vendor: function () {
		return random.card_vendors();
	},
		
	cardNumber: function (type, separator) {
		//if separator defines - 4/4/4/4
		return helpers.replaceSymbolWithNumber(random.card_format(type),'#');
	},

	expirationMonthDate: function(years)	{
		var newdate = date.future(years,'');
		return newdate.getUTCMonth();
	},
		
	expirationYearDate: function(years)	{
		var newdate = date.future(years,'');
		return newdate.getFullYear();
	},
		
	cryptogramNumber:function (type) {
		return helpers.replaceSymbolWithNumber(random.cryptogram_formats(type),'#');
	}, 
}

module.exports = creditCard;