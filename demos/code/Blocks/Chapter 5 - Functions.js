
var funcHUE = 90;

Blockly.Blocks['user_function'] = {
	init: function() {
		this.appendDummyInput("NAME")
			.appendField(new Blockly.FieldDropdown([["void","myFuncVoid"], ["int","myFuncInt"], ["size_t","myFuncSize_t"], ["double","myFuncDouble"], ["float","myFuncFloat"], ["char","myFuncChar"], ["string","myFuncString"], ["bool","myFuncBool"], ["auto","myFuncAuto"]]), "myFuncReturn")
			.appendField(new Blockly.FieldVariable("myFunction", null, ['isFunc'], 'isFunc'), "myFuncVar")
			.appendField("(");
		this.appendStatementInput("statement_inp1")
			.setCheck(null);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(funcHUE);
		this.setTooltip("Creates a new function.");
		this.setHelpUrl("");
		
		this.setMutator(new Blockly.Mutator(['func_parameters']));

		this.setDataStr('isFunc', true);

		this.setInputsInline(true);
		
		//Var to determine whether
		//the function has been
		//checkmarked or not
		//this.dataTypeOption = false;
		
		//Counter to count the
		//default parameter names
		this.paramCount_ = 0;
	},

	mutationToDom: function(){

		if(!this.paramCount_){
			return null;
		}

		var container = document.createElement('mutation');

		if(this.paramCount_){
			container.setAttribute('paramadd', this.paramCount_);
		}

		return container;
	},

	domToMutation: function(xmlElement){
		this.paramCount_ = parseInt(xmlElement.getAttribute('paramadd'), 10);
		for(var i = 1; i <= this.paramCount_; ++i){
			this.appendValueInput('paraminp' + i).setCheck(null).appendField('');
		}
	},
	
	//mutator box opens
	decompose: function(workspace){
		var containerBlock = workspace.newBlock('function_mutator');
		containerBlock.initSvg();
		
		//loading the checkmark to its correct state
		//if(this.dataTypeOption == true){
		//	containerBlock.setFieldValue('TRUE','check1');
		//}
		//else {
		//	containerBlock.setFieldValue('FALSE','check1');
		//}
		
		var connection = containerBlock.getInput('STACK').connection;
		for(var i = 1; i <= this.paramCount_; ++i){
			var add = workspace.newBlock('func_parameters');
			add.initSvg();
			connection.connect(add.previousConnection);
			connection = add.nextConnection;
		}
		return containerBlock;
	},
	
	//mutator box closes
	compose: function(containerBlock){
		
		//saving the checkmark to its correct state
		//if(containerBlock.getFieldValue('check1') == 'TRUE'){
		//	this.dataTypeOption = true;
		//}
		//else {
		//	this.dataTypeOption = false;
		//}
		
		
		
		for(var i = this.paramCount_; i > 0; i--){
			this.removeInput('paraminp' + i);
		}

		this.paramCount_ = 0;

		var clauseBlock = containerBlock.getInputTargetBlock('STACK');

		while(clauseBlock){
			switch(clauseBlock.blockName){
				case 'func_parameters':
					
					this.paramCount_++;
					var paramInput = this.appendValueInput('paraminp' + this.paramCount_)
						.setCheck(null).appendField('');

					if(clauseBlock.valueConnection_){
						paramInput.connection.connect(clauseBlock.valueConnection_);
					}


				break;

				default:
					throw 'Unknown block type.';
				
			}
			clauseBlock = clauseBlock.nextConnection 
			&& clauseBlock.nextConnection.targetBlock();
		}

	},

	saveConnections: function(containerBlock){
		var clauseBlock = containerBlock.getInputTargetBlock('STACK');
		var i = 1;

		while(clauseBlock){
			switch(clauseBlock.blockName){
				case 'func_parameters':
					var paramInput = this.getInput('paraminp' + i);
					clauseBlock.valueConnection_ = paramInput && paramInput.connection.targetConnection;
					clauseBlock.statementConnection_ = i++;


				break;

				default:
					throw 'Unknown block type.';

			}
			clauseBlock = clauseBlock.nextConnection 
			&& clauseBlock.nextConnection.targetBlock();
		}
	},

	onchange: Blockly.Blocks.requireInFunction





};

