Blockly.Blocks['loop_whiledo'] = {
  init: function() {
    this.appendValueInput("valinp")
        .setCheck(["Conditional", "Logic", "Boolean"])
        .appendField("repeat")
        .appendField(new Blockly.FieldDropdown([["while","myLoopVarWhile"], ["until","myLoopVarUntil"]]), "myLoopVar");
    this.appendStatementInput("statement_input")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
 this.setTooltip("A while loop will run code as long as the set condition is true.");
 this.setHelpUrl("https://www.tutorialspoint.com/cplusplus/cpp_while_loop.htm");
  }
};

Blockly.C['loop_whiledo'] = function(block) {
	var dropdown_myloopvar = this.getField('myLoopVar').getText();
	var value_valinp = Blockly.C.valueToCode(block, 'valinp', Blockly.C.ORDER_ATOMIC);
	var statements_statement_input = Blockly.C.statementToCode(block, 'statement_input');
	// TODO: Assemble C into code variable.
	var code = '';

	code += 'while(';

	if(dropdown_myloopvar == 'until'){
		code += '!';
	}


	if(value_valinp.length > 0){
		code += value_valinp;
	}
	else {
		code += 'true';
	}

	code += '){\n';

	if(statements_statement_input.length > 0){
		code += statements_statement_input;
	}
	else {

	}


	code += '}\n';

	return code;
};

Blockly.Blocks['loop_for'] = {
	init: function() {
		this.appendValueInput("valinp1")
			.setCheck("Number")
			.appendField("for (")
			.appendField(new Blockly.FieldDropdown([["int","myLoopVarInt"], ["size_t","myLoopVarSize_t"], ["double","myLoopVarDouble"]]), "myLoopVarType")
			.appendField(new Blockly.FieldVariable("i"), "myLoopVar1")
			.appendField("=");
		this.appendDummyInput()
			.appendField(";")
			.appendField(new Blockly.FieldVariable("i"), "myLoopVar2")
			.appendField(new Blockly.FieldDropdown([["<","LESSER"], [">","GREATER"], ["<=","LEQUAL"], [">=","GEQUAL"], ["==","EQUAL"], ["!=","NEQUAL"]]), "myLoopVarComp");
		this.appendValueInput("valinp2")
			.setCheck("Number");
		this.appendDummyInput()
			.appendField(";")
			.appendField(new Blockly.FieldVariable("i"), "myLoopVar3")
			.appendField(new Blockly.FieldDropdown([["++","myLoopInc"], ["--","myLoopDec"]]), "myLoopCh")
			.appendField(")");
		this.appendStatementInput("stateinp1")
			.setCheck(null);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(135);
		this.setTooltip("A for loop is a loop that allows you to loop through a code a specific number of times.");
		this.setHelpUrl("https://www.tutorialspoint.com/cplusplus/cpp_for_loop.htm");
	},

	onchange: function(){
		var value_valinp1 = Blockly.C.valueToCode(this, 'valinp1', Blockly.C.ORDER_ATOMIC);
		var value_valinp2 = Blockly.C.valueToCode(this, 'valinp2', Blockly.C.ORDER_ATOMIC);
		var dropdown_myloopch = this.getField('myLoopCh').getText();

		var TT = '';
		TT = 'This loop will loop from ' + value_valinp1 + ' to ' + value_valinp2 + ' and will ';

		if(dropdown_myloopch === '++'){
			TT += ' increase by 1 each iteration.';
		}
		if(dropdown_myloopch === '--'){
			TT += ' decrease by 1 each iteration.';
		}

		TT += '\n';

		this.setTooltip(TT);

	}

};

