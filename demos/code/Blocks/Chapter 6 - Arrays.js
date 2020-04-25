
var arrayHUE = 195;

Blockly.Blocks['array'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(null)
		.appendField(new Blockly.FieldDropdown([["int","myArrTypeInt"], ["size_t","myArrTypeSize_t"], ["double","myArrTypeDouble"], ["float","myArrTypeFloat"], ["char","myArrTypeChar"], ["string","myArrTypeString"], ["bool","myArrTypeBool"]]), "myArrType")
        .appendField(new Blockly.FieldVariable("myArray"), "myArr")
        .appendField("[")
        .appendField(new Blockly.FieldNumber(1, 1, Infinity, 1), "myArrSize")
        .appendField("]");
		
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array'] = function(block) {
	var dropdown_myarrtype = this.getField('myArrType').getText();
	
	var variable_myarr = Blockly.C.variableDB_.getName(block.getFieldValue('myArr'), Blockly.Variables.NAME_TYPE);
	
	var number_myarrsize = this.getField('myArrSize').getText();
  
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);  
	
  // TODO: Assemble C into code variable.  
	var code = '';
	var std = '';
  
	if(dropdown_myarrtype === "string" && C_Logic.namespace.using_namespace_std === false){
		std += 'std::';
	}
	
	code += std + dropdown_myarrtype + ' ' + variable_myarr + '';
	
	if(number_myarrsize < 1){
		code += '[]';
	}
	if(number_myarrsize > 0) {
		code += '[' + number_myarrsize + ']';
	}
	
	//if(number_myarrsize < 1 && value_valinp1.length < 1){
	//	//this.setWarningText("You cannot declare an array with an unknown size without initialization.");
	//}
	
	if(value_valinp1.length > 0){
		code += ' = { ' + value_valinp1 + ' }';
	}
	
	code += ';\n';
	
	return code;
};

Blockly.Blocks['array_index_1d'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "Variable"])
        .appendField(new Blockly.FieldVariable("myArray"), "myArrRef")
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.setInputsInline(true);
    this.setOutput(true, "Variable");
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array_index_1d'] = function(block) {
	var variable_myarrref = Blockly.C.variableDB_.getName(block.getFieldValue('myArrRef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	code += variable_myarrref + '[' + value_valinp1 + ']';
	
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['array_2d'] = {
  init: function() {
    this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown([["int","myArrTypeInt"], ["size_t","myArrTypeSize_t"], ["double","myArrTypeDouble"], ["float","myArrTypeFloat"], ["char","myArrTypeChar"], ["string","myArrTypeString"], ["bool","myArrTypeBool"]]), "myArrType")
        .appendField(new Blockly.FieldVariable("myArray2D"), "myArr")
        .appendField("[")
        .appendField(new Blockly.FieldNumber(2, 1, Infinity, 1), "myVarY")
        .appendField("] [")
        .appendField(new Blockly.FieldNumber(2, 1, Infinity, 1), "myVarX")
        .appendField("]");
    this.appendStatementInput("state_val1")
        .setCheck(null)
        .appendField("(initialization)");
		
		
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
		
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
  
};

Blockly.C['array_2d'] = function(block) {
	
	var dropdown_myarrtype = block.getFieldValue('myArrType');
	var variable_myarr = Blockly.C.variableDB_.getName(block.getFieldValue('myArr'), Blockly.Variables.NAME_TYPE);
	var number_myvary = block.getFieldValue('myVarY');
	var number_myvarx = block.getFieldValue('myVarX');
	
	var statements_state_val1 = Blockly.C.statementToCode(block, 'state_val1');
	// TODO: Assemble C into code variable.
	var code = '';
	
	var std = '';
	
	if(this.getField('myArrType').getText() === "string" && C_Logic.namespace.using_namespace_std === false){
		std += 'std::';
	}
  
	
	var code = std + this.getField('myArrType').getText() + " " + this.getField('myArr').getText() + "[" + this.getField('myVarY').getText() + "][" + this.getField('myVarX').getText() + "] = {";
	
	code += statements_state_val1;
	
	code += '\n};\n';
	return code;
};

Blockly.Blocks['array2d'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
			.appendField(new Blockly.FieldDropdown([["int","myArrTypeInt"], ["size_t","myArrTypeSize_t"], ["double","myArrTypeDouble"], ["float","myArrTypeFloat"], ["char","myArrTypeChar"], ["string","myArrTypeString"], ["bool","myArrTypeBool"]]), "myArrType")
        .appendField(new Blockly.FieldVariable("myArray2D"), "myArr")
        .appendField("[")
        .appendField(new Blockly.FieldNumber(0, 1), "myVarY")
        .appendField("] [")
        .appendField(new Blockly.FieldNumber(0, 1), "myVarX")
        .appendField("]");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array2d'] = function(block) {
	var dropdown_myarrtype = block.getFieldValue('myArrType');
	var variable_myarr = Blockly.C.variableDB_.getName(block.getFieldValue('myArr'), Blockly.Variables.NAME_TYPE);
	var number_myvary = block.getFieldValue('myVarY');
	var number_myvarx = block.getFieldValue('myVarX');
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	
	// TODO: Assemble C into code variable.
	
	
	var std = '';
	
	if(this.getField('myArrType').getText() === "string" && C_Logic.namespace.using_namespace_std === false){
		std += 'std::';
	}
  
	
	var code = std + this.getField('myArrType').getText() + " " + this.getField('myArr').getText() + "[" + this.getField('myVarY').getText() + "][" + this.getField('myVarX').getText() + "] = { \n";
	
	code += "}\n};\n"
  
	return code;
};

Blockly.Blocks['array_index_2d'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "Variable"])
        .appendField(new Blockly.FieldVariable("myArray2D"), "myArrRef")
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.appendValueInput("valinp2")
        .setCheck(["Number", "Variable"])
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.setInputsInline(true);
    this.setOutput(true, "Variable");
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array_index_2d'] = function(block) {
	var variable_myarrref = Blockly.C.variableDB_.getName(block.getFieldValue('myArrRef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var value_valinp2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	code += variable_myarrref + '[' + value_valinp1 + '][' + value_valinp2 + ']';
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['array_init_literal_2d'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(null)
        .appendField("(2d array init)");
    this.setPreviousStatement(true, "array_init_literal_2d");
    this.setNextStatement(true, "array_init_literal_2d");
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array_init_literal_2d'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	
	// TODO: Assemble C into code variable.
	var code = '';
	
	if(typeof this.childBlock_ != null){
		code += '\n';
	}
	
	code += '{ ' + value_valinp1 + ' }';
	
	return code;
};

Blockly.Blocks['array2d_init'] = {
	init: function() {
	this.appendDummyInput()
		.appendField("initialization");
	this.appendValueInput("valinp0")
		.setCheck(null)
		.appendField("init:");
	this.setOutput(true, null);
	this.setColour(230);
	this.setTooltip("");
	this.setHelpUrl("");
	this.tag = 0;
	},
	
	onchange:function(){
		var value_valinp = Blockly.C.valueToCode(block, 'valinp0', Blockly.C.ORDER_ATOMIC);
		var myValInp = 'valinp' + this.tag;
		
		if(myValInp.length > 0){
			this.tag += 1;
			
			myValInp = 'valinp' + this.tag;
			
			this.appendValueInput(myValInp)
				.setCheck(null)
				.appendField("initialization");
				
		}
	}
	
};

Blockly.C['array2d_init'] = function(block) {
	var value_valinp0 = Blockly.C.valueToCode(block, 'valinp0', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['array_index_2d_init'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "Variable"])
        .appendField(new Blockly.FieldVariable("myArray2D"), "myArrRef")
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.appendValueInput("valinp2")
        .setCheck(["Number", "Variable"])
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.setInputsInline(true);
    this.appendValueInput("valinp3")
        .appendField(" = ")
        .setCheck();
		
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
		
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array_index_2d_init'] = function(block) {
	var variable_myarrref = Blockly.C.variableDB_.getName(block.getFieldValue('myArrRef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var value_valinp2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	var value_valinp3 = Blockly.C.valueToCode(block, 'valinp3', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	if(value_valinp3.length < 1){
		value_valinp3 = '0';
	}
	
	code += variable_myarrref + '[' + value_valinp1 + '][' + value_valinp2 + '] = ' + value_valinp3;
	
	code += ';\n';
	
	// TODO: Change ORDER_NONE to the correct strength.
	return code;
};

Blockly.Blocks['array_index_1d_init'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "Variable"])
        .appendField(new Blockly.FieldVariable("myArray"), "myArrRef")
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.appendValueInput("valinp2")
        .appendField(" = ")
        .setCheck();
    this.setInputsInline(true);
		
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
		
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array_index_1d_init'] = function(block) {
	var variable_myarrref = Blockly.C.variableDB_.getName(block.getFieldValue('myArrRef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var value_valinp2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	
	if(value_valinp2.length < 1){
		value_valinp2 = '0';
	}
	
	
	code += variable_myarrref + '[' + value_valinp1 + '] = ' + value_valinp2;
	
	code += ';\n';
	
	// TODO: Change ORDER_NONE to the correct strength.
	return code;
};

//Initialize the variable. Can be of any time. The code is a string literal.
Blockly.Blocks['array_init_literal'] = {
	init: function() {
		
		this.appendValueInput("valinp1")
        .setCheck("FuncParam")
		.appendField("type: ")
		.appendField(new Blockly.FieldDropdown([["int","myVarTypeInt"], ["size_t","myVarTypeSize_t"], ["double","myVarTypeDouble"], ["float","myVarTypeFloat"], ["char","myVarTypeChar"], ["string","myVarTypeString"], ["bool","myVarTypeBool"]]), "myVarType")
		.appendField("input:")
		.appendField(new Blockly.FieldTextInput(""), "text1");
			
			
		this.setOutput(true, "FuncParam");
		
		this.setInputsInline(false);
		this.setColour(arrayHUE);
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

Blockly.C['array_init_literal'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var dropdown_drop1 = typeConv(this.getField('myVarType').getText());
	var text_text1 = block.getFieldValue('text1');
	// TODO: Assemble C into code variable.
	var code = '';
	var error = "//WRONG TYPE ERROR INITIALIZATION\n";
	var errorCheck = false;
	
	//Helper Function for error
	function alert_WrongType(){
		//block.setWarningText("Wrong type has been selected in function parameter.");
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


















