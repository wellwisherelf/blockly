
var variableHUE = 330;

//type check conversion, 
function typeConv(type){
	//Replaces the first letter to capitalize, used for fielddropdown types
	return type.charAt(0).toUpperCase() + type.slice(1);
	
}




Blockly.Blocks['variable_declare'] = {
	init: function() {
		
		this.appendValueInput("NAME")
			.appendField("Declare: ")
			.appendField(new Blockly.FieldDropdown([["int","myVarTypeInt"], ["size_t","myVarTypeSize_t"], ["double","myVarTypeDouble"], ["float","myVarTypeFloat"], ["char","myVarTypeChar"], ["string","myVarTypeString"], ["bool","myVarTypeBool"], ["auto","myVarTypeAuto"]]), "myVarType")
			.appendField(new Blockly.FieldVariable("myVar"), "myVarDec")
			.setCheck(["Int", "Size_t", "Double", "Float", "Char", "String", "Bool", "Auto", "Variable"]);
			
			this.appendDummyInput()
				.appendField("constant?")
				.appendField(new Blockly.FieldDropdown([["false","consFalse"], ["true","consTrue"] ]), "consType");
				
			this.appendDummyInput()
				.appendField("numeric range?")
				.appendField(new Blockly.FieldDropdown([["N/A", "numNone"], ["short","numShort"], ["long","numLong"], ["long long", "numLongLong"] ]), "numType");
				
				
			this.setInputsInline(false);
			this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(variableHUE);
		this.setTooltip("A standard variable declaration.\n\nConstant - Determines whether the variable is mutable (non constant), or if it cannot be changed after it has been declared (constant).\n\nNumeric Range - Determines the minimum and maximum values for type numbers. Size of numeric types:\nsize_t - 0 to 65535\nshort int - -32,768 to 32,767\nlong int- -2,147,483,648 to 2,147,483,647\nlong long int - -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807\nfloat - ±3.4x10^38\nlong float - ±1.7x10^308\ndouble - ±1.7x10^308\nlong double - ±1.7x10^308");
		this.setHelpUrl("http://www.cplusplus.com/doc/tutorial/variables/");
		
		this.tag = '';
		
	},
	
	onchange: function(){
		Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC).setCheck(typeConv(this.getField('myVarType').getText()));
		
		//this.tag = (typeConv(this.getField('myVarType').getText()));
		
	}
	
};

Blockly.C['variable_declare'] = function(block) {
	var dropdown_myvartype = this.getField('myVarType').getText();
	
	var variable_myvardec = Blockly.C.variableDB_.getName(block.getFieldValue('myVarDec'), Blockly.Variables.NAME_TYPE);
	
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	
	var dropdown_cons = this.getField('consType').getText();
	
	var dropdown_numType = this.getField('numType').getText();
	
	// TODO: Assemble C into code variable.
	
	var code = '';
	var error = '//WRONG TYPE ERROR DECLARATION\n';
	var errorCheck = false;
	var initType = '';
	var initBlock = false;
	
	
	//Numeric Types
	if(dropdown_myvartype === "int" && dropdown_numType !== "N/A"){
		code += dropdown_numType + ' ';
	} 
	else 
	if((dropdown_myvartype === "double" || dropdown_myvartype === "float") && dropdown_numType === "long"){
		code += dropdown_numType + ' ';
	}
	else {
		
		//this.setWarningText("Variable declaration error:\nnumeric type: " + dropdown_numType + " does not work with data type: " + dropdown_myvartype);
	}
	//Numeric Types
	
	//If constant is true, generate "const"
	if(dropdown_cons === 'true'){
		code += 'const ';
	}
	
	//If variable type is auto but is uninitialized
	if(dropdown_myvartype === 'auto' && value_name.length < 1){
		code += dropdown_myvartype + ' ' + variable_myvardec + ' = 1';
	}
	//If variable type is auto and is initialized
	else if(dropdown_myvartype === 'auto' && value_name.length > 0){
		code += dropdown_myvartype + ' ' + variable_myvardec + ' = ' + value_name;
	}
	else {
		//if using namespace std; is not active, and type is string
		if(usingSTD === false && dropdown_myvartype === 'string'){
			code += 'std::' + dropdown_myvartype + ' ' + variable_myvardec;
		}
		else {
			// using namespace std; is active 
			code += dropdown_myvartype + ' ' + variable_myvardec;
		}
		// if initialized, initialize
		if(value_name.length > 0){
			code += ' = ' + value_name;
		}
	}
	
	
	// Constant checking if no initialization occurs
	if(dropdown_cons === 'true' && value_name.length < 1){
		
		if(dropdown_myvartype === 'int'){
			code += ' = 1';
		}
		if(dropdown_myvartype === 'size_t'){
			code += ' = 0';
		}
		if(dropdown_myvartype === 'double'){
			code += ' = 0.0';
		}
		if(dropdown_myvartype === 'float'){
			code += ' = 0.0';
		}
		if(dropdown_myvartype === 'char'){
			code += ' = \'a\'';
		}
		if(dropdown_myvartype === 'string'){
			code += ' = "myString"';
		}
		if(dropdown_myvartype === 'bool'){
			code += ' = true';
		}
		
	}
	
	
	code += ';\n'
	
	//Update tag type
	this.tag = (typeConv(this.getField('myVarType').getText()));
	
	return code;
};

