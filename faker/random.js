var defbank = require('./defbank');

var random = {
		
	// returns a single random number based on a range
    number: function (range) {
        return Math.floor(Math.random() * range);
    },
    
	// returns a single random number based on an interval
    between: function (min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    },    

    // takes an array and returns the array randomly sorted
    array_element: function (array) {
        var r = Math.floor(Math.random() * array.length);
        return array[r];
    },
    
    //card -------------------------------------
	
    card_vendors: function () {
        return this.array_element(defbank.card_vendors);
    },	
    
    card_format:function()	{
        return this.array_element(defbank.card_format);    	
    },
    
    card_format:function(type)	{
        return this.array_element(defbank.card_format[type]);	
    },    
    
    iban_formats:function()	{
        return this.array_element(defbank.iban_formats);    	
    },
    
    cryptogram_formats:function(type)	{
        return this.array_element(defbank.cryptogram_formats[type]);	
    }, 
    
    //transaction ----------------------------
    shops_vendors:function()	{
        return this.array_element(defbank.shop_vendors);	
    }, 
    
    shop_description:function()	{
        return this.array_element(defbank.shop_description);
    },
    
    shop_amount_format:function(index)	{
        return this.array_element(defbank.amount_formats[index]);    	
    },
    
    type_transaction:function()	{
        return this.array_element(defbank.type_transaction);    	
    },    
    
    
    
    
    //Contract -------------------------------------
    type_product:function()	{
        return this.array_element(defbank.type_product);
    },    
        
    contract_product:function(type)	{
        return this.array_element(defbank.bank_products[type]);
    },

    contract_custom:function()	{
        return this.array_element(defbank.contract_custom);
    },
    
    
    //adresses ------------------------------------
    street_address:function()	{
        return this.array_element(defbank.adressesFr);
    },
    
    city:function()	{
        return this.array_element(defbank.cityFr);
    }
}


module.exports = random;