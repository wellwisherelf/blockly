Blockly.Blocks['operators'] = {
	init: function() {
		this.appendValueInput("valinp1")
			.setCheck(null);
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField(new Blockly.FieldDropdown([["=","equals"]]), "options");
		this.appendValueInput("valinp2")
			.setCheck(null);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.C['operators'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var dropdown_options = block.getField('options').getText();
	var value_valinp2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	code += value_valinp1 + ' ' + dropdown_options + ' ' + value_valinp2;
	
	code += ';\n';
	
	return code;
};