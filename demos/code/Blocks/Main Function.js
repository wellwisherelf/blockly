

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
Blockly.Blocks['main_comment'] = {
	init: function() {
		this.appendValueInput("valinp")
			.setCheck(null)
		    .appendField("//")
		    .appendField(new Blockly.FieldTextInput("myComment"), "input");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");

		this.setMutator(new Blockly.Mutator(['main_comment_add']));
		this.commentCount_ = 0;
	},

	mutationToDom: function(){
		if(!this.commentCount_){
		  return null;
		}
		var container = document.createElement('mutation');
  
		if(this.commentCount_){
		  container.setAttribute('commentadd', this.commentCount_);
		}
		console.log('test');
		return container;
	},

	domToMutation: function(xmlElement){
		this.commentCount_ = parseInt(xmlElement.getAttribute('commentadd'), 10);
		for(var i = 1; i <= this.commentCount_; i++){
			this.appendValueInput('valinp' + i).setCheck(null).appendField('').setAlign(Blockly.ALIGN_RIGHT);
		}
	},

	decompose: function(workspace){
		var containerBlock = workspace.newBlock('main_comment_mutator');
		containerBlock.initSvg();

		var connection = containerBlock.getInput('state1').connection;

		for(var i = 1; i <= this.commentCount_; ++i){
			var add = workspace.newBlock('main_comment_add');
			add.initSvg();
			connection.connect(add.previousConnection);
			connection = add.nextConnection;
		}
		
		return containerBlock;
	},

	compose: function(containerBlock){
		for(var i = this.commentCount_; i > 0; i--){
			this.removeInput('valinp' + i);
		}
		this.commentCount_ = 0;
		
		var clauseBlock = containerBlock.getInputTargetBlock('state1');
		while(clauseBlock){
			switch(clauseBlock.blockName){
				case 'main_comment_add':
					this.commentCount_++;
					var comment = this.appendValueInput('valinp' + this.commentCount_)
						.setCheck(null).appendField('//').setAlign(Blockly.ALIGN_RIGHT);

					if(clauseBlock.valueConnection_){
						comment.connection.connect(clauseBlock.valueConnection_);
					}
				break;

				default:
					throw 'Unknown block type.';
			}
			clauseBlock = clauseBlock.nextConnection 
			&& clauseBlock.nextConnection.targetBlock();
		}


	},

	saveConnections: function(containerBlock){
		var clauseBlock = containerBlock.getInputTargetBlock('state1');
		var i = 1;
		
		while(clauseBlock){
			switch(clauseBlock.blockName){
				case 'main_comment_add':
					var comment = this.getInput('valinp' + i);
					console.log(comment);
					clauseBlock.valueConnection_ = comment && comment.connection.targetConnection;
					clauseBlock.statementConnection_ = i++;
					break;
				default:
					throw 'Unknown block type.';
			}
			clauseBlock = clauseBlock.nextConnection 
			&& clauseBlock.nextConnection.targetBlock();
		}
	},

	onchange: Blockly.Blocks.requireInFunction


};

Blockly.C['main_comment'] = function(block) {
	var text_input = block.getFieldValue('input');
	// TODO: Assemble C into code variable.
	var code = '//' + text_input + '\n';
	return code;
};

//Comment mutator main
Blockly.Blocks['main_comment_mutator'] = {
	init: function(){
		this.appendStatementInput('state1')
		    .setCheck(null);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

//Comment mutator main
Blockly.Blocks['main_comment_add'] = {
	init: function(){
		this.appendDummyInput()
		    .appendField('');
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
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









