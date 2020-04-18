
var stringHUE = 160;


Blockly.Blocks['printf'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("printf(")
			.appendField(new Blockly.FieldTextInput(""), "inp1")
			.appendField(")");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(stringHUE);
		this.setTooltip("A standard string output.\nRequires - <iostream> or <string>\nNote - Printf is used primarily as a simple string output. More complex output requires cout.");
		this.setHelpUrl("http://www.cplusplus.com/reference/cstdio/printf/");
	}
};

Blockly.C['printf'] = function(block) {
	var text_inp1 = block.getFieldValue('inp1');
	// TODO: Assemble C into code variable.
	var code = 'printf("';
	code += text_inp1 + '");\n';

	return code;
};

Blockly.Blocks['to_string'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "Int", "Size_t", "Double", "Float", "Char"])
        .appendField("to_string");
    this.setOutput(true, "String");
    this.setColour(stringHUE);
 this.setTooltip("Turns any number type into a string. \nAccepted number types: int, long, float, double, unsigned\nRequires - <string>\nNote - to_string can accept characters, but it is not an intended input.\n(more to come) ");
 this.setHelpUrl("http://www.cplusplus.com/reference/string/to_string/");
  }
};

Blockly.C['to_string'] = function(block) {
	var value_name = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	var std = '';

	if(usingSTD === false){
		std += 'std::';
	}

	code += std + 'to_string(' + value_name + ')';

	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['string_size'] = {
	init: function() {
		this.appendValueInput("valinp1")
			.setCheck("Variable");
		this.appendDummyInput()
			.appendField(".size()");
		this.setOutput(true, ["Number", "Int", "Size_t"]);
		this.setColour(stringHUE);
		this.setTooltip("Returns the amount of characters in a string.\nReturns - Int or Size_t\nRequires - <string>\nInput - String");
		this.setHelpUrl("http://www.cplusplus.com/reference/string/string/size/");
	}
};

Blockly.C['string_size'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	if(value_valinp1.length > 0){
		code += value_valinp1 + '.size()';
	}

	return [code, Blockly.C.ORDER_NONE];
};


Blockly.Blocks['string_concatenate'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(null)
        .appendField("concatenate \"")
        .appendField(new Blockly.FieldTextInput("str"), "inp")
        .appendField("\"");
    this.setOutput(true, "String");
    this.setColour(stringHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['string_concatenate'] = function(block) {
  var text_inp = block.getFieldValue('inp');
  var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	//true is <<, false is +
	var type = false;

	if( this.getChildren().indexOf("(cout)") !== -1 ){
		type = true;
	}


	code += '"';

	if(text_inp.length > 0){
		code += text_inp;
	}

	code += '"';

	if(value_valinp1.length > 0){

		if(type === false){
			code += ' + ';
		}

		if(type === true){
			code += ' << ';
		}

		code += value_valinp1;
	}

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['var_concatenate'] = {
	init: function() {
		this.appendValueInput("valinp1")
			.appendField("concatenate")
			.setCheck(null)
			.appendField(new Blockly.FieldVariable("myStrVar"), "varDef");
		this.setOutput(true, null);
		this.setColour(stringHUE);
		this.setTooltip("");
		this.setHelpUrl("");
		this.tag = '';
	},

	onchange:function(){



	}

};

Blockly.C['var_concatenate'] = function(block) {
	var variable_vardef = Blockly.C.variableDB_.getName(block.getFieldValue('varDef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	//true is <<, false is +
	var type = false;

	if( this.getChildren().indexOf('(cout)') !== -1 || this.getChildren().indexOf('endl') !== -1 ){
		type = true;
	}
	if(variable_vardef.length > 0){
		code += variable_vardef;
	}

	if(value_valinp1.length > 0){

		if(type === false){
			code += ' + ';
		}

		if(type === true){
			code += ' << ';
		}

		code += value_valinp1;
	}


	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};


Blockly.Blocks['var_concatenate_mutator'] = {
	init: function() {
		this.appendStatementInput("state1")
			.appendField("concatenate:")
			.setCheck(null);
			
		this.setOutput(true, null);
		this.setColour(stringHUE);
		this.setTooltip("");
		this.setHelpUrl("");
	}

};


Blockly.Blocks['var_concatenate_add_var'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("concatenate:")
			.appendField(new Blockly.FieldVariable("myStrVar"), "varDef");
			
		this.setOutput(true, null);
		this.setColour(stringHUE);
		this.setTooltip("");
		this.setHelpUrl("");
	}

};

Blockly.Blocks['var_concatenate_add_str'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("concatenate:")
			.appendField(new Blockly.FieldTextInput("my string"), "strDef");
			
		this.setOutput(true, null);
		this.setColour(stringHUE);
		this.setTooltip("");
		this.setHelpUrl("");
	}

};





