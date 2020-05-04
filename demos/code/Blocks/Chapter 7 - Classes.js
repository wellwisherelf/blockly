
var classHue = 35;


Blockly.Blocks['ds_struct'] = {
	init: function() {
		this.appendDummyInput()
			.appendField('struct ')
			.appendField(new Blockly.FieldVariable("myStruct", null, ['isStruct'], 'isStruct'), "myStructDec");
		this.appendStatementInput("state1")
			.setCheck(null);
		
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(classHue);
		this.setTooltip("");
		this.setHelpUrl("");

		this.setMutator(new Blockly.Mutator(['ds_constructor', 'ds_copy_constructor']));

		//Default this to a struct
		this.setDataStr("isStruct", true);
		
		this.getVar_;

		//Get all variable objects that have been declared
		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];

		this.getObjVarProtected_ = [];
		this.getObjFuncProtected_ = [];

		this.getObjVarPrivate_ = [];
		this.getObjFuncPrivate_ = [];
		
		//variable that will later combine
		//the above
		this.getAllVars_ = [];
		
		//get all function objects that have been declared
		this.getObjFunc_ = [];

		//Array to keep track of the names (member names)
		this.mNames_ = [];
		
		//Array to keep track of the types (member names)
		this.mTypes_ = [];
		
		

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
		
	},
	
	onchange: function(){
		
		this.getVar_ = this.getField('myStructDec').getText();

		let Scope = C_Scope;

		this.mNames_ = [];
		this.mTypes_ = [];
		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];

		//ptr is which ever node we're
		//looking at
		var ptr = null;

		if(this.inputList[1].connection.targetConnection){
			ptr = this.inputList[1].connection.sourceBlock_;
		}

		if(ptr){
			Scope.recursion_log(ptr, true);
	
			this.mNames_ = Scope.getBlockName();
			this.mTypes_ = Scope.getVarName();
			this.getObjVarPublic_ = Scope.getObjVar();
			this.getObjFuncPublic_ = Scope.getObjFunc();
		}
		

		this.combineVariables();
		this.allocateWarnings();
	},
	
	combineVariables: function(){
		this.getAllVars_ = [];
		
		if(this.getObjVarPublic_){
			for(var i = 0; i < this.getObjVarPublic_.length; ++i){
				this.getAllVars_.push(this.getObjVarPublic_[i]);
			}
		}
		if(this.getObjFuncPublic_){
			for(var i = 0; i < this.getObjFuncPublic_.length; ++i){
				this.getAllVars_.push(this.getObjFuncPublic_[i]);
			}
		}
	},
	
	allocateWarnings: function(){
		
		var TT = '';

		var result = C_Logic.help.is_element_unique(this.getAllVars_);

		if(result){
			TT += 'Error, redeclaration of variable. \n' ;
		}
		
		if(TT.length > 0){
			this.setWarningText(TT);
		}
		else{
			this.setWarningText(null);
		}
		
	}
};

Blockly.C['ds_struct'] = function(block) {
	var variable_mystructdec = Blockly.C.variableDB_.getName(block.getFieldValue('myStructDec'), Blockly.Variables.NAME_TYPE);
	var statements_state1 = Blockly.C.statementToCode(block, 'state1');
	// TODO: Assemble C into code variable.
	code = '';


	code += 'struct ' + variable_mystructdec + '{\n';
	
	code += statements_state1;
	
	code += '};\n';
	
	return code;
};



