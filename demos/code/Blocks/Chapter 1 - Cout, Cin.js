var coutHUE = 25;
var cinHUE = 50;

Blockly.Blocks['output_cout'] = {
  init: function() {
    this.appendValueInput("valinp0")
        .setCheck(null)
        .appendField("cout <<");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(coutHUE);
	this.setTooltip("Outputs the input into the output stream. \nRequires - <iostream>");
	this.setHelpUrl("http://www.cplusplus.com/doc/tutorial/basic_io/");
	
	this.setMutator(new Blockly.Mutator(['cout_stream_add']));

	//count of added couts in the stream
	this.coutStreamCount_ = 0;

	},
	
	mutationToDom: function(){
	  if(!this.coutStreamCount_){
		return null;
	  }
	  var container = document.createElement('mutation');

	  if(this.coutStreamCount_){
		container.setAttribute('printadd', this.coutStreamCount_);
	  }
	  
	  return container;
	},

	domToMutation: function(xmlElement){
		this.coutStreamCount_ = parseInt(xmlElement.getAttribute('printadd'), 10);
		for(var i = 1; i <= this.coutStreamCount_; i++){
			this.appendValueInput('valinp' + i).setCheck(null).appendField('cout << ').setAlign(Blockly.ALIGN_RIGHT);
		}
	},

	decompose: function(workspace){
		var containerBlock = workspace.newBlock('cout_stream_mutator');
		containerBlock.initSvg();

		var connection = containerBlock.getInput('STACK').connection;
		for(var i = 1; i <= this.coutStreamCount_; ++i){
			var add = workspace.newBlock('cout_stream_add');
			add.initSvg();
			connection.connect(add.previousConnection);
			connection = add.nextConnection;
		}

		return containerBlock;
	},

	compose: function(containerBlock){
		for(var i = this.coutStreamCount_; i > 0; i--){
			this.removeInput('valinp' + i);
		}
		this.coutStreamCount_ = 0;

		var clauseBlock = containerBlock.getInputTargetBlock('STACK');
		while(clauseBlock){
			switch(clauseBlock.type){
				case 'cout_stream_add':
					this.coutStreamCount_++;
					var printInput = this.appendValueInput('valinp' + this.coutStreamCount_)
						.setCheck(null).appendField('cout << ').setAlign(Blockly.ALIGN_RIGHT);

					if(clauseBlock.valueConnection_){
						printInput.connection.connect(clauseBlock.valueConnection_);
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
		var clauseBlock = containerBlock.getInputTargetBlock('STACK');
		var i = 1;
		while(clauseBlock){
			switch(clauseBlock.type){
				case 'cout_stream_add':
					var inputPrint = this.getInput('valinp' + i);
					clauseBlock.valueConnection_ = inputPrint && inputPrint.connection.targetConnection;
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

Blockly.C['output_cout'] = function(block) {
	var val = Blockly.C.valueToCode(block, 'valinp0', Blockly.C.ORDER_NONE);
	// TODO: Assemble C into code variable.

	var code = '';
	var std = '';

	if(usingSTD == false){
		std = 'std::';
	}

	if(this.coutStreamCount_ < 1 && !val){
		code += std + 'cout << ' + std + 'endl';
	}
	else if(this.coutStreamCount_ < 1 && val){
		code += std + 'cout << ' + val;
	}
	else if(this.coutStreamCount_ > 0 && !val){
		code += std + 'cout << ' + std + 'endl';

		for(var i = 0; i < this.coutStreamCount_; ++i){
			code += ' << ' + std + 'endl';
		}
	}
	else{

		code += std + 'cout << ' + val;

		for(var i = 1; i <= this.coutStreamCount_; ++i){
			var arg = Blockly.C.valueToCode(block, 'valinp' + i, Blockly.C.ORDER_NONE);
			var childConnection = this.inputList[i].connection;
			var childBlock = childConnection.targetBlock();


			if(childBlock){
				code += ' << ' + arg;
			}
		}
	}

	code += ';\n';
	return code;
};

Blockly.Blocks['cout_output'] = {
  init: function() {
    this.appendDummyInput()
		.appendField("(cout)")
        .appendField(new Blockly.FieldTextInput("input"), "inp");
    this.setOutput(true, 'Cout');
    this.setColour(coutHUE);
 this.setTooltip("Inserts a custom string into the cout stream.\nReturns - Cout\nRequires - <iostream>\nInput - Anything");
 this.setHelpUrl("");
  }
};

Blockly.C['cout_output'] = function(block) {
	var text_inp = block.getFieldValue('inp');
	// TODO: Assemble C into code variable.
	// TODO: Change ORDER_NONE to the correct strength.
	var code = '"';
	code += text_inp;
	code += '"';

	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['cout_endl'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("(cout) endl")
    this.setOutput(true, "Cout");
    this.setColour(coutHUE);
 this.setTooltip("Moves the output of cout to a new line.");
 this.setHelpUrl("http://www.cplusplus.com/reference/ostream/endl");
  }
};

Blockly.C['cout_endl'] = function(block) {
	// TODO: Assemble C into code variable.

	var code = '';
	var std = '';

	if(usingSTD == false){
		std = 'std::';

	}

	code = std + 'endl';

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['cout_var'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("(cout)")
			.appendField(new Blockly.FieldVariable("myVar"), "varDef");
		this.setOutput(true, null);
		this.setColour(coutHUE);
		this.setTooltip("Inserts a variable into a cout stream.");
		this.setHelpUrl("");
	}
};

Blockly.C['cout_var'] = function(block) {
	var variable_vardef = Blockly.C.variableDB_.getName(block.getFieldValue('varDef'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble C into code variable.
	var code = '';

	if(variable_vardef.length > 0){
		code += variable_vardef;
	}

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['cin_input'] = {
	init: function() {

		this.appendValueInput("valinp0")
			.setCheck(this.setCinCheck)
			.appendField("cin >>")
			.setAlign(Blockly.ALIGN_RIGHT);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(cinHUE);
		this.setTooltip("Grabs input from the console.");
		this.setHelpUrl("http://www.cplusplus.com/reference/iostream/cin/");
	
		this.setMutator(new Blockly.Mutator(['cin_stream_add']));

		this.cinStreamCount_ = 0;

		this.setCinCheck = 'Variable';
		
	},

	mutationToDom: function(){
		if(!this.cinStreamCount_){
			return null;
		}
		var container = document.createElement('mutation');

		if(this.cinStreamCount_){
			container.setAttribute('printadd', this.cinStreamCount_);
		}

		return container;
	},

	domToMutation: function(xmlElement){
		this.cinStreamCount_ = parseInt(xmlElement.getAttribute('printadd'), 10);
		for(var i = 1; i <= this.cinStreamCount_; i++){
			this.appendValueInput('valinp' + i).setCheck(this.setCinCheck).appendField('cin >> ').setAlign(Blockly.ALIGN_RIGHT);
		}
	},

	decompose: function(workspace){
		var containerBlock = workspace.newBlock('cin_stream_mutator');
		containerBlock.initSvg();

		var connection = containerBlock.getInput('STACK').connection;

		for(var i = 1; i <= this.cinStreamCount_; ++i){
			var add = workspace.newBlock('cin_stream_add');
			add.initSvg();

			console.log(this.cinStreamCount_);
			connection.connect(add.previousConnection);
			connection = add.nextConnection;
		}
		return containerBlock;
	},

	compose: function(containerBlock){
		for(var i = this.cinStreamCount_; i > 0; i--){
			this.removeInput('valinp' + i);
		}
		this.cinStreamCount_ = 0;

		var clauseBlock = containerBlock.getInputTargetBlock('STACK');
		while(clauseBlock){
			
			switch(clauseBlock.blockName){

				case 'cin_stream_add':
					this.cinStreamCount_++;
					var printInput = this.appendValueInput('valinp' + this.cinStreamCount_)
						.setCheck(this.setCinCheck).appendField('cin >> ').setAlign(Blockly.ALIGN_RIGHT);

					if(clauseBlock.valueConnection_){
						printInput.connection.connect(clauseBlock.valueConnection_);
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
		var clauseBlock = containerBlock.getInputTargetBlock('STACK');
		var i = 1;
		while(clauseBlock){

			switch(clauseBlock.blockName){

				case 'cin_stream_add':
					var inputPrint = this.getInput('valinp' + i);
					clauseBlock.valueConnection_ = inputPrint && inputPrint.connection.targetConnection;
					clauseBlock.statementConnection_ = i++;
				break;

				default:
					throw 'Unknown block type.';	
			}
			clauseBlock = clauseBlock.nextConnection &&
			clauseBlock.nextConnection.targetBlock();
		}
	},

	onchange: Blockly.Blocks.requireInFunction

};

Blockly.C['cin_input'] = function(block) {
	var val = Blockly.C.valueToCode(block, 'valinp0', Blockly.C.ORDER_NONE);
	// TODO: Assemble C into code variable.
	var code = '';
	var std = '';
	var WT = false;
	//tooltip for warning text

	if(usingSTD == false){
		std = 'std::';
	}

	if(this.cinStreamCount_ < 1 && !val){
		WT = true;
	}
	else if(this.cinStreamCount_ < 1 && val){
		code += std + 'cin >> ' + val;
	}
	else if(this.cinStreamCount_ > 0 && !val){
		WT = true;
	}
	else{

		code += std + 'cin >> ' + val;

		for(var i = 1; i <= this.cinStreamCount_; ++i){
			var arg = Blockly.C.valueToCode(block, 'valinp' + i, Blockly.C.ORDER_NONE);
			var childConnection = this.inputList[i].connection;
			var childBlock = childConnection.targetBlock();


			if(childBlock){
				code += ' >> ' + arg;
			}
			else { 
				WT = true;
			}
		}
	}

	this.setWarningText(null);
	if(WT == true){
		this.setWarningText("Block warning: all cin inputs must be attached to a variable block.");
	}
	
	if(code.length > 0){
		code += ';\n';
	}
	
	return code;
};


Blockly.Blocks['cin_parse'] = {
	init: function() {
		this.appendValueInput("valinp1")
			.setCheck("Cin")
			.appendField("(cin stream)")
			.appendField(new Blockly.FieldVariable("myVar"), "myVarDef");
		this.setOutput(true, "Cin");
		this.setColour(cinHUE);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.C['cin_parse'] = function(block) {
	var variable_name = Blockly.C.variableDB_.getName(block.getFieldValue('myVarDef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';

	code += variable_name;

	if(value_valinp1.length > 0){
		code += " >> " + value_valinp1;
	}
	else {

	}

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['cin_getline'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getline(cin, ")
        .appendField(new Blockly.FieldVariable("myVar"), "myVarDef")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(cinHUE);
 this.setTooltip("Grabs an entire line as a string.");
 this.setHelpUrl("http://www.cplusplus.com/reference/string/string/getline/");
  }
};

Blockly.C['cin_getline'] = function(block) {
	var variable_myvardef = Blockly.C.variableDB_.getName(block.getFieldValue('myVarDef'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble C into code variable.
	var code = '';
	var std = '';

	if(usingSTD === false){
		std = 'std::';
	}

	code += std + 'getline(' + std + 'cin, ' + variable_myvardef + ');\n';


	return code;
};



// Mutator blocks for the mutator
Blockly.Blocks['cout_stream_mutator'] = {
	init: function(){
		this.setColour(coutHUE);
		this.appendDummyInput().appendField('print');
		this.appendStatementInput('STACK');

		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setTooltip('');
		this.contextMenu = false;
	}
};


Blockly.Blocks['cout_stream_add'] = {
	init: function(){
		this.setColour(coutHUE);
		this.appendDummyInput().appendField('add');
		
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
		this.contextMenu = false;
	}
};



// Mutator blocks for the mutator
Blockly.Blocks['cin_stream_mutator'] = {
	init: function(){
		this.setColour(cinHUE);
		this.appendDummyInput().appendField('print');
		this.appendStatementInput('STACK');

		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setTooltip('');
		this.contextMenu = false;
	}
};


Blockly.Blocks['cin_stream_add'] = {
	init: function(){
		this.setColour(cinHUE);
		this.appendDummyInput().appendField('add');
		
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
		this.contextMenu = false;
	}
};