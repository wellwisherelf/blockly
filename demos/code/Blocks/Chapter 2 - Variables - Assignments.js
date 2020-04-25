var mathHUE = 230;

Blockly.Blocks['math_arith'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "Int", "Size_t", "Double", "Float"]);
    this.appendValueInput("valinp2")
        .setCheck(["Number", "Int", "Size_t", "Double", "Float"])
        .appendField(new Blockly.FieldDropdown([["+","math_add"], ["-","math_min"], ["*","math_mul"], ["/","math_div"]]), "arith_op");
    this.appendDummyInput()
        .appendField("Parenthesis?")
        .appendField(new Blockly.FieldDropdown([["no","parenthNo"], ["yes","parenthYes"]]), "math_parenth");
    this.setInputsInline(true);
    this.setOutput(true, ["Number", "Int", "Size_t", "Double", "Float"]);
    this.setColour(mathHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['math_arith'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var dropdown_arith_op = this.getField('arith_op').getText();
	var value_valinp2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	var dropdown_math_parenth = this.getField('math_parenth').getText();
	// TODO: Assemble C into code variable.
	var code = '';

	if(dropdown_math_parenth == 'yes'){
		code += '( ';
	}

	if(value_valinp1.length < 1){
		value_valinp1 = 0;
	}

	if(value_valinp2.length < 1){
		value_valinp2 = 0;
	}

	code += value_valinp1 + ' ' + dropdown_arith_op + ' ' + value_valinp2;

	if(dropdown_math_parenth == 'yes'){
		code += ' )';
	}


	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['math_unary'] = {
	init: function() {
		this.appendValueInput("valinp1")
			.setCheck(["Number", "Variable", "Int", "Size_t", "double", "Float"])
			.appendField("negative -");
		this.setInputsInline(true);
		this.setOutput(true, null);
		this.setColour(mathHUE);
		this.setTooltip("Returns the negative of the number or variable.\nReturns - Number or Variable\n\nInput - Numberor Variable");
		this.setHelpUrl("");
	}
};

Blockly.C['math_unary'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '-';

	if(value_valinp1.length > 0){
		code += value_valinp1;
	}
	else {
		code += '1';
	}

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};


Blockly.Blocks['math_sqrt'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Square Root (");
    this.appendValueInput("NAME")
        .setCheck(["Number", "Double", "Float"]);
    this.appendDummyInput()
        .appendField(")");
    this.setOutput(true, ["Number", "Double", "Float"]);
    this.setColour(mathHUE);
 this.setTooltip("Returns the square root of the inputted number.\nReturns - Double or Float\nRequires - <cmath>\nInput - Number");
 this.setHelpUrl("http://www.cplusplus.com/reference/cmath/sqrt/");
  }
};

Blockly.C['math_sqrt'] = function(block) {
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.

	var code = '';

	if(value_name.length > 0){
		code = 'sqrt(' + value_name + ')';
	}
	else {
		code = 'sqrt(' + '4)';
	}


	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};


Blockly.Blocks['number_rand'] = {
  init: function() {
    this.appendValueInput("NAME1")
        .setCheck(["Int", "Size_t", "Number"])
        .appendField("rand() %");
    this.appendValueInput("NAME2")
        .setCheck(["Int", "Size_t", "Number"])
        .appendField("+");
    this.appendDummyInput();
    this.setOutput(true, ["Number", "Int"]);
    this.setColour(mathHUE);
 this.setTooltip("Generates a pseudo-random number between zero and the first number, added by the second.\nReturns - int\nRequires - <iostream> or <cstdlib>\nInput(s) - Number");
 this.setHelpUrl("http://www.cplusplus.com/reference/cstdlib/rand/");
  }
};

Blockly.C['number_rand'] = function(block) {
	var value_name1 = Blockly.C.valueToCode(block, 'NAME1', Blockly.C.ORDER_ATOMIC);
	var value_name2 = Blockly.C.valueToCode(block, 'NAME2', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.

	var binInp1 = '';
	var binInp2 = '';

	if(value_name1.length < 1){ binInp1 = 10; }
	else {binInp1 = value_name1; }
	if(value_name2.length < 1){ binInp2 = 1; }
	else {binInp2 = value_name2; }

  	var code = 'rand() % ' + binInp1 + ' + ' + binInp2;

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['number_srand'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("srand(");
    this.appendValueInput("NAME")
        .setCheck(["Number", "Time_t"]);
    this.appendDummyInput()
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(mathHUE);
 this.setTooltip("Determines the seed for rand. Different seeds will result in a different succession of numbers for rand().\nInput - size_t (unsigned int) or NULL");
 this.setHelpUrl("http://www.cplusplus.com/reference/cstdlib/srand/");
  }
};

Blockly.C['number_srand'] = function(block) {
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	if(value_name.length > 0){
		code += 'srand(' + value_name + ')';
	}
	else {
		code += 'srand(1)';
	}

	code += ';\n';

	return code;
};

Blockly.Blocks['time_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("time(");
    this.appendValueInput("NAME")
        .setCheck(["Number", "Null"]);
    this.appendDummyInput()
        .appendField(")");
    this.setOutput(true, ["Number", "Time_t"]);
    this.setColour(mathHUE);
 this.setTooltip("Returns the number of seconds since January 1, 1970 at 00:00:00 GMT.\nReturns - time_t\nRequires - <ctime>\nInput - time_t or NULL");
 this.setHelpUrl("https://www.programiz.com/cpp-programming/library-function/ctime/time");
  }
};

Blockly.C['time_time'] = function(block) {
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	if(value_name.length > 0){
		code = 'time(' + value_length + ')';
	}
	else {
		code = 'time(NULL)';
	}

	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['math_mod'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Int", "Size_t", "Number"]);
    this.appendValueInput("valinp2")
        .setCheck(["Int", "Size_t", "Number"])
        .appendField("%");
    this.setInputsInline(true);
    this.setOutput(true, "Int");
    this.setColour(mathHUE);
 this.setTooltip("Returns the remainder of the first number by the second number.\nReturns - Int\nRequires - <cmath>\nInput(s) - Int");
 this.setHelpUrl("https://www.cprogramming.com/tutorial/modulus.html");
  }
};

Blockly.C['math_mod'] = function(block) {
	var value_name1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var value_name2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	code += value_name1 + ' % ' + value_name2;

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['math_fabs'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck("Number")
        .appendField("fabs(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, ["Number", "Double"]);
    this.setColour(mathHUE);
 this.setTooltip("Returns the absolute value of the inputted number.\nReturns - Number\nRequires - <cmath>\nInput - Number");
 this.setHelpUrl("http://www.cplusplus.com/reference/cmath/fabs/");
  }
};

Blockly.C['math_fabs'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	code += 'fabs(' + value_valinp1 + ')';


	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['math_pow'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Int", "Size_t", "Double", "Number"])
        .appendField("pow(");
    this.appendValueInput("valinp2")
        .setCheck(["Int", "Size_t", "Double", "Number"])
        .appendField(",");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, ["Int", "Size_t", "Double", "Number"]);
    this.setColour(mathHUE);
 this.setTooltip("Raise the first number to the power of the second number.\nReturns - Number\nRequires - <cmath>\nInput(s) - Number");
 this.setHelpUrl("http://www.cplusplus.com/reference/cmath/pow/");
  }
};

Blockly.C['math_pow'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var value_valinp2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	code += 'pow(' + value_valinp1 + ', ' + value_valinp2 + ')';

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['static_cast'] = {
	init: function() {
	this.appendValueInput("valinp1")
		.appendField("static_cast<")
		.appendField(new Blockly.FieldDropdown([["int","myTypeInt"], ["double","myTypeDouble"], ["float","myTypeFloat"], ["size_t","myTypeSize_t"]]), "myType")
		.appendField(">(")
		.setCheck(["Int", "Size_t", "Double", "Float", "Number", "Variable"]);
	this.appendDummyInput()
		.appendField(")");
	this.setOutput(true, null);
	this.setColour(mathHUE);
	this.setTooltip("Changes the type of the inputted number.\nReturns - static_cast type\nInput - Number");
	this.setHelpUrl("http://www.cplusplus.com/doc/tutorial/typecasting/");
	},
	
	onchange: function(){
		
		this.setOutput(true, typeConv(this.getField('myType').getText()));
		
	}
};

Blockly.C['static_cast'] = function(block) {
	var dropdown_mytype = this.getField('myType').getText();
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	code += 'static_cast<' + dropdown_mytype + '>(' + value_valinp1 + ')';


	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['math_pi'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("const double")
			.appendField(new Blockly.FieldVariable("PI_VAL"), "valinp1");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(mathHUE);
		this.setTooltip("Defines the constant PI.");
		this.setHelpUrl("");
	}
};

Blockly.C['math_pi'] = function(block) {
	var variable_valinp1 = Blockly.C.variableDB_.getName(block.getFieldValue('valinp1'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble C into code variable.
	var code = '';

	code += 'const double ' + variable_valinp1 + '  = 3.14159265;\n';

	return code;
};

Blockly.Blocks['math_scinum'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(1), "num1")
        .appendField("e")
        .appendField(new Blockly.FieldNumber(2), "num2");
    this.setOutput(true, ["Number", "Double"]);
    this.setColour(mathHUE);
 this.setTooltip("Defines an exponential number.\nReturns - Double / Float");
 this.setHelpUrl("http://www.cplusplus.com/reference/ios/scientific/");
  }
};

Blockly.C['math_scinum'] = function(block) {
	var number_num1 = block.getFieldValue('num1');
	var number_num2 = block.getFieldValue('num2');
	// TODO: Assemble C into code variable.
	var code = '';

	code += number_num1 + 'e' + number_num2;

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['math_setprecision'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck("Number")
        .appendField("fixed, setprecision(")
        .appendField(new Blockly.FieldNumber(1, 0, Infinity, 1), "numinp1")
        .appendField(")");
    this.setColour(mathHUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['math_setprecision'] = function(block) {
	var number_numinp1 = block.getFieldValue('numinp1');
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	var std = 'std::';
	
	if(C_Logic.namespace.using_namespace_std === true){
		
	}
	
	
	
	return code;
};








