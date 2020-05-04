
Blockly.Blocks['get_var'] = {
	init: function() {
	this.appendDummyInput()
		.appendField(new Blockly.FieldVariable("myVar", null, ['isVar'], 'isVar'), "VAR");
	this.setOutput(true, null);
	this.setColour(variableHUE);
	this.setTooltip("");
	this.setHelpUrl("");
	},
	
	onchange: function(){
		if(this.parentBlock_ == null){
			this.setWarningText('Block warning, this block has a return and must be connected.');
		}
		else {
			this.setWarningText(null);
		}
	}
};

Blockly.C['get_var'] = function(block) {
	var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble C into code variable.
	var code = '';
	code += variable_var;
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['get_func_var'] = {
	init: function() {
	this.appendDummyInput()
		.appendField(new Blockly.FieldVariable("myFuncVar", null, ['isFuncParam'], 'isFuncParam'), "funcVar");
	this.setOutput(true, null);
	this.setColour(variableHUE);
	this.setTooltip("");
	this.setHelpUrl("");
	},
	
	onchange: function(){
		if(this.parentBlock_ == null){
			this.setWarningText('Block warning, this block has a return and must be connected.');
		}
		else {
			this.setWarningText(null);
		}
	}
};
  
Blockly.C['get_func_var'] = function(block) {
	var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('funcVar'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble C into code variable.
	var code = '';
	code += variable_var;
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['set_func_var'] = {
	init: function() {
		
		this.paramNames_ = [['', 'varNone']];
		
	this.appendDummyInput()
		.appendField(new Blockly.FieldDropdown(this.allocateDropdown.bind(this)), "varMembers")
	this.setOutput(true, null);
	this.setColour(variableHUE);
	this.setTooltip("");
	this.setHelpUrl("");
	},
	
	onchange: function(){
		var options = [];
		options.push(["", "varNone"]);
		
		var ptr = this;
		
		while(ptr != null){
			ptr = ptr.getSurroundParent();
			
			if(ptr != null){
				if(ptr.type == "user_function"){
					for(var i = 0; i < ptr.paramNames_.length; ++i){
						options.push([ptr.paramNames_[i], ptr.paramNames_[i].toUpperCase()]);
					}
				}
			}
				
		}
		
		this.paramNames_ = options;
	},
	
	allocateDropdown: function(){
		return this.paramNames_;
	},
	
	allocateWarnings: function(){
		if(this.parentBlock_ == null){
			this.setWarningText('Block warning, this block has a return and must be connected.');
		}
		else {
			this.setWarningText(null);
		}
	}
};
  
Blockly.C['set_func_var'] = function(block) {
	var text = block.getField('varMembers').getText();
	// TODO: Assemble C into code variable.
	var code = '';
	
	code += text;
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

  

//A block that can be used for any type
Blockly.Blocks['block_type_all'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldTextInput(""), "input");
		
		
		
		this.setOutput(true, "string");
		this.setColour(variableHUE);
		this.setTooltip("");
		this.setHelpUrl("");
	},
	
	onchange: function(){
		if(this.parentBlock_ == null){
			this.setWarningText('Block warning, this block has a return and must be connected.');
		}
		else {
			this.setWarningText(null);
		}
	}
}


Blockly.C['block_type_all'] = function(block) {
	var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble JavaScript into code variable.
	var code = '';
	code += variable_var;
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['get_num'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldNumber(0), "numinp1");

		this.setOutput(true, null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
		this.numinp1;
	},

	onchange: function(){
		this.numinp1 = this.getField('numinp1').getText();
	}
};

Blockly.C['get_num'] = function(block) {
	var code = '';

	if(this.numinp1.length > 0){
		code += this.numinp1;
	}
	else {
		code += '0';
	}

	return [code, Blockly.C.ORDER_NONE];
};













