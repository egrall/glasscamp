
//Date de l'operation
//Date de valeur
//libellé de l'opération
//libellé long de l'opération
//montant.
var defbank = require('./defbank');
var random = require('./random');
var helpers = require('./helpers');
var date = require('./date');

var IndexCredit = 'CREDIT';

var transaction = {
		
	vendor: function () {
		return random.shops_vendors();
	},
	
	type : function () {
		return random.type_transaction();
	},
	
	amount: function () {
		return helpers.replaceSymbolWithNumber(random.shop_amount_format(IndexCredit),'#');
	},			
		
	operationDate: function (years) {
		var newdate = date.past(years,'');
		return newdate;
	},	
	
	customerDate: function (years) {
		var newdate = date.past(years,'');
		return newdate;
	},
		
	description: function(title, date, vendor, separator)	{
		return title + separator + date + separator + vendor;
	},
	
	
	title: function()	{
		return random.shop_description();	
	}
	
}

module.exports = transaction;