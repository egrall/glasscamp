/*
Copyright (c) 2014 Eric Grall -Arkea - http://github.com/egrall/fakerBank/
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

!(function(){
'use strict';

var creditcard = require('./creditcard');
var transaction = require('./transaction');
var contract = require('./contract');
var addressbank = require('./addressbank');



var version = "0.0.1";
var future_year = 1;
var future_contract = 3;
var separator = '-';


var fakerBank = {};

fakerBank.version = function () {
	return version;
};


//api special french address ----
fakerBank.address = {};

fakerBank.address.latitude = function () {
	return addressbank.latitude();
};


fakerBank.address.longitude = function () {
	return addressbank.longitude();
};



//api credit card definition -----

fakerBank.creditcard = {};

fakerBank.creditcard.vendor = function () {
	return creditcard.vendor();
};

fakerBank.creditcard.cardNumber = function (type) {
	return creditcard.cardNumber(type,'-');
};

fakerBank.creditcard.expirationMonthDate = function (years) {
	return creditcard.expirationMonthDate(years);
};

fakerBank.creditcard.expirationYearDate = function (years) {
	return creditcard.expirationYearDate(years);
};


fakerBank.creditcard.cryptogramNumber = function (type) {
	return creditcard.cryptogramNumber(type);
};


fakerBank.creditcard.card = function () {
	var vendor = fakerBank.creditcard.vendor();
    return {
        "vendor": vendor,
        "cardNumber": fakerBank.creditcard.cardNumber(vendor),
        "expire_month" : fakerBank.creditcard.expirationMonthDate(future_year),
        "expire_year" : fakerBank.creditcard.expirationYearDate(future_year),
        "cryptogramNumber": fakerBank.creditcard.cryptogramNumber(vendor),
    };
};


//api credit & debit transaction definition -----
fakerBank.transaction = {};


fakerBank.transaction.shop = function () {
	return transaction.vendor();
};

fakerBank.transaction.type = function () {
	return transaction.type();
};



fakerBank.transaction.amount = function () {
	return transaction.amount();
};

fakerBank.transaction.operationDate = function (years) {
	return transaction.operationDate(years);
};

fakerBank.transaction.customerDate = function (years) {
	return transaction.customerDate(years);
};

fakerBank.transaction.description = function(title, date, vendor) {
	return transaction.description(title, date, vendor, separator);
};

fakerBank.transaction.title = function() {
	return transaction.title();
};

fakerBank.transaction.line = function () {
	var title = fakerBank.transaction.title();
	var date = fakerBank.transaction.operationDate(future_year);
	var shop = fakerBank.transaction.shop();
	
    return {
    	"transaction" : {
    		"vendor": shop,
	        "operationDate": date,
	        "customerDate": date,
	        "title": title,
	        "description": fakerBank.transaction.description(title,date, shop, separator),
	        "amount": fakerBank.transaction.amount()
    	}
    };
};



//contrat definition
fakerBank.product = {};

fakerBank.product.all = function () {
	return contract.all();
};

fakerBank.product.kind = function (type) {
	return contract.kind(type);
};

fakerBank.product.title = function (type) {
	return contract.title(type);
};

fakerBank.product.iban = function () {
	return contract.iban();
};

fakerBank.product.duration = function (year) {
	return contract.duration(year);
};

fakerBank.product.amount = function () {
	return contract.amount();
};

fakerBank.product.created = function (year) {
	return contract.created(year);
};

fakerBank.product.contract = function (type) {
	var kind_contract = fakerBank.product.kind(type);

    return {
    	"contract" : {
    		"kind": kind_contract,
	        "title": fakerBank.product.title(kind_contract),
	        "created": fakerBank.product.created(future_contract),
	        "duration": fakerBank.product.duration(future_contract),
	        "iban": fakerBank.product.iban(),
	        "amount": fakerBank.product.amount()
    	}
    };	
};

fakerBank.product.contract = function () {
	var kind_contract = fakerBank.product.all();

    return {
    	"contract" : {
    		"kind": kind_contract,
	        "title": fakerBank.product.title(kind_contract),
	        "created": fakerBank.product.created(future_contract),
	        "duration": fakerBank.product.duration(future_contract),
	        "iban": fakerBank.product.iban(),	        
	        "amount": fakerBank.product.amount()
    	}
    };	
};



//node and javascript export definition -----
if (typeof define == 'function'){
	   define(function(){
			return fakerBank;
	   });
	}
	else if(typeof module !== 'undefined' && module.exports) {
		module.exports = fakerBank;
	}
	else {
		window.fakerBank = fakerBank;
	}

}()); // end FakerBank closure