
var classHue = 35;


Blockly.Blocks['ds_struct'] = {
	init: function() {
		this.appendDummyInput()
			.appendField('struct')
			.appendField(new Blockly.FieldVariable("myStruct", null, ['isStruct'], 'isStruct'), "myStructDec");
		this.appendStatementInput("state1")
			.setCheck(null);
		
			
			
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(classHue);
		this.setTooltip("");
		this.setHelpUrl("");

		this.setMutator(new Blockly.Mutator(['class_mutator_public', 'class_mutator_protected', 'class_mutator_private', 'ds_constructor', 'ds_copy_constructor']));

		//Default this to a struct
		this.setDataStr("isStruct", true);
		

	},

	mutationToDom: function(){
		var container = document.createElement('mutation');
		return container;
	},

	domToMutation: function(xmlElement){

	},

	decompose: function(workspace){
		var containerBlock = workspace.newBlock('class_mutator');
		containerBlock.initSvg();

		return containerBlock;
	},

	compose: function(containerBlock){
		
	}
};

Blockly.C['ds_struct'] = function(block) {
	var variable_mystructdec = Blockly.C.variableDB_.getName(block.getFieldValue('myStructDec'), Blockly.Variables.NAME_TYPE);
	var statements_state1 = Blockly.C.statementToCode(block, 'state1');
	// TODO: Assemble C into code variable.
	code = '';
	


	code += variable_mystructdec + '{\n';
	
	code += statements_state1;
	
	code += '};\n';
	
	return code;
};


Blockly.Blocks['ds_class'] = {
	init: function() {
		this.appendDummyInput()
			.appendField('class')
			.appendField(new Blockly.FieldVariable("myClass", null, ['isClass'], 'isClass'), "myClassDec");
		this.appendDummyInput().appendField("public");
		this.appendStatementInput("state1")
			.setCheck(null);
		
		this.appendDummyInput().appendField("private");
		this.appendStatementInput("state2").setCheck(null).appendField("");
			
			
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(classHue);
		this.setTooltip("");
		this.setHelpUrl("");

		this.setMutator(new Blockly.Mutator(['ds_constructor', 'ds_copy_constructor']));

		//Default this to a struct
		this.setDataStr("isClass", true);
		
	},

	generateOptions: function() {
		var options = [];
		var now = Date.now();
		for(var i = 0; i < 7; i++) {
		  var dateString = String(new Date(now)).substring(0, 3);
		  options.push([dateString, dateString.toUpperCase()]);
		  now += 24 * 60 * 60 * 1000;
		}
		return options;
	}
	
};

Blockly.C['ds_class'] = function(block){
	var variable_mystructdec = Blockly.C.variableDB_.getName(block.getFieldValue('myClassDec'), Blockly.Variables.NAME_TYPE);
	var statements_state1 = Blockly.C.statementToCode(block, 'state1');
	var statements_state2 = Blockly.C.statementToCode(block, 'state2');
	
	
	code = '';
	code += 'class ' + variable_mystructdec + '{';
	code += '\n  public:\n';
	code += statements_state1;
	code += '  private:\n';
	code += statements_state2;
	code += '};\n';


	return code;
};

Blockly.Blocks['ds_class_inheritance'] = {
	init: function() {
		this.appendDummyInput()
			.appendField('class')
			.appendField(new Blockly.FieldVariable("myClass", null, ['isClass'], 'isClass'), "myClassDec");
		this.appendDummyInput().appendField("public");
		this.appendStatementInput("state1")
			.setCheck(null);
		
		this.appendDummyInput().appendField("protected");
		this.appendStatementInput("state2").setCheck(null).appendField("");
		
		this.appendDummyInput().appendField("private");
		this.appendStatementInput("state3").setCheck(null).appendField("");
			
			
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(classHue);
		this.setTooltip("");
		this.setHelpUrl("");

		this.setMutator(new Blockly.Mutator(['class_mutator_public', 'class_mutator_protected', 'class_mutator_private', 'ds_constructor', 'ds_copy_constructor']));

		//Default this to a struct
		this.setDataStr("isStruct", true);
		

	}
};
Blockly.Blocks['ds_declare'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("myStruct"), "myStructDec")
        .appendField(new Blockly.FieldVariable("myStructObj"), "myStructObj");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(classHue);
 this.setTooltip("Declaring a struct object. The first variable refers to the struct being referenced, the second refers to the user's custom object name.");
 this.setHelpUrl("");
  }
};

