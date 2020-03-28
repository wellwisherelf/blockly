
var switchHUE = 60;

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
		
		
		this.setMutator(new Blockly.Mutator(['switch_case']));
		
		this.caseCount_ = 0;
		
	},

	mutationToDom: function(){
		if(!this.caseCount_){
		  return null;
		}
		var container = document.createElement('mutation');
		if(this.caseCount_){
		  container.setAttribute('caseadd', this.caseCount_);
		}
		return container;
	},

	domToMutation: function(xmlElement){
		this.caseCount_ = parseInt(xmlElement.getAttribute('caseadd'), 10);

	},

	decompose: function(workspace){
		var containerBlock = workspace.newBlock('switch_case_mutator');
		containerBlock.initSvg();
		return containerBlock;
	},

	compose: function(containerBlock){

	},


	//
	getName: function(){
		return ['Switch'];
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

Blockly.C


Blockly.Blocks['switch_case'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Int", "Size_t", "Char", "Number", "Boolean"])
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
		this.setHelpUrl("https://www.tutorialspoint.com/cpluspluscpp_break_statement.htm");
	}
};

Blockly.C['switch_break'] = function(block) {
	// TODO: Assemble C into code variable.
	var code = 'break;\n';
	return code;
};

Blockly.Blocks['switch_case_mutator'] = {
	init: function(){
	  	//The Variable for the switch case
	  	this.appendDummyInput().appendField('Switch Case: ')
	  	.appendField(new Blockly.FieldVariable("myVar"), "myVarDec");
		
		this.appendStatementInput('state1').setCheck(['switch_case']);
		
	  	this.setPreviousStatement(false);
	  	this.setNextStatement(false);
	  	this.setColour(switchHUE);
	  	this.setTooltip('');
	  	this.setHelpUrl('');
		
	}
};

Blockly.Blocks['switch_case_input'] = {
	init: function(){
		this.appendDummyInput()
			.appendField(new Blockly.FieldTextInput("input"), "inp");
		
		
	}
}