var random = require('./random');
var defbank = require('./defbank');
var helpers = require('./helpers');
var date = require('./date');


var contract = {
		
	all: function () {
		return random.type_product();
	},			
		
	kind: function (type) {
		return random.contract_product(type);
	},	

	title: function (kind) {
		return kind +' : '+random.contract_custom();
	},
	
	duration: function(years)	{
		var newdate = date.future(years,'');
		return newdate;
	},
	
	iban: function()	{
		return helpers.replaceSymbolWithNumber(defbank.iban_formats['FR'][0],'#');
	},
	
	created: function(years)	{
		var newdate = date.past(years,'');
		return newdate;
	},	
	
	amount: function()	{
		return helpers.replaceSymbolWithNumber(defbank.contract_amount_formats[0],'#');
	}
 
}

module.exports = contract;