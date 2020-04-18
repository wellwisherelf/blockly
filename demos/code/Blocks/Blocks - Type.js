
Blockly.Blocks['get_var'] = {
	init: function() {
	this.appendDummyInput()
		.appendField(new Blockly.FieldVariable("myVar", null, ['isVar'], 'isVar'), "VAR");
	this.setOutput(true, null);
	this.setColour(variableHUE);
	this.setTooltip("");
	this.setHelpUrl("");
	this.contextMenu_ = 'Create "set %1"';
	},
	
	onchange: function(){
		if(this.parentBlock_ == null){
			this.setWarningText('Block warning, this block has a return and must be connected.');
		}
		else {
			this.setWarningText(null);
		}
	}


	/*
	customContextMenu: function(menu){
		var option = {
			enabled: true
		};

		var varName = this.getFieldValue('VAR');

		option.text = this.contextMenu_.replace('%1', varName);

		var xmlField = this.dom.createDom('field', null, varName);
		xmlField.setAttribute('varName', 'VAR');

		var xmlBlock = this.dom.createDom('block', null, xmlField);
		xmlBlock.setAttribute('type', 'Variable');

		option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
		menu.push(option);

	}
	*/
};
  
Blockly.C['get_var'] = function(block) {
	var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	code += variable_var;
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};