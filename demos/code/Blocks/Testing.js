Blockly.Blocks['check_childparent'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(null)
        .appendField("child/parent block");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['check_childparent'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	code += '\nchildBlock_: ' + this.childBlock_ + ';\n';
	code += 'parentBlock_: ' + this.parentBlock_ + ';\n';
	code += 'getPreviousBlock(): ' + this.getPreviousBlock() + ';\n';
	code += 'getSurroundParent(): ' + this.getSurroundParent() + ';\n';
	code += 'getChildren(): ' + this.getChildren() + '';
	
	
	
	
	// TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.C.ORDER_NONE];
};



Blockly.Blocks['check_updown'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(null)
        .appendField("child/parent block");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['check_updown'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	code += '\nchildBlock_: ' + this.childBlock_ + ';\n';
	code += 'parentBlock_: ' + this.parentBlock_ + ';\n';
	code += 'getPreviousBlock(): ' + this.getPreviousBlock() + ';\n';
	code += 'getSurroundParent(): ' + this.getSurroundParent() + ';\n';
	code += 'getChildren(): ' + this.getChildren() + ';\n';
	
	// TODO: Change ORDER_NONE to the correct strength.
	return code;
};


Blockly.Blocks['workspace_check'] = {
	init: function() {
		this.appendDummyInput("duminp1")
			.appendField("workspace check");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
  
Blockly.C['workspace_check'] = function(block) {
	// TODO: Assemble C into code variable.
	var code = '';
	
	console.log(this.workspace.getAllBlocks(false));

	code += this.workspace.getAllBlocks(false);

	// TODO: Change ORDER_NONE to the correct strength.
	return code;
};

