/*
 * Faker Bank Definition - Addin Faker node.js.
 * 
 */

//CONSTANTS
var VISA = 'Visa';
var MASTERCARD = 'MasterCard';
var AMERICANEXPRESS = 'American Express';
var DISCOVERCARD = 'DiscoverCard';


//CREDIT CARD VENDORS ---------------------
var card_vendors = new Array(VISA, MASTERCARD, AMERICANEXPRESS, DISCOVERCARD);
// VIRTUALIS

//TYPE CARD VENDORS ---------------------
var card_type = new Array();
card_type[VISA] = new Array('CLASSIC',  'PREMIER');
card_type[MASTERCARD] = new Array('CLASSIC',  'GOLD', 'WORD ELITE');


//CREDIT CARD FORMATS ---------------------
var card_format = new Array();
card_format[VISA] = new Array('4539#########',  '4539############','4556#########','4556############','4916#########','4916############','4532#########',	'4532############','4929#########','4929############','40240071#####','40240071########','4485#########','4485############','4716#########','4716############','4############','4###############');
card_format[MASTERCARD] = new Array('51##############','52##############','53##############','54##############','55##############');
card_format[AMERICANEXPRESS] = new Array( '34#############', '37#############');
card_format[DISCOVERCARD] = new Array('6011############');


//IBAN FORMATS ---------------------
//http://fr.wikipedia.org/wiki/ISO_13616#Algorithme_de_v.C3.A9rification_de_l.27IBAN
var iban_formats = new Array();
iban_formats['FR'] = new Array('FR76 BBBB BGGG GGCC CCCC CCCC CKK');


//CRYPTOGRAM FORMATS ---------------------
var cryptogram_formats = new Array();
cryptogram_formats[VISA] = new Array('###');
cryptogram_formats[MASTERCARD] = new Array('###');
cryptogram_formats[AMERICANEXPRESS] = new Array('###');
cryptogram_formats[DISCOVERCARD] = new Array('###');


//TRANSACTION FORMATS ---------------------
var CREDIT = 'CREDIT';
var DEBIT = 'DEBIT';

var type_transaction = Array(CREDIT, DEBIT, DEBIT, DEBIT, DEBIT, DEBIT);
var amount_formats = Array();
amount_formats[CREDIT] = new Array('###,##', '##,##');
amount_formats[DEBIT] = new Array('###,##', '##,##');

var voyage = 'agence voyage';
var assureance = 'assurance';
var immobilier = 'immobiliere';
var alimentation = 'alimentation';  
var antiquites = 'antiquités';
var artisanat = 'antiquités'; 
var automobiles = 'antiquités';
var voitures ='voitures';
var depannage ='depannage';
var garage ='garage'; 
var bijoux ='bijoux';
var boulangerie ='boulangerie'; 
var chaussures ='chaussures'; 
var coiffure ='coiffure'; 
var vetements ='vetements'; 
var sport ='sport'; 
var decoration ='decoration'; 
var vaisselle ='vaisselle'; 
var cadeau ='cadeau'; 
var gastronomie ='gastronomie'; 
var epicerie ='epicerie'; 
var meubles = 'meubles'; 
var maison ='maison'; 
var bien_etre ='bien_etre'; 
var parfum ='parfum';
var fleuriste ='fleuriste'; 
var hotel ='hotel';
var informatique ='informatique'; 
var puericulture ='puericulture'; 
var jouets ='jouets'; 
var fournitures ='fournitures'; 
var photo ='photo'; 
var musique ='musique'; 
var optique ='optique';
var restaurant ='restaurant'; 
var bar ='bar';
var transport = 'transport';
var banque ='banque'; 
var telephonie ='telephonie';
var internet ='internet';
var alcool  ='alcool';

var shop_vendors = new Array(voyage,assureance,immobilier,alimentation,antiquites,artisanat,automobiles,voitures, depannage,garage ,bijoux,boulangerie,
							chaussures,coiffure,vetements,sport,decoration,vaisselle,cadeau,gastronomie,epicerie ,meubles,maison ,bien_etre,parfum,
							fleuriste,hotel,informatique ,puericulture,jouets ,fournitures,photo, musique,optique ,restaurant,bar,transport,banque,
							telephonie, internet, alcool);
var shop_description = new Array('CARTE', 'PLV', 'VIR', 'CHQ');


//PRODUCT ARKEA BANK ENUM
var COMPTE = 'COMPTE';
var LIVRET = 'LIVRET';
var LOGEMENT = 'LOGEMENT';
var ASSURANCEVIE = 'ASSURANCEVIE';


var type_product = new Array(COMPTE, LIVRET, LOGEMENT, ASSURANCEVIE);
var bank_products = new Array();
bank_products[COMPTE] = new Array('COMPTE COURANT');
bank_products[LIVRET] = new Array('LIVRET BLEU','LIVRET DEV DURABLE', 'LIVRET FIDELITE', 'LIVRET LIBRISSIME');
bank_products[LOGEMENT] = new Array('COMPTE EPARGNE LOGEMENT', 'PLAN EPARGNE LOGEMENT');
bank_products[ASSURANCEVIE] = new Array('PREVI-OPTIONS', 'PERP PREVI-HORIZONS','PATRIMOIRE OPTIONS');

var contract_custom = new Array('Personnel', 'Commun', 'professionel', 'association');
var contract_amount_formats = Array('####,##');


//user definition.
var SINGLE = 'single';
var UNION = 'union';
var PACS = 'pacs';
var MARRIED = 'married';
var CHILDREN = 'children';
var PARENT = 'parent';
var user_relation = new Array(SINGLE, UNION, PACS, MARRIED, CHILDREN, PARENT);


exports.card_vendors = card_vendors;
exports.card_format = card_format;
exports.card_type= card_type;
exports.cryptogram_formats = cryptogram_formats;

exports.iban_formats = iban_formats;
exports.shop_vendors = shop_vendors;
exports.shop_description = shop_description;
exports.type_transaction = type_transaction;
exports.amount_formats = amount_formats;


exports.bank_products = bank_products;
exports.type_product = type_product;

exports.contract_custom = contract_custom;
exports.contract_amount_formats = contract_amount_formats;

exports.user_relation = user_relation;