Blockly.C['ds_declare'] = function(block) {
	var variable_mystructdec = Blockly.C.variableDB_.getName(block.getFieldValue('myStructDec'), Blockly.Variables.NAME_TYPE);
	var variable_mystructobj = Blockly.C.variableDB_.getName(block.getFieldValue('myStructObj'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble C into code variable.
	var code = '';
	
	code += variable_mystructdec + ' '  + variable_mystructobj + ';\n';
	
	return code;
};


Blockly.Blocks['ds_object_call'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck("FuncParam")
        .appendField(new Blockly.FieldVariable("myObj", null, ['isStruct', 'isClass'], 'isStruct'), "myStructObjDef")
		.appendField(new Blockly.FieldDropdown([['.', 'objCall'], ['->', 'ptrCall']]), 'obj');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(classHue);
 this.setTooltip("Declaring a struct object. The first variable refers to the struct being referenced, the second refers to the user's function in the object.\nInput - Function.");
 this.setHelpUrl("");
  }
};

Blockly.C['ds_object_call'] = function(block) {
	var variable_mystructobjdef = Blockly.C.variableDB_.getName(block.getFieldValue('myStructObjDef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var dropdown_mycall = this.getField('obj').getText();
	// TODO: Assemble C into code variable.
	var code = '';
	
	code += variable_mystructobjdef;
	
	if(value_valinp1.length > 0){
		code += dropdown_mycall + value_valinp1;
	}
	
	code += ';\n';
	
	return code;
};

Blockly.Blocks['ds_constructor'] = {
	init: function() {
		this.appendDummyInput()
			.appendField('constructor')
			.appendField(new Blockly.FieldVariable("myStruct", null, ['isStruct', 'isClass'], 'isStruct'), "myStructRef");
			
		this.appendStatementInput("state1")
			.setCheck(null);
			
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(classHue);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.C['ds_constructor'] = function(block) {
	var variable_mystructref = Blockly.C.variableDB_.getName(block.getFieldValue('myStructRef'), Blockly.Variables.NAME_TYPE);
	var statements_state1 = Blockly.C.statementToCode(block, 'state1');
	// TODO: Assemble C into code variable.
	var code = '';
	
	code += variable_mystructref + '(){\n';
	
	code += statements_state1;
	
	code += '}\n';
	
	return code;
};

Blockly.Blocks['ds_copy_constructor'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck("FuncParam")
        .appendField("copy constructor")
        .appendField(new Blockly.FieldVariable("myStruct", null, ['isStruct', 'isClass'], 'isStruct'), "myStructRef")
        .appendField("");
    this.appendStatementInput("state1")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(classHue);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['ds_copy_constructor'] = function(block) {
	var variable_mystructref = Blockly.C.variableDB_.getName(block.getFieldValue('myStructRef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var statements_state1 = Blockly.C.statementToCode(block, 'state1');
	// TODO: Assemble C into code variable.
	var code = '';
	
	
	code += variable_mystructref + '('
	
	if(value_valinp1.length > 0){
		code += value_valinp1;
	}
	
	code += '){\n'
	
	code += statements_state1;
	
	code += '}\n';
	
	return code;
};



Blockly.Blocks['class_mutator'] = {
	init: function(){

		this.appendDummyInput()
			.appendField(LOC.ch7.class);

		this.appendStatementInput('state1')
			.appendField('')
			.setCheck(null);

		this.setColour(classHue);

		this.setPreviousStatement(false);
		this.setNextStatement(false);

		this.setTooltip('');
		this.setHelpUrl('');


	}
};


Blockly.Blocks['class_mutator_public'] = {
	init: function(){
		this.appendDummyInput().appendField(LOC.ch7.public);

		this.setColour(classHue);

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);

		this.setTooltip('');
		this.setHelpUrl('');

		this.setEnabled(true);
	}
};

Blockly.Blocks['class_mutator_protected'] = {
	init: function(){
		this.appendDummyInput().appendField(LOC.ch7.protected);

		this.setColour(classHue);

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);

		this.setTooltip('');
		this.setHelpUrl('');

		this.setEnabled(true);
	}
};

Blockly.Blocks['class_mutator_private'] = {
	init: function(){
		this.appendDummyInput().appendField(LOC.ch7.private);

		this.setColour(classHue);

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);

		this.setTooltip('');
		this.setHelpUrl('');

		this.setEnabled(true);
	}
};