Blockly.C['user_function'] = function(block) {
	var dropdown_myfuncreturn = this.getField('myFuncReturn').getText();
	var variable_myfuncvar = Blockly.C.variableDB_.getName(block.getFieldValue('myFuncVar'), Blockly.Variables.NAME_TYPE);
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	var statements_statement_inp1 = Blockly.C.statementToCode(block, 'statement_inp1');
	// TODO: Assemble C into code variable.
	var code = '';
	var std = '';

	if(dropdown_myfuncreturn === 'string' && usingSTD === false){
		std += 'std::';
	}

	code += std + dropdown_myfuncreturn + ' ' + variable_myfuncvar + '(';


	code += value_name;

	code += '){\n';

	code += statements_statement_inp1;

	code += '}\n';

	code += name;

	return code;
};


Blockly.Blocks['func_parameters'] = {
	init: function() {

    	this.appendDummyInput()
    	    .appendField("type: ")
    	    .appendField(new Blockly.FieldDropdown([["int","myParamInt"], ["size_t","myParamSize_t"], ["double","myParamDouble"], ["float","myParamFloat"], ["char","myParamChar"], ["string","myParamString"], ["bool","myParamBool"]]), "myParamType")
			.appendField(new Blockly.FieldDropdown([["","myPtrNone"], ["&","myPtrAdd"], ["*&","myPtrAddPtr"], ["*","myPtrAdd1"], ["**","myPtrAdd2"], ["***","myPtrAdd3"]]), "myPtr")
    	    .appendField("Name:")
			.appendField(new Blockly.FieldVariable("param"), "myPName");
		
    	this.setInputsInline(false);

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);

    	this.setOutput(false);
    	this.setColour(funcHUE);
		this.setTooltip("");
		this.setHelpUrl("");

	},
	
	onchange: function(){
		
	}

};