//Initialize the variable. Can be of any time. The code is a string literal.
Blockly.Blocks['var_initialization'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("type: ")
			.appendField(new Blockly.FieldDropdown([["int","myVarTypeInt"], ["size_t","myVarTypeSize_t"], ["double","myVarTypeDouble"], ["float","myVarTypeFloat"], ["char","myVarTypeChar"], ["string","myVarTypeString"], ["bool","myVarTypeBool"]]), "myVarType");
		this.appendDummyInput()
			.appendField("input:")
			.appendField(new Blockly.FieldTextInput(""), "text1");
		this.setOutput(true, null);
		
		this.setInputsInline(true);
		this.setColour(variableHUE);
		this.setTooltip("Variable initialization. Can be used to define variables, or used elsewhere where the required type input is needed e.g. switch statements.");
		this.setHelpUrl("");
		
		//this.id = "var_initialization";
		
		//Sets the type that can be exported to other blocks
		this.tag = '1';
	},
	
	onchange: function(){
		
		this.setOutput(true, typeConv(this.getField('myVarType').getText()) );
		
		dropdown_drop1 = typeConv(this.getField('myVarType').getText());
		
		
	}
};

Blockly.C['var_initialization'] = function(block) {
	var dropdown_drop1 = typeConv(this.getField('myVarType').getText());
	var text_text1 = block.getFieldValue('text1');
	// TODO: Assemble C into code variable.
	var code = '';
	var error = "//WRONG TYPE ERROR INITIALIZATION\n";
	var errorCheck = false;
	
	//Helper Function for error
	function alert_WrongType(TT){
		//block.setWarningText("Wrong type has been selected in variable initialization:\n" + TT + " is not of type " + dropdown_drop1);
	}
	
	
	if(text_text1.length > 0){
		
		//Check type
		if(dropdown_drop1 == 'Int' || dropdown_drop1 == 'Size_t'){
			
			//If text_text1 is not a number
			if(isNaN(text_text1) == true){
				alert_WrongType(text_text1); 
				text_text1 = 0.0;
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
				alert_WrongType(text_text1); 
				text_text1 = 0.0;
				errorCheck = true;
			}
		}
		
		//Check type
		if(dropdown_drop1 == 'Char'){
			if(typeof text_text1 === 'string'){
				text_text1 = "'" + text_text1.substring(0, 1) + "'";
			}
			else {
				alert_WrongType(text_text1); 
				text_text1 = "'a'";
				errorCheck = true;
			}
			
			
		}
		
		//Check type
		if(dropdown_drop1 == 'String'){
			if(typeof text_text1 === 'string'){
				text_text1 = '"' + text_text1 + '"';
			}
			else {
				alert_WrongType(text_text1); 
				text_text1 = "str";
				errorCheck = true;
			}
		}
		
		//Check type
		if(dropdown_drop1 == 'Bool'){
			if(text_text1 == 'true' || text_text1 == 'false'){
				
			}
			else {
				alert_WrongType(text_text1); 
				text_text1 = "true";
				errorCheck = true;
			}
		}
		
		
		
		code += text_text1;
		
		if( ( dropdown_drop1 == 'Double' || dropdown_drop1 == 'Float') && text_text1 % 1 === 0){
			code += ".0";
		}
	}
		
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};


Blockly.Blocks['var_change'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "String", "Variable"])
        .appendField("Increment ")
        .appendField(new Blockly.FieldVariable("myVar"), "myVarDef")
		.appendField("by");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(variableHUE);
 this.setTooltip("Increment the variable.");
 this.setHelpUrl("");
  }
};

Blockly.C['var_change'] = function(block) {
	var variable_myvardef = Blockly.C.variableDB_.getName(block.getFieldValue('myVarDef'), Blockly.Variables.NAME_TYPE);
	var value_name = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	//Increments variable  my value_name
	code += variable_myvardef + " = " + variable_myvardef + " + " + value_name + ';\n';
	
	
	return code;
};

Blockly.Blocks['var_reinit'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck()
        .appendField("Set ")
        .appendField(new Blockly.FieldVariable("myVar"), "myVarDef")
		.appendField("to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(variableHUE);
 this.setTooltip("Sets the variable.");
 this.setHelpUrl("");
  }
};

Blockly.C['var_reinit'] = function(block) {
	var variable_myvardef = Blockly.C.variableDB_.getName(block.getFieldValue('myVarDef'), Blockly.Variables.NAME_TYPE);
	var value_name = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	//output myVar and initialization.
	code += variable_myvardef + " = " + value_name + ';\n';
	
	return code;
};











