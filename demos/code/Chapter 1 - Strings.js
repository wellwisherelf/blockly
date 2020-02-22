
var stringHUE = 160;

var coutHUE = 25;

var cinHUE = 50;

Blockly.Blocks['printf'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("printf(\"")
			.appendField(new Blockly.FieldTextInput(""), "inp1")
			.appendField("\")");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(stringHUE);
		this.setTooltip("A standard string output.\nRequires - <iostream>\nNote - Printf is used primarily as a simple string output. More complex output requires cout.");
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



Blockly.Blocks['output_cout'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(["Number", "String", "Cout"])
        .appendField("cout <<");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(coutHUE);
 this.setTooltip("Outputs basically anything to the console in a very controlable manner. \nRequires - <iostream>");
 this.setHelpUrl("http://www.cplusplus.com/doc/tutorial/basic_io/");
  }
};

Blockly.C['output_cout'] = function(block) {
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.

	var code = '';



	if(usingSTD === true){
		if(value_name.length < 1){
			code += 'cout << endl;\n';
		}
		else {
			code += 'cout << ' + value_name + ";\n";
		}
	}
	else {
		if(value_name.length < 1){
			code += 'std::cout << std::endl;\n';
		}
		else {
			code += 'std::cout << ' + value_name + ";\n";
		}
	}

	return code;
};

Blockly.Blocks['cout_output'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(["Number", "String", "Cout"])
		.appendField("(cout)")
        .appendField(new Blockly.FieldTextInput("input"), "inp");
    this.setOutput(true, null);
    this.setColour(coutHUE);
 this.setTooltip("Inserts a custom string into the cout stream.\nReturns - Cout\nRequires - <iostream>\nInput - Anything");
 this.setHelpUrl("");
  }
};

Blockly.C['cout_output'] = function(block) {
	var text_inp = block.getFieldValue('inp');
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	// TODO: Change ORDER_NONE to the correct strength.
	var code = '"';
	code += text_inp;
	code += '"';

	if(value_name){
		code += " << " + value_name + "";
	}

	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['cout_endl'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .appendField("(cout) endl")
        .setCheck(["Number", "String", "Cout"])
    this.setOutput(true, "Cout");
    this.setColour(coutHUE);
 this.setTooltip("Moves the output of cout to a new line.");
 this.setHelpUrl("http://www.cplusplus.com/reference/ostream/endl");
  }
};

Blockly.C['cout_endl'] = function(block) {
	// TODO: Assemble C into code variable.
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);

	var code = '';

	if(usingSTD === false){
		code += 'std::endl';
	}
	else {
		var code = 'endl';
	}

	if(value_valinp1.length > 0){
		code += " << " + value_valinp1;
	}


	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['cout_var'] = {
	init: function() {
		this.appendValueInput("valinp1")
			.setCheck(null)
			.appendField("(cout)")
			.appendField(new Blockly.FieldVariable("myVar"), "varDef");
		this.setOutput(true, null);
		this.setColour(coutHUE);
		this.setTooltip("Inserts a variable into a cout stream.");
		this.setHelpUrl("");
	}
};

Blockly.C['cout_var'] = function(block) {
	var variable_vardef = Blockly.C.variableDB_.getName(block.getFieldValue('varDef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	if(variable_vardef.length > 0){
		code += variable_vardef;
	}


	if(value_valinp1.length > 0){
		code += ' << ' + value_valinp1;
	}




	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};



Blockly.Blocks['to_string'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "Int", "Size_t", "Double", "Float", "Char"])
        .appendField("to_string");
    this.setOutput(true, "String");
    this.setColour(stringHUE);
 this.setTooltip("Turns any number type into a string. \nAccepted number types: int, long, float, double, unsigned\nRequires - <string>\nNote - to_string can accept characters, but it is not an intendend input.\n(more to come) ");
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


Blockly.Blocks['cin_input'] = {
	init: function() {
		this.appendValueInput("valinp1")
			.setCheck("Cin")
			.appendField("cin >>")
			.appendField(new Blockly.FieldVariable("myVar"), "myVarDef");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(cinHUE);
		this.setTooltip("Grabs input from the console.");
		this.setHelpUrl("http://www.cplusplus.com/reference/iostream/cin/");
	}
};

Blockly.C['cin_input'] = function(block) {
	var variable_myvardef = Blockly.C.variableDB_.getName(block.getFieldValue('myVarDef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	var std = '';

	if(usingSTD === false){
		std = 'std::';
	}

	code += std + 'cin >> ' + variable_myvardef + '';

	if(value_valinp1.length > 0){
		code += " >> " + value_valinp1;
	}

	code += ';\n';

	return code;
};


Blockly.Blocks['cin_parse'] = {
	init: function() {
		this.appendValueInput("valinp1")
			.setCheck("Cin")
			.appendField("(cin parse)")
			.appendField(new Blockly.FieldVariable("myVar"), "myVarDef");
		this.setOutput(true, "Cin");
		this.setColour(cinHUE);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.C['cin_parse'] = function(block) {
	var variable_name = Blockly.C.variableDB_.getName(block.getFieldValue('myVarDef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	code += variable_name;

	if(value_valinp1.length > 0){
		code += " >> " + value_valinp1;
	}
	else {

	}

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['cin_getline'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getline(cin, ")
        .appendField(new Blockly.FieldVariable("myVar"), "myVarDef")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(cinHUE);
 this.setTooltip("Grabs an entire line as a string.");
 this.setHelpUrl("http://www.cplusplus.com/reference/string/string/getline/");
  }
};

Blockly.C['cin_getline'] = function(block) {
	var variable_myvardef = Blockly.C.variableDB_.getName(block.getFieldValue('myVarDef'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble C into code variable.
	var code = '';
	var std = '';

	if(usingSTD === false){
		std = 'std::';
	}

	code += std + 'getline(' + std + 'cin, ' + variable_myvardef + ');\n';


	return code;
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
