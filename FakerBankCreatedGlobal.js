
/*
 *  BANK GLOBAL CREATING
 */

var NbAgency			= 5;						//Nombre d'agences bancaires
var NbMaxAgentByAgency	= 2;						//Nombre max d'agents par agences
var NbABM				= 30;						//Nombre de GAB
var NbPerson 			= 100;						//Nombre de clients


//banking and customers module
//require('./test/fakebankcreated')(NbAgency); 								//agency
//require('./test/fakeabmcreated')(NbABM);									//abm
//require('./test/fakeagentcreated')(NbAgency, NbMaxAgentByAgency);			//agent
require('./test/fakecustomercreated')(NbPerson);							//customer / creditcard / contract / transaction