Blockly.Blocks['func_parameters_call'] = {
  init: function() {
    this.appendDummyInput()
		.appendField(new Blockly.FieldDropdown([["","myPtrNone"], ["&","myPtrAdd"], ["*&","myPtrAddPtr"], ["*","myPtrAdd1"], ["**","myPtrAdd2"], ["***","myPtrAdd3"]]), "myPtr")
        .appendField("Name:")
        .appendField(new Blockly.FieldVariable("myParam1"), "myParamName");

	this.setInputsInline(false);
	
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);

    this.setColour(funcHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['func_parameters_call'] = function(block) {
	var variable_myparamname = Blockly.C.variableDB_.getName(block.getFieldValue('myParamName'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var dropdown_myptr = this.getField('myPtr').getText();

	// TODO: Assemble C into code variable.
	var code = '';


	code += dropdown_myptr + ' ' + variable_myparamname;

	if(value_valinp1.length > 0){
		code += ', ' + value_valinp1;
	}

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};


Blockly.Blocks['func_call_return'] = {
	init: function() {
		this.appendValueInput("valinp1")
			.setCheck(null)
			.appendField(new Blockly.FieldVariable("myFunction"), "myFunc");

		this.setInputsInline(false);

		this.setOutput(true, null);

		this.setColour(funcHUE);
		this.setTooltip("Calls a user defined function.\nInput - Parameters defined");
		this.setHelpUrl("https://www.tutorialspoint.com/cplusplus/cpp_functions.htm");
		
		this.setMutator(new Blockly.Mutator(['func_var_init_literal', 'func_parameters_call']));

	},

	mutationToDom: function(){
		var container = document.createElement('mutation');
		return container;
	},

	domToMutation: function(xmlElement){

	},

	decompose: function(workspace){
		var containerBlock = workspace.newBlock(['function_mutator']);
		containerBlock.initSvg();
		return containerBlock;
	},

	compose: function(containerBlock){
		
	}
};

Blockly.C['func_call_return'] = function(block) {
	var variable_myfunc = Blockly.C.variableDB_.getName(block.getFieldValue('myFunc'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.

	code = '';

	code += variable_myfunc;

	if(value_valinp1.length < 1){
		code += '()';
	}
	else {
		code += '(' + value_valinp1 + ')';
	}

	return [code, Blockly.C.ORDER_NONE];
};



Blockly.Blocks['func_call'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldVariable("myFunction"), "myFunc");

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);

		this.setColour(funcHUE);
		this.setTooltip("Calls a user defined function.\nInput - Parameters defined");
		this.setHelpUrl("https://www.tutorialspoint.com/cplusplus/cpp_functions.htm");
		
		this.setMutator(new Blockly.Mutator(['func_var_init_literal', 'func_parameters_call']));

	},

	mutationToDom: function(){
		var container = document.createElement('mutation');
		return container;
	},

	domToMutation: function(xmlElement){

	},

	decompose: function(workspace){
		var containerBlock = workspace.newBlock(['function_mutator']);
		containerBlock.initSvg();
		return containerBlock;
	},

	compose: function(containerBlock){
		
	}
};

Blockly.C['func_call'] = function(block) {
	var variable_myfunc = Blockly.C.variableDB_.getName(block.getFieldValue('myFunc'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.

	code = '';

	code += variable_myfunc;

	if(value_valinp1.length < 1){
		code += '();\n';
	}
	else {
		code += '(' + value_valinp1 + ');\n';
	}

	return code;
};

Blockly.Blocks['func_return'] = {
	init: function() {
		this.appendValueInput("NAME")
			.setCheck(null)
			.appendField("return")
			.appendField("");
		this.setPreviousStatement(true, null);
		this.setColour(funcHUE);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.C['func_return'] = function(block) {
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	if(value_name.length > 0){
		code += 'return ' + value_name;
	}
	else{
		code += 'return';
	}

	code += ';\n';

	return code;
};



//Initialize the variable. Can be of any time. The code is a string literal.
Blockly.Blocks['func_var_init_literal'] = {
	init: function() {

		this.appendDummyInput()
		.appendField("type: ")
		.appendField(new Blockly.FieldDropdown([["int","myVarTypeInt"], ["size_t","myVarTypeSize_t"], ["double","myVarTypeDouble"], ["float","myVarTypeFloat"], ["char","myVarTypeChar"], ["string","myVarTypeString"], ["bool","myVarTypeBool"]]), "myVarType")
		.appendField("input:")
		.appendField(new Blockly.FieldTextInput(""), "text1");

		this.setInputsInline(false);

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);

		this.setColour(funcHUE);
		this.setTooltip("");
		this.setHelpUrl("");

	},

	onchange: function(){

		//this.setOutput(true, typeConv(this.getField('myVarType').getText()) );

		this.typeName = typeConv(this.getField('myVarType').getText());


	}
};

Blockly.C['func_var_init_literal'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var dropdown_drop1 = this.typeName;
	var text_text1 = block.getFieldValue('text1');
	// TODO: Assemble C into code variable.
	var code = '';
	var error = "//WRONG TYPE ERROR INITIALIZATION\n";
	var errorCheck = false;

	//Helper Function for error
	function alert_WrongType(){
		alert("Wrong type has been selected in function parameter.");
	}


	if(text_text1.length > 0){

		//Check type
		if(dropdown_drop1 == 'Int' || dropdown_drop1 == 'Size_t'){

			//If text_text1 is not a number
			if(isNaN(text_text1) == true){
				text_text1 = 0;
				alert_WrongType();
				errorCheck = true;
			}

			//Since it is Int/Size_t, round the down
			text_text1 = Math.floor(text_text1);

			//If type is Size_t, get the absolute value
			if(dropdown_drop1 == 'Size_t'){
				text_text1 = Math.abs(text_text1);
			}

		}

		//Check type
		if(dropdown_drop1 == 'Double' || dropdown_drop1 == 'Float'){
			if(isNaN(text_text1) == true){
				text_text1 = 0.0;
				alert_WrongType();
				errorCheck = true;
			}
		}

		//Check type
		if(dropdown_drop1 == 'Char'){
			if(typeof text_text1 === 'string'){
				text_text1 = "'" + text_text1.substring(0, 1) + "'";
			}
			else {
				text_text1 = "'a'";
				alert_WrongType();
				errorCheck = true;
			}


		}

		//Check type
		if(dropdown_drop1 == 'String'){
			if(typeof text_text1 === 'string'){
				text_text1 = '"' + text_text1 + '"';
			}
			else {
				text_text1 = "str";
				alert_WrongType();
				errorCheck = true;
			}
		}

		//Check type
		if(dropdown_drop1 == 'Bool'){
			if(text_text1 == 'true' || text_text1 == 'false'){

			}
			else {
				text_text1 = "true";
				alert_WrongType();
				errorCheck = true;
			}
		}



		code += text_text1;

		if( ( dropdown_drop1 == 'Double' || dropdown_drop1 == 'Float') && text_text1 % 1 === 0){
			code += ".0";
		}
	}

	if(value_valinp1.length > 0){
		code += ', ' + value_valinp1;
	}


	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};



Blockly.Blocks['function_mutator'] = {
	init: function(){
		
		this.appendDummyInput().appendField('function');
		//this.appendDummyInput().appendField('switch types?').appendField(new Blockly.FieldCheckbox("FALSE"), "check1");
		
		//this.appendDummyInput()
		//.appendField('return?')
		//.appendField(new Blockly.FieldCheckbox("FALSE"), "check1");

		this.appendStatementInput('STACK').appendField('').setCheck(null);

		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(funcHUE);

		this.setTooltip("Selecting the return option will give this function a return statement.");
		
	},
	
	onchange: function(){
		
	}
};

//Block for option of returning
Blockly.Blocks['function_mutator_return'] = {
	init: function(){


		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(funcHUE);

	}
};

Blockly.Blocks['user_function_class'] = {
	init: function() {
		
		this.paramField = '';
		
		
		
		
		this.appendDummyInput("NAME")
			.appendField(new Blockly.FieldVariable("myClass", null, ['isClass'], 'isClass'), "myClassVar")
			.appendField(new Blockly.FieldDropdown([["","myPtrNone"], ["*","myPtrAdd1"], ["&","myPtrAdd"], ["*&","myPtrAddPtr"], ["**","myPtrAdd2"], ["***","myPtrAdd3"]]), "myPtr")
			.appendField(new Blockly.FieldVariable("myFunction", null, ['isFunc'], 'isFunc'), "myFuncVar")
			.appendField("(" + this.paramField + ")")
		this.appendStatementInput("statement_inp1")
			.setCheck(null);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(funcHUE);
		this.setTooltip("Creates a new function.");
		this.setHelpUrl("");
		
		this.setMutator(new Blockly.Mutator(['func_parameters']));

		this.setDataStr('isFunc', true);

		this.setInputsInline(true);
		
		this.paramCount_ = 0;
		
		this.paramType = new Array();
		this.paramName = new Array();
		
		
	},

	mutationToDom: function(){

		if(!this.paramCount_){
			return null;
		}

		var container = document.createElement('mutation');

		if(this.paramCount_){
			container.setAttribute('paramadd', this.paramCount_);
		}

		return container;
	},

	domToMutation: function(xmlElement){
		
	},
	
	//mutator box opens
	decompose: function(workspace){
		var containerBlock = workspace.newBlock('function_mutator');
		containerBlock.initSvg();
		
		var connection = containerBlock.getInput('STACK').connection;
		
		for(var i = 1; i <= this.paramCount_; ++i){
			var add = workspace.newBlock('func_parameters');
			add.initSvg();
			
			this.paramType[i - 1] = add.getField('myParamType').getText();
			this.paramName[i - 1] = add.getField('myPName').getText();
			
			connection.connect(add.previousConnection);
			connection = add.nextConnection;
		}
		
		return containerBlock;
		
	},
	
	//mutator box closes
	compose: function(containerBlock){
		

		this.paramCount_ = 0;

		var clauseBlock = containerBlock.getInputTargetBlock('STACK');

		this.paramField = '';
		while(clauseBlock){
			switch(clauseBlock.blockName){
				case 'func_parameters':
					
					
					this.paramCount_++;
					
					
				break;

				default:
					throw 'Unknown block type.';
				
			}
			clauseBlock = clauseBlock.nextConnection 
			&& clauseBlock.nextConnection.targetBlock();
		}

	},

	saveConnections: function(containerBlock){
		var clauseBlock = containerBlock.getInputTargetBlock('STACK');
		var i = 1;

		while(clauseBlock){
			switch(clauseBlock.blockName){
				case 'func_parameters':
					var paramInput = this.getInput('paraminp' + i);
					clauseBlock.valueConnection_ = paramInput && paramInput.connection.targetConnection;
					clauseBlock.statementConnection_ = i++;


				break;

				default:
					throw 'Unknown block type.';

			}
			clauseBlock = clauseBlock.nextConnection 
			&& clauseBlock.nextConnection.targetBlock();
		}
	},

	onchange: Blockly.Blocks.requireInFunction,
	
	onchange: function(){
		
		for(var i = 0; i < this.paramType.length; ++i){
			
			this.paramField += this.paramType[i] + ' ' + this.paramName[i];
			
			if(i < (this.paramType.length - 1)){
				this.paramField += ', ';
			}
			
		}
		
		//console.log(this.paramField);
		
	}





};

Blockly.C['user_function_class'] = function(block) {
	var variable_myclassvar = Blockly.C.variableDB_.getName(block.getFieldValue('myClassVar'), Blockly.Variables.NAME_TYPE);
	
	var variable_myfuncvar = Blockly.C.variableDB_.getName(block.getFieldValue('myFuncVar'), Blockly.Variables.NAME_TYPE);
	
	var dropdown_myptr = this.getField('myPtr').getText();
	
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	var statements_statement_inp1 = Blockly.C.statementToCode(block, 'statement_inp1');
	// TODO: Assemble C into code variable.
	var code = '';
	var std = '';

	
	code += variable_myclassvar + dropdown_myptr + ' ' + variable_myfuncvar + '(';


	code += this.paramField;

	code += '){\n';

	code += statements_statement_inp1;
	

	code += '}\n';

	code += name;

	return code;
};


