Blockly.Blocks['ds_class'] = {
	init: function() {
		this.appendDummyInput()
			.appendField('class ')
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

		//Default this to a class
		this.setDataStr("isClass", true);


		//Categorize the scopes explicitly
		//to make it easier to aggregate
		//data for inheritance
		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];

		this.getObjVarProtected_ = [];
		this.getObjFuncProtected_ = [];

		this.getObjVarPrivate_ = [];
		this.getObjFuncPrivate_ = [];

		this.getVar_;
		//Array to hold all declared
		//variables in this scope
		this.getAllVars_ = [];
	},
	
	onchange: function(){
		this.getVar_ = this.getField('myClassDec').getText();
		
		// <--- Clean the arrays
		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];

		this.getObjVarProtected_ = [];
		this.getObjFuncProtected_ = [];

		this.getObjVarPrivate_ = [];
		this.getObjFuncPrivate_ = [];
		// --->
		
		let PublicScope = C_Scope;
		let PrivateScope = C_Scope;

		var ptr = null;
		
		if(this.inputList[2].connection.targetConnection){
			ptr = this.inputList[2].connection.sourceBlock_;
			
			if(ptr){
				PublicScope.recursion_log(ptr, true);
				this.getObjVarPublic_ = PublicScope.getObjVar();
				this.getObjFuncPublic_ = PublicScope.getObjFunc();
			}
		}

		if(this.inputList[4].connection.targetConnection){
			ptr = this.inputList[4].connection.sourceBlock_;
			
			if(ptr){
				PrivateScope.recursion_log(ptr, true);
				this.getObjVarPrivate_ = PrivateScope.getObjVar();
				this.getObjFuncPrivate_ = PrivateScope.getObjFunc();
			}
		}
		
		this.combineVariables();
		this.allocateWarnings();

	},
	
	combineVariables: function(){
		this.getAllVars_ = [];
		
		if(this.getObjVarPublic_){
			for(var i = 0; i < this.getObjVarPublic_.length; ++i){
				console.log(this.getObjVarPublic_[i]);
				this.getAllVars_.push(this.getObjVarPublic_[i]);
			}
		}
		if(this.getObjFuncPublic_){
			for(var i = 0; i < this.getObjFuncPublic_.length; ++i){
				this.getAllVars_.push(this.getObjFuncPublic_[i]);
			}
		}
		if(this.getObjVarPrivate_){
			for(var i = 0; i < this.getObjVarPrivate_.length; ++i){
				this.getAllVars_.push(this.getObjVarPrivate_[i]);
			}
		}
		if(this.getObjFuncPrivate_){
			for(var i = 0; i < this.getObjFuncPrivate_.length; ++i){
				this.getAllVars_.push(this.getObjFuncPrivate_[i]);
			}
		}
	},
	
	allocateWarnings: function(){
		let C = C_Logic;
		
		var result = C.help.is_element_unique(this.getAllVars_);
		
		var TT = "";
		
		if(result){
			TT += 'Error, redefinition of variable.';
		}
		
		if(TT.length > 0){
			this.setWarningText(TT);
		}
		else {
			this.setWarningText(null);
		}
		
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


Blockly.Blocks['ds_declare'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldVariable("myStruct", null, ['isStruct', 'isClass'], 'isStruct'), "myStructDec")
			.appendField(new Blockly.FieldVariable("myObj", null, ['isObj'], 'isObj'), "myStructObj");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(classHue);
		this.setTooltip("Declaring a struct object. The first variable refers to the struct being referenced, the second refers to the user's custom object name.");
		this.setHelpUrl("");
		
		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];

		this.getObjVarProtected_ = [];
		this.getObjFuncProtected_ = [];

		this.getObjVarPrivate_ = [];
		this.getObjFuncPrivate_ = [];

		this.getVar_;
	},

	onchange: function(){

		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];

		this.getObjVarProtected_ = [];
		this.getObjFuncProtected_ = [];

		this.getObjVarPrivate_ = [];
		this.getObjFuncPrivate_ = [];

		var struct = this.getField('myStructDec').getText();
		
		this.getVar_ = this.getField('myStructObj').getText();

		var ptr = this;
		
		var hasBeenDeclared = false;


		while(ptr != undefined){
			
			if((ptr.getDataStr() == 'isStruct' || ptr.getDataStr() == 'isClass') && ptr.getVar_ == struct){
				hasBeenDeclared = true;

				this.getObjVarPublic_ = ptr.getObjVarPublic_;
				this.getObjFuncPublic_ = ptr.getObjFuncPublic_;
				
				this.getObjVarProtected_ = ptr.getObjVarProtected_;
				this.getObjFuncProtected_ = ptr.getObjFuncProtected_;
				
				this.getObjVarPrivate_ = ptr.getObjVarPrivate_;
				this.getObjFuncPrivate_ = ptr.getObjFuncPrivate_;

				break;
			}

			ptr = ptr.parentBlock_;
		}

		var TT = '';

		if(!hasBeenDeclared){
			TT += '"' + struct + '" has not been declared.\n';
		}

		if(TT.length > 0){
			this.setWarningText(TT);
		}
		else {
			this.setWarningText(null);
		}

		
		
		console.log('--- ds_declare ---');
		console.log('public var - ' + this.getObjVarPublic_);
		console.log('public func - ' + this.getObjFuncPublic_);
		console.log('protected var - ' + this.getObjVarProtected_);
		console.log('protected func - ' + this.getObjFuncProtected_);
		console.log('private var - ' + this.getObjVarPrivate_);
		console.log('private func - ' + this.getObjFuncPrivate_);


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

