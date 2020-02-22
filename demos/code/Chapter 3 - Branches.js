
var logicHUE = 210;

var cctypeHUE = 175;

var switchHUE = 60;



Blockly.Blocks['if_else_conditional'] = {
	init: function() {
		this.appendValueInput("valinp1")
			.setCheck("Boolean")
			.appendField("condition(");
		this.appendValueInput("valinp2")
			.setCheck(null)
			.appendField(") ?");
		this.appendValueInput("valinp3")
			.setCheck(null)
			.appendField(":");
		this.setInputsInline(true);
		this.setOutput(true, null);
		this.setColour(logicHUE);
		this.setTooltip("");
		this.setHelpUrl("https://www.w3schools.com/cpp/cpp_conditions.asp");
	}
};

Blockly.C['if_else_conditional'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var value_valinp2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	var value_valinp3 = Blockly.C.valueToCode(block, 'valinp3', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	if(value_valinp1.length < 1){
		value_valinp1 = 'true';
	}

	if(value_valinp2.length < 1){
		value_valinp2 = '2';
	}
	if(value_valinp3.length < 1){
		value_valinp3 = '1';
	}

	code += '(' + value_valinp1 + ')' + ' ? ' + value_valinp2 + ' : ' + value_valinp3;



	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['cctype_isalpha'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck("Char")
        .appendField("isalpha(");

    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, ["Int", "Boolean"]);
    this.setColour(cctypeHUE);
 this.setTooltip("Checks if the inputted character is alphabetic.\nReturns - Boolean\nRequires - <cctype>\nInput - Char");
 this.setHelpUrl("http://www.cplusplus.com/reference/cctype/isalpha/");
  }
};

Blockly.C['cctype_isalpha'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	if(value_valinp1.length < 1){
		value_valinp1 = "'a'"
	}

	code += "isalpha(" + value_valinp1 + ")";

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['cctype_isdigit'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck("Char")
        .appendField("isdigit(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, ["Int", "Boolean"]);
    this.setColour(cctypeHUE);
 this.setTooltip("Checks if the inputted character is a digit.");
 this.setHelpUrl("http://www.cplusplus.com/reference/cctype/isdigit/");
  }
};

Blockly.C['cctype_isdigit'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	if(value_valinp1.length < 1){
		value_valinp1 = "'0'";
	}

	code += "isdigit(" + value_valinp1 + ")";

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['cctype_isspace'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck("Char")
        .appendField("isspace(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, ["Int", "Boolean"]);
    this.setColour(cctypeHUE);
 this.setTooltip("Checks if the inputted character is whitespace.");
 this.setHelpUrl("http://www.cplusplus.com/reference/cctype/isspace/");
  }
};

Blockly.C['cctype_isspace'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	if(value_valinp1.length < 1){
		value_valinp1 = "' '";
	}

	code += "isspace(" + value_valinp1 + ")";

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['cctype_toupper'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck("Char")
        .appendField("toupper(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Char");
    this.setColour(cctypeHUE);
 this.setTooltip("Convert lowercase letter to uppercase.");
 this.setHelpUrl("http://www.cplusplus.com/reference/cctype/toupper/");
  }
};

Blockly.C['cctype_toupper'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	if(value_valinp1.length < 1){
		value_valinp1 = "'a'";
	}

	code += "toupper(" + value_valinp1 + ")";

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['cctype_tolower'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck("Char")
        .appendField("tolower(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Char");
    this.setColour(cctypeHUE);
 this.setTooltip("Convert uppercase letter to lowercase.");
 this.setHelpUrl("http://www.cplusplus.com/reference/cctype/tolower/");
  }
};

Blockly.C['cctype_tolower'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	if(value_valinp1.length < 1){
		value_valinp1 = "'A'";
	}

	code += "tolower(" + value_valinp1 + ")";

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['switch_statement'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck("Variable")
        .appendField("switch block");
    this.appendStatementInput("state1")
        .setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(switchHUE);
 this.setTooltip("The switch case statement; this functions similarly to an if-else statement.\nInput - Variable (Int, Char)");
 this.setHelpUrl("https://www.tutorialspoint.com/cplusplus/cpp_switch_statement.htm");
  }
};

Blockly.C['switch_statement'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var statements_state1 = Blockly.C.statementToCode(block, 'state1');
	// TODO: Assemble C into code variable.
	var code = '';

	code += 'switch(' + value_valinp1 + '){\n';
	code += statements_state1;
	code += '}\n';


	return code;
};

Blockly.Blocks['switch_case'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Int", "Size_t", "Char", "Number"])
        .appendField("switch case:");
    this.appendStatementInput("state1")
        .setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(switchHUE);
 this.setTooltip("The case statement; this functions similarly to an else if statement.\nInput - Int, Char, Variable");
 this.setHelpUrl("https://www.tutorialspoint.com/cplusplus/cpp_switch_statement.htm");
  }
};

Blockly.C['switch_case'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var statements_state1 = Blockly.C.statementToCode(block, 'state1');
	// TODO: Assemble C into code variable.
	var code = '';

	if(value_valinp1.length < 1){
		value_valinp1 = '1';
	}

	code += 'case ' + value_valinp1 + ':\n';

	code += statements_state1;

	return code;
};

Blockly.Blocks['switch_default'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("default:");
    this.appendStatementInput("state1")
        .setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(switchHUE);
 this.setTooltip("The default case for the switch case statement. If none of the cases are valid, this will occur instead.");
 this.setHelpUrl("https://www.tutorialspoint.com/cplusplus/cpp_switch_statement.htm");
  }
};

Blockly.C['switch_default'] = function(block) {
	var statements_state1 = Blockly.C.statementToCode(block, 'state1');
	// TODO: Assemble C into code variable.
	var code = '';

	code += 'default: \n';

	code += statements_state1;

	return code;
};


Blockly.Blocks['switch_break'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("break");
    this.setPreviousStatement(true, null);
    this.setColour(switchHUE);
 this.setTooltip("A break has two uses:\n1. A break is a statement that forcefully ends a control loop. It will end the loop, regardless of whether or not the loop condition itself has been met.\n2.A break is a statement that ends a case in a switch statement.");
 this.setHelpUrl("https://www.tutorialspoint.com/cplusplus/cpp_break_statement.htm");
  }
};

Blockly.C['switch_break'] = function(block) {
	// TODO: Assemble C into code variable.
	var code = 'break;\n';
	return code;
};
