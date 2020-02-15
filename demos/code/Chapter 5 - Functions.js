
var funcHUE = 90;

Blockly.Blocks['user_function'] = {
	init: function() {
	this.appendValueInput("NAME")
		.setCheck(null)
		.appendField(new Blockly.FieldDropdown([["void","myFuncVoid"], ["int","myFuncInt"], ["size_t","myFuncSize_t"], ["double","myFuncDouble"], ["float","myFuncFloat"], ["char","myFuncChar"], ["string","myFuncString"], ["bool","myFuncBool"], ["auto","myFuncAuto"]]), "myFuncReturn")
		.appendField(new Blockly.FieldVariable("myFunction"), "myFuncVar")
		.appendField("(");
	this.appendStatementInput("statement_inp1")
		.setCheck(null);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(funcHUE);
	this.setTooltip("");
	this.setHelpUrl("");
	
	var name = 'function';
	
	
}

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
    this.appendValueInput("valinp1")
        .setCheck(["Pointer", "FuncParam"])
        .appendField("type: ")
        .appendField(new Blockly.FieldDropdown([["int","myParamInt"], ["size_t","myParamSize_t"], ["double","myParamDouble"], ["float","myParamFloat"], ["char","myParamChar"], ["string","myParamString"], ["bool","myParamBool"]]), "myParamType")
		.appendField(new Blockly.FieldDropdown([["","myPtrNone"], ["&","myPtrAdd"], ["*&","myPtrAddPtr"], ["*","myPtrAdd1"], ["**","myPtrAdd2"], ["***","myPtrAdd3"]]), "myPtr")
        .appendField("Name:")
        .appendField(new Blockly.FieldVariable("myParam1"), "myParamName");
		
    this.setInputsInline(false);
		
    this.setOutput(true, "FuncParam");
    this.setColour(funcHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['func_parameters'] = function(block) {
	var dropdown_type = this.getField('myParamType').getText();
	var variable_myparamname = Blockly.C.variableDB_.getName(block.getFieldValue('myParamName'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var dropdown_myptr = this.getField('myPtr').getText();
	
	// TODO: Assemble C into code variable.
	var code = '';
	var std = '';
	
	
	if(dropdown_type === 'string' && usingSTD === false){
		std += 'std::';
	}
	
	code += std + dropdown_type + '' + dropdown_myptr + ' ' + variable_myparamname;
	
	if(value_valinp1.length > 0){
		code += ', ' + value_valinp1;
	}
	
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};





Blockly.Blocks['func_parameters_call'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Pointer", "FuncParam"])
		.appendField(new Blockly.FieldDropdown([["","myPtrNone"], ["&","myPtrAdd"], ["*&","myPtrAddPtr"], ["*","myPtrAdd1"], ["**","myPtrAdd2"], ["***","myPtrAdd3"]]), "myPtr")
        .appendField("Name:")
        .appendField(new Blockly.FieldVariable("myParam1"), "myParamName");
		
    this.setInputsInline(false);
		
    this.setOutput(true, "FuncParam");
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
		this.appendValueInput("valinp1")
			.setCheck(null)
			.appendField(new Blockly.FieldVariable("myFunction"), "myFunc");
			
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
	
		this.setColour(funcHUE);
		this.setTooltip("Calls a user defined function.\nInput - Parameters defined");
		this.setHelpUrl("https://www.tutorialspoint.com/cplusplus/cpp_functions.htm");
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
		
		this.appendValueInput("valinp1")
        .setCheck("FuncParam")
		.appendField("type: ")
		.appendField(new Blockly.FieldDropdown([["int","myVarTypeInt"], ["size_t","myVarTypeSize_t"], ["double","myVarTypeDouble"], ["float","myVarTypeFloat"], ["char","myVarTypeChar"], ["string","myVarTypeString"], ["bool","myVarTypeBool"]]), "myVarType")
		.appendField("input:")
		.appendField(new Blockly.FieldTextInput(""), "text1");
			
			
		this.setOutput(true, "FuncParam");
		
		this.setInputsInline(false);
		this.setColour(funcHUE);
		this.setTooltip("");
		this.setHelpUrl("");
		
		//this.id = "var_initialization";
		
		//Sets the type that can be exported to other blocks
		this.tag = '1';
	},
	
	onchange: function(){
		
		//this.setOutput(true, typeConv(this.getField('myVarType').getText()) );
		
		dropdown_drop1 = typeConv(this.getField('myVarType').getText());
		
		
	}
};

Blockly.C['func_var_init_literal'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var dropdown_drop1 = typeConv(this.getField('myVarType').getText());
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











