//use C_Scope to get which class or struct from field variable, and output data via an array inside C_Scope
//potential: use an array of C_Scope objects to keep track of each class object.
//Set as empty within the onchange
Blockly.Blocks['ds_object_call'] = {
	init: function() {

		this.memberVar_ = [['', 'objNone']];

		this.appendDummyInput("duminp1")
			.appendField(new Blockly.FieldVariable("myObj", null, ['isObj'], 'isObj'), "myStructObjDef")
			.appendField(new Blockly.FieldDropdown([['.', 'objCall'], ['->', 'ptrCall']]), 'obj');
		

		this.appendDummyInput('duminp1').appendField(new Blockly.FieldDropdown(this.setObjectMembersField.bind(this)), 'objMembers');
		//this.appendValueInput('valinp1')
		//	.setCheck("FuncParam");

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(classHue);
		this.setTooltip("Declaring a struct object. The first variable refers to the struct being referenced, the second refers to the user's function in the object.\nInput - Function.");
		this.setHelpUrl("");
    	this.setInputsInline(true);

		this.getVar_;

		this.memberVar_;

		//Categorize the scopes explicitly
		//to make it easier to aggregate
		//data for inheritance
		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];

		this.getObjVarProtected_ = [];
		this.getObjFuncProtected_ = [];

		this.getObjVarPrivate_ = [];
		this.getObjFuncPrivate_ = [];

	},

	onchange: function(){
		
		this.memberVar_ = [];

		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];

		this.getObjVarProtected_ = [];
		this.getObjFuncProtected_ = [];

		this.getObjVarPrivate_ = [];
		this.getObjFuncPrivate_ = [];

		this.getVar_ = this.getField('myStructObjDef').getText();

		var TT = '';
		
		var hasBeenDeclared = false;

		var ptr = this;
		
		ptr = ptr.parentBlock_;

		while(ptr != undefined){
			
			//If a ds_declare block is found and the variable is the same
			if(ptr.type == 'ds_declare' && ptr.getVar_ == this.getVar_){
				hasBeenDeclared = true;

				if(ptr.getObjVarPublic_ != null && ptr.getObjVarPublic_ != undefined && this.getObjVarPublic_ != null && this.getObjVarPublic_ != undefined){
					this.getObjVarPublic_ = ptr.getObjVarPublic_;
				}

				if(ptr.getObjFuncPublic_ != null && ptr.getObjFuncPublic_ != undefined && this.getObjFuncPublic_ != null && this.getObjFuncPublic_ != undefined){
					this.getObjFuncPublic_ = ptr.getObjFuncPublic_;
				}

				//this.getObjVarProtected_ = getObjVarProtected_;
				//this.getObjFuncProtected_ = getObjFuncProtected_;
				//
				//this.getObjVarPrivate_ = getObjVarPrivate_;
				//this.getObjFuncPrivate_ = getObjFuncPrivate_;

				break;
			}

			ptr = ptr.parentBlock_;
		}

		if(!hasBeenDeclared){
			TT += 'Error, "' + this.getVar_ + '" has not been declared.\n';
		}


		if(TT.length > 0){
			this.setWarningText(TT);
		}
		else {
			this.setWarningText(null);
		}
		
		
		//var topBlocks = this.workspace.getTopBlocks();
		//console.log(topBlocks);

		this.setMembers();
		this.setObjectMembersField();

		//console.log(this.setMembers());
	},

	setMembers: function(){
		var options = [];
		//this.memberVar_.length = 0;
		options.push(["", "objNone"]);

		if(this.getObjVarPublic_ != null && this.getObjVarPublic_ != undefined){
			for(var i = 0; i < this.getObjVarPublic_.length; ++i){
				options.push([this.getObjVarPublic_[i], this.getObjVarPublic_[i].toUpperCase()]);
			}
		}
		
		if(this.getObjFuncPublic_ != null && this.getObjFuncPublic_ != undefined){
			for(var i = 0; i < this.getObjFuncPublic_.length; ++i){
				options.push([this.getObjFuncPublic_[i], this.getObjFuncPublic_[i].toUpperCase()]);
			}
		}
		
		if(this.getObjVarProtected_ != null){
			for(var i = 0; i < this.getObjVarProtected_.length; ++i){
				options.push([this.getObjVarProtected_[i], this.getObjVarProtected_[i].toUpperCase()]);
			}
		}
		
		if(this.getObjFuncProtected_ != null){
			for(var i = 0; i < this.getObjFuncProtected_.length; ++i){
				options.push([this.getObjFuncProtected_[i], this.getObjFuncProtected_[i].toUpperCase()]);
			}
		}
		
		//if(this.getObjVarPrivate_ != null){
		//	for(var i = 0; i < this.getObjVarPrivate_.length; ++i){
		//		options.push([this.getObjVarPrivate_[i], this.getObjVarPrivate_[i].toUpperCase()]);
		//	}
		//}
		//
		//if(this.getObjFuncPrivate_ != null){
		//	for(var i = 0; i < this.getObjFuncPrivate_.length; ++i){
		//		options.push([this.getObjFuncPrivate_[i], this.getObjFuncPrivate_[i].toUpperCase()]);
		//	}
		//}
		
		this.memberVar_ = options;

		
		console.log('--- ds_object_call ---');
		console.log('public var - ' + this.getObjVarPublic_);
		console.log('public func - ' + this.getObjFuncPublic_);
		console.log('protected var - ' + this.getObjVarProtected_);
		console.log('protected func - ' + this.getObjFuncProtected_);
		console.log('private var - ' + this.getObjVarPrivate_);
		console.log('private func - ' + this.getObjFuncPrivate_);
	},

	setObjectMembersField: function(){
		return this.memberVar_;
	}

};

