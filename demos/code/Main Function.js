

Blockly.Blocks['main'] = {
	init: function() {
		this.appendStatementInput("NAME").setCheck(null).appendField("int main()");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(0);
		this.setTooltip("");
		this.setHelpUrl("https://en.cppreference.com/w/cpp/language/main_function");
		
		
		
		
	}
};



Blockly.C['main'] = function(block) {	
	
	var code = 'int main(){\n';
	
	code += Blockly.C.statementToCode(block, 'NAME');
	
	return code + '  return 0;\n}\n';
	
};



//Comment
Blockly.Blocks['comment_single'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Comment: //")
        .appendField(new Blockly.FieldTextInput("myComment"), "input");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.C['comment_single'] = function(block) {
	var text_input = block.getFieldValue('input');
	// TODO: Assemble C into code variable.
	var code = '//' + text_input + '\n';
	return code;
};


//Comment
Blockly.Blocks['comment_multiline'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Multi-Line Comment Lines:")
			.appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "numinp1");
		this.appendDummyInput()
			.appendField("")
			.appendField(new Blockly.FieldTextInput("myComment"), "duminp1");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	},
	onchange : function(){
		if (!this.workspace) {
			// Block has been deleted.
			return;
		}
	}
};


Blockly.C['comment_multiline'] = function(block) {
	var number_numinp1 = block.getFieldValue('numinp1');
	var text_duminp1 = block.getFieldValue('duminp1');
	// TODO: Assemble C into code variable.
	var code = '';
	
	if(number_numinp1 == 0){
		code += "/* " + text_duminp1 + " */";
	}
	
	else {
		code += "/* \n";
		for(var i = 0; i < number_numinp1; ++i){
			
			code += "  " + text_duminp1 + "\n";
			
		}
		code += "*/ ";
	}
	
	code += '\n';
	
	
	return code;
};



//Shifts a code for a line, allows for user to format code
Blockly.Blocks['format_newLine'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("(Format Lines)")
			.appendField(new Blockly.FieldNumber(1, 1, 10), "newLines");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("How many lines you'd like to seperate between code blocks. Used for blockly only and does not generate code.");
		this.setHelpUrl("");
	}
};

Blockly.C['format_newLine'] = function(block) {
	var num = this.getField('newLines').getText();
	var code = '';
	
	for(var i = 0; i < num; ++i){
	code += '\n';
	}
	
	return code;
};