Blockly.C['loop_for'] = function(block) {
	var dropdown_myloopvartype = this.getField('myLoopVarType').getText();
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);

	var variable_myloopvar1 = Blockly.C.variableDB_.getName(block.getFieldValue('myLoopVar1'), Blockly.Variables.NAME_TYPE);

	var variable_myloopvar2 = Blockly.C.variableDB_.getName(block.getFieldValue('myLoopVar2'), Blockly.Variables.NAME_TYPE);

	var variable_myloopvar3 = Blockly.C.variableDB_.getName(block.getFieldValue('myLoopVar3'), Blockly.Variables.NAME_TYPE);

	var dropdown_myloopvarcomp = this.getField('myLoopVarComp').getText();
	var value_valinp2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	var dropdown_myloopch = this.getField('myLoopCh').getText();

 	var statements_stateinp1 = Blockly.C.statementToCode(block, 'stateinp1');
	// TODO: Assemble C into code variable.
	var code = '';

	code += "for(" + dropdown_myloopvartype + " " + variable_myloopvar1 + " = " + value_valinp1 + '; '
	+ variable_myloopvar2 + " " + dropdown_myloopvarcomp + " " + value_valinp2 + '; '
	+ variable_myloopvar3 + dropdown_myloopch;

	code += '){\n';

	code += statements_stateinp1;

	code += '}\n';



	return code;
};

Blockly.Blocks['loop_range'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("for(auto ")
        .appendField(new Blockly.FieldVariable("x"), "myVar")
        .appendField(":")
        .appendField(new Blockly.FieldVariable("myArray"), "myArrVar")
        .appendField(")");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
 this.setTooltip("A for-range loop is a for loop that ranges through an array or vector. This is a useful way to easily loop through an array or vector without knowing its size.");
 this.setHelpUrl("https://docs.microsoft.com/en-us/cpp/cpp/range-based-for-statement-cpp?view=vs-2019");
  }
};

Blockly.C['loop_range'] = function(block) {
	var variable_myvar = Blockly.C.variableDB_.getName(block.getFieldValue('myVar'), Blockly.Variables.NAME_TYPE);
	var variable_myarrvar = Blockly.C.variableDB_.getName(block.getFieldValue('myArrVar'), Blockly.Variables.NAME_TYPE);
	var statements_name = Blockly.C.statementToCode(block, 'NAME');
	// TODO: Assemble C into code variable.
	var code = '';

	code += "for(auto " + variable_myvar + " : " + variable_myarrvar + ")";

	code += "{\n";

	code += statements_name;

	code += "}\n";

	return code;
};

Blockly.Blocks['loop_dowhile'] = {
  init: function() {
    this.appendStatementInput("stateinp1")
        .setCheck(["Conditional", "Logic", "Boolean"])
        .appendField("do");
    this.appendValueInput("valinp1")
        .setCheck("Boolean")
        .appendField("repeat")
        .appendField(new Blockly.FieldDropdown([["while","myLoopVarWhile"], ["until","myLoopVarUntil"]]), "myLoopVar");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
 this.setTooltip("A do-while loop functions exactly the same way as a while loop, however the conditions are checked after the loop interates; meaning the loop will always run at least once.");
 this.setHelpUrl("https://www.tutorialspoint.com/cplusplus/cpp_do_while_loop.htm");
  }
};

Blockly.C['loop_dowhile'] = function(block) {
	var statements_stateinp1 = Blockly.C.statementToCode(block, 'stateinp1');
	var dropdown_myloopvar = this.getField('myLoopVar').getText();
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	code += "do {\n";

	code += statements_stateinp1;

	code += "\n} while(";

	if(dropdown_myloopvar === "until"){
		code += "!";
	}

	if(value_valinp1.length < 1){
		code += "true";
	}
	else {
		code += value_valinp1;
	}

	code += ");\n";

	return code;
};

Blockly.Blocks['loop_break'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("break");
    this.setPreviousStatement(true, null);
    this.setColour(135);
 this.setTooltip("A break has two uses:\n1. A break is a statement that forcefully ends a control loop. It will end the loop, regardless of whether or not the loop condition itself has been met.\n2.A break is a statement that ends a case in a switch statement.");
 this.setHelpUrl("https://www.tutorialspoint.com/cplusplus/cpp_break_statement.htm");
  }
};

Blockly.C['loop_break'] = function(block) {
	// TODO: Assemble C into code variable.
	var code = 'break;\n';
	return code;
};