Blockly.C['ds_object_call'] = function(block) {
	var variable_mystructobjdef = Blockly.C.variableDB_.getName(block.getFieldValue('myStructObjDef'), Blockly.Variables.NAME_TYPE);
	//var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var dropdown_mycall = this.getField('obj').getText();
	var obj = this.getField('objMembers').getText();

	// TODO: Assemble C into code variable.
	var code = '';
	
	code += variable_mystructobjdef;
	
	if(obj.length > 0){
		code += dropdown_mycall + obj;
	}

	//if(value_valinp1.length > 0){
	//	code += dropdown_mycall + value_valinp1;
	//}
	
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
			.appendField('mutator');

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
		this.appendDummyInput().appendField('public');

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
		this.appendDummyInput().appendField('protected');

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
		this.appendDummyInput().appendField('private');

		this.setColour(classHue);

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);

		this.setTooltip('');
		this.setHelpUrl('');

		this.setEnabled(true);
	}
};


Blockly.Blocks['ds_object_call_input'] = {
	init: function() {

		this.memberVar_ = [['', 'objNone']];

		this.appendDummyInput("duminp1")
			.appendField(new Blockly.FieldVariable("myObj", null, ['isObj'], 'isObj'), "myStructObjDef")
			.appendField(new Blockly.FieldDropdown([['.', 'objCall'], ['->', 'ptrCall']]), 'obj');
		

		this.appendDummyInput('duminp1').appendField(new Blockly.FieldDropdown(this.setObjectMembersField.bind(this)), 'objMembers');
		//this.appendValueInput('valinp1')
		//	.setCheck("FuncParam");
		
		this.setOutput(true, null);
		
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(classHue);
		this.setTooltip("Declaring a struct object. The first variable refers to the struct being referenced, the second refers to the user's function in the object.\nInput - Function.");
		this.setHelpUrl("");
    	this.setInputsInline(true);

		this.getVar_;

		this.memberVar_;

		//Categorize the scopes explicitly
		//to make it easier to aggregate
		//data for inheritance
		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];

		this.getObjVarProtected_ = [];
		this.getObjFuncProtected_ = [];

		this.getObjVarPrivate_ = [];
		this.getObjFuncPrivate_ = [];

	},

	onchange: function(){
		
		this.memberVar_ = [];

		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];

		this.getObjVarProtected_ = [];
		this.getObjFuncProtected_ = [];

		this.getObjVarPrivate_ = [];
		this.getObjFuncPrivate_ = [];

		this.getVar_ = this.getField('myStructObjDef').getText();

		var TT = '';
		
		var hasBeenDeclared = false;

		var ptr = this;
		
		ptr = ptr.parentBlock_;

		while(ptr != undefined){
			
			//If a ds_declare block is found and the variable is the same
			if(ptr.type == 'ds_declare' && ptr.getVar_ == this.getVar_){
				hasBeenDeclared = true;

				if(ptr.getObjVarPublic_ != null && ptr.getObjVarPublic_ != undefined && this.getObjVarPublic_ != null && this.getObjVarPublic_ != undefined){
					this.getObjVarPublic_ = ptr.getObjVarPublic_;
				}

				if(ptr.getObjFuncPublic_ != null && ptr.getObjFuncPublic_ != undefined && this.getObjFuncPublic_ != null && this.getObjFuncPublic_ != undefined){
					this.getObjFuncPublic_ = ptr.getObjFuncPublic_;
				}

				//this.getObjVarProtected_ = getObjVarProtected_;
				//this.getObjFuncProtected_ = getObjFuncProtected_;
				//
				//this.getObjVarPrivate_ = getObjVarPrivate_;
				//this.getObjFuncPrivate_ = getObjFuncPrivate_;

				break;
			}

			ptr = ptr.parentBlock_;
		}

		if(!hasBeenDeclared){
			TT += 'Error, "' + this.getVar_ + '" has not been declared.\n';
		}


		if(TT.length > 0){
			this.setWarningText(TT);
		}
		else {
			this.setWarningText(null);
		}
		
		
		//var topBlocks = this.workspace.getTopBlocks();
		//console.log(topBlocks);

		this.setMembers();
		this.setObjectMembersField();

		//console.log(this.setMembers());
	},

	setMembers: function(){
		var options = [];
		//this.memberVar_.length = 0;
		options.push(["", "objNone"]);

		if(this.getObjVarPublic_ != null && this.getObjVarPublic_ != undefined){
			for(var i = 0; i < this.getObjVarPublic_.length; ++i){
				options.push([this.getObjVarPublic_[i], this.getObjVarPublic_[i].toUpperCase()]);
			}
		}
		
		if(this.getObjFuncPublic_ != null && this.getObjFuncPublic_ != undefined){
			for(var i = 0; i < this.getObjFuncPublic_.length; ++i){
				options.push([this.getObjFuncPublic_[i], this.getObjFuncPublic_[i].toUpperCase()]);
			}
		}
		
		if(this.getObjVarProtected_ != null){
			for(var i = 0; i < this.getObjVarProtected_.length; ++i){
				options.push([this.getObjVarProtected_[i], this.getObjVarProtected_[i].toUpperCase()]);
			}
		}
		
		if(this.getObjFuncProtected_ != null){
			for(var i = 0; i < this.getObjFuncProtected_.length; ++i){
				options.push([this.getObjFuncProtected_[i], this.getObjFuncProtected_[i].toUpperCase()]);
			}
		}
		
		//if(this.getObjVarPrivate_ != null){
		//	for(var i = 0; i < this.getObjVarPrivate_.length; ++i){
		//		options.push([this.getObjVarPrivate_[i], this.getObjVarPrivate_[i].toUpperCase()]);
		//	}
		//}
		//
		//if(this.getObjFuncPrivate_ != null){
		//	for(var i = 0; i < this.getObjFuncPrivate_.length; ++i){
		//		options.push([this.getObjFuncPrivate_[i], this.getObjFuncPrivate_[i].toUpperCase()]);
		//	}
		//}
		
		this.memberVar_ = options;

		
		console.log('--- ds_object_call ---');
		console.log('public var - ' + this.getObjVarPublic_);
		console.log('public func - ' + this.getObjFuncPublic_);
		console.log('protected var - ' + this.getObjVarProtected_);
		console.log('protected func - ' + this.getObjFuncProtected_);
		console.log('private var - ' + this.getObjVarPrivate_);
		console.log('private func - ' + this.getObjFuncPrivate_);
	},

	setObjectMembersField: function(){
		return this.memberVar_;
	}

};

Blockly.C['ds_object_call_input'] = function(block) {
	var variable_mystructobjdef = Blockly.C.variableDB_.getName(block.getFieldValue('myStructObjDef'), Blockly.Variables.NAME_TYPE);
	//var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var dropdown_mycall = this.getField('obj').getText();
	var obj = this.getField('objMembers').getText();

	// TODO: Assemble C into code variable.
	var code = '';
	
	code += variable_mystructobjdef;
	
	if(obj.length > 0){
		code += dropdown_mycall + obj;
	}

	//if(value_valinp1.length > 0){
	//	code += dropdown_mycall + value_valinp1;
	//}
	
	return [code, Blockly.C.ORDER_NONE];
};









