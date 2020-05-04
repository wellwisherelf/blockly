



Blockly.Blocks['ds_class_inheritance'] = {
	init: function() {
		this.appendDummyInput()
			.appendField('class ')
			.appendField(new Blockly.FieldVariable("myClass", null, ['isClass'], 'isClass'), "myClassDec");
		

		//Public
		this.appendDummyInput().appendField("public");
		this.appendStatementInput("state1")
			.setCheck(null);
		
		//Protected
		this.appendDummyInput().appendField("protected");
		this.appendStatementInput("state2").setCheck(null).appendField("");
		
		//Private
		this.appendDummyInput().appendField("private");
		this.appendStatementInput("state3").setCheck(null).appendField("");
			
			
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(classHue);
		this.setTooltip("");
		this.setHelpUrl("");

		this.setMutator(new Blockly.Mutator(['']));

		//Default this to a class
		this.setDataStr("isClass", true);
		
		//The name of the class
		this.getVar_;
		

		//Categorize the scopes explicitly
		//to make it easier to aggregate
		//data for inheritance
		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];

		this.getObjVarProtected_ = [];
		this.getObjFuncProtected_ = [];

		this.getObjVarPrivate_ = [];
		this.getObjFuncPrivate_ = [];
		
		//array to hold every declared var in this scope
		this.getAllVars_ = [];
	},

	mutationToDom: function(){
	    var container = document.createElement('mutation');
	    return container;
	},

	domToMutation: function(xmlElement){

	},

	decompose: function(workspace){
		var containerBlock = workspace.newBlock('ds_class_inheritance_mutator');
		containerBlock.initSvg();
		
		return containerBlock;
	},

	compose: function(containerBlock){

	},

	onchange: function(){

		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];

		this.getObjVarProtected_ = [];
		this.getObjFuncProtected_ = [];

		this.getObjVarPrivate_ = [];
		this.getObjFuncPrivate_ = [];

		//Update the name of the class
		this.getVar_ = this.getField('myClassDec').getText();

		//All that is defined inside of their respective Scopes

		var ptr = null;
		
		//public
		if(this.inputList[2].connection.targetConnection){
			ptr = this.inputList[2].connection.sourceBlock_;

			if(ptr){
				//Aggregate variables and functions declare
				//within the public field
				let PublicScope = C_Scope;
				PublicScope.recursion_log(ptr, true);

				if(PublicScope.getObjVar() != null){
					this.getObjVarPublic_ = PublicScope.getObjVar();
				}
				
				if(PublicScope.getObjFunc() != null){
					this.getObjFuncPublic_ = PublicScope.getObjFunc();
				}

				console.log(PublicScope.objVar);
				
	
			}
		}


		//protected
		if(this.inputList[4].connection.targetConnection){
			ptr = this.inputList[4].connection.sourceBlock_;

			if(ptr){
				//Aggregate variables and functions declare
				//within the protected field
				let ProtectedScope = C_Scope;
				ProtectedScope.recursion_log(ptr, true);

				if(ProtectedScope.getObjVar() != null){
					this.getObjVarProtected_ = ProtectedScope.getObjVar();
				}
				
				if(ProtectedScope.getObjFunc() != null){
					this.getObjFuncProtected_ = ProtectedScope.getObjFunc();
				}
	
			}
		}


		//private
		if(this.inputList[6].connection.targetConnection){
			ptr = this.inputList[6].connection.sourceBlock_;

			if(ptr){
				//Aggregate variables and functions declare
				//within the private field
				let PrivateScope = C_Scope;
				PrivateScope.recursion_log(ptr, true);

				if(PrivateScope.getObjVar() != null){
					this.getObjVarPrivate_ = PrivateScope.getObjVar();
				}
				
				if(PrivateScope.getObjFunc() != null){
					this.getObjFuncPrivate_ = PrivateScope.getObjFunc();
				}
	
			}
		}

		console.log('--- ds_class_inheritance ---');
		console.log('public var - ' + this.getObjVarPublic_);
		console.log('public func - ' + this.getObjFuncPublic_);
		console.log('protected var - ' + this.getObjVarProtected_);
		console.log('protected func - ' + this.getObjFuncProtected_);
		console.log('private var - ' + this.getObjVarPrivate_);
		console.log('private func - ' + this.getObjFuncPrivate_);

	}
};

Blockly.C['ds_class_inheritance'] = function(block){
    var code = '';

	var classVarDec = Blockly.C.variableDB_.getName(block.getFieldValue('myClassDec'), Blockly.Variables.NAME_TYPE);
	
	//public
	var statements_state1 = Blockly.C.statementToCode(block, 'state1');
	//protected
	var statements_state2 = Blockly.C.statementToCode(block, 'state2');
	//private
	var statements_state3 = Blockly.C.statementToCode(block, 'state3');

	code += 'class ' + classVarDec + ' {\n';
	code += 'public:\n';
	code += statements_state1;
	code += 'protected:\n';
	code += statements_state2;
	code += 'private:\n';
	code += statements_state3;
	code += '};\n';





    return code;
};





Blockly.Blocks['ds_class_inheritance_extend'] = {
	init: function() {
		this.appendDummyInput()
			.appendField('class ')
			.appendField(new Blockly.FieldVariable("myClass2", null, ['isClass'], 'isClass'), "myClassDec")
			.appendField(': ')
			.appendField(
				new Blockly.FieldDropdown([
					['public', 'publicExtend'], 
					['protected', 'protectedExtend'], 
					['private', 'privateExtend']]), 
				'myExtendScope'
			)
			.appendField(new Blockly.FieldVariable("myClass", null, ['isClass'], 'isClass'), "myClassExtend");
		
		//Public
		this.appendDummyInput().appendField("public");
		this.appendStatementInput("state1")
			.setCheck(null);
		
		//Protected
		this.appendDummyInput().appendField("protected");
		this.appendStatementInput("state2").setCheck(null).appendField("");
		
		//Private
		this.appendDummyInput().appendField("private");
		this.appendStatementInput("state3").setCheck(null).appendField("");
					
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(classHue);
		this.setTooltip("");
		this.setHelpUrl("");

		this.setMutator(new Blockly.Mutator(['']));

		//Default this to a class
		this.setDataStr("isClass", true);
		
		//The name of the class
		this.getVar_;
		//Name of the extended class
		this.getVarExtend_;

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

	mutationToDom: function(){
	    var container = document.createElement('mutation');
	    return container;
	},

	domToMutation: function(xmlElement){

	},

	decompose: function(workspace){
		var containerBlock = workspace.newBlock('ds_class_inheritance_mutator');
		containerBlock.initSvg();
		
		return containerBlock;
	},

	compose: function(containerBlock){

	},

	onchange: function(){
		//Update the name of the class
		this.getVar_ = this.getField('myClassDec').getText();
		this.getVarExtend_ = this.getField('myClassExtend').getText();
		
		this.getObjVarPublic_ = [];
		this.getObjFuncPublic_ = [];
		this.getObjVarProtected_ = [];
		this.getObjFuncProtected_ = [];
		this.getObjVarPrivate_ = [];
		this.getObjFuncPrivate_ = [];

		//All that is defined inside of their respective Scopes
		let PublicScope = C_Scope;
		let ProtectedScope = C_Scope;
		let PrivateScope = C_Scope;

		var ptr = null;

		//public
		if(this.inputList[2].connection.targetConnection){
			ptr = this.inputList[2].connection.sourceBlock_;

			if(ptr){
				//Aggregate variables and functions declare
				//within the public field
				PublicScope.recursion_log(ptr, true);

				if(PublicScope.getObjVar() != null){
					this.getObjVarPublic_ = PublicScope.getObjVar();
				}
				
				if(PublicScope.getObjFunc() != null){
					this.getObjFuncPublic_ = PublicScope.getObjFunc();
				}
				
	
			}
		}


		//protected
		if(this.inputList[4].connection.targetConnection){
			ptr = this.inputList[4].connection.sourceBlock_;

			if(ptr){
				//Aggregate variables and functions declare
				//within the public field
				ProtectedScope.recursion_log(ptr, true);

				if(ProtectedScope.getObjVar() != null){
					this.getObjVarProtected_ = ProtectedScope.getObjVar();
				}
				
				if(ProtectedScope.getObjFunc() != null){
					this.getObjFuncProtected_ = ProtectedScope.getObjFunc();
				}
	
			}
		}


		//private
		if(this.inputList[6].connection.targetConnection){
			ptr = this.inputList[6].connection.sourceBlock_;

			if(ptr){
				//Aggregate variables and functions declare
				//within the public field
				PrivateScope.recursion_log(ptr, true);

				if(PrivateScope.getObjVar() != null){
					this.getObjVarPrivate_ = PrivateScope.getObjVar();
				}
				
				if(PrivateScope.getObjFunc() != null){
					this.getObjFuncPrivate_ = PrivateScope.getObjFunc();
				}
	
			}
		}
		


		this.allocateVariables();
		this.allocateWarnings();

	},

	allocateVariables: function(){

		var ptr = this.parentBlock_;

		while(ptr != null){
			if(ptr != this && (this.getVarExtend_ == ptr.getVar_)){

				if(ptr.getObjVarPublic_ != null){
					for(var i = 0; i < ptr.getObjVarPublic_.length; ++i){
						this.getObjVarPublic_.push(ptr.getObjVarPublic_[i]);
					}
				}

				if(ptr.getObjFuncProtected_ != null){
					if(ptr.getObjFuncProtected_[i] != null){
						for(var i = 0; i < ptr.getObjFuncPublic_.length; ++i){
							this.getObjFuncPublic_.push(ptr.getObjFuncPublic_[i]);
						}
					}
				}

				if(ptr.getObjVarProtected_ != null){
					for(var i = 0; i < ptr.getObjVarProtected_.length; ++i){
						if(ptr.getObjVarProtected_[i] != null){
							this.getObjVarProtected_.push(ptr.getObjVarProtected_[i])
						}
					}
				}

				if(ptr.getObjFuncProtected_!= null){
					for(var i = 0; i < ptr.getObjFuncProtected_.length; ++i){
						if(ptr.getObjFuncProtected_[i] != null){
							this.getObjFuncProtected_.push(ptr.getObjFuncProtected_[i])
						}
					}
				}

			}
			ptr = ptr.parentBlock_;
		}


		console.log('--- ds_class_inheritance_extend ---');
		console.log('public var - ' + this.getObjVarPublic_);
		console.log('public func - ' + this.getObjFuncPublic_);
		console.log('protected var - ' + this.getObjVarProtected_);
		console.log('protected func - ' + this.getObjFuncProtected_);
		console.log('private var - ' + this.getObjVarPrivate_);
		console.log('private func - ' + this.getObjFuncPrivate_);
	},

	allocateWarnings: function(){
		var TT = '';

		if(this.getVar_ == this.getVarExtend_){
			TT += 'Error, a class cannot inherit from itself!';
		}

		if(TT.length > 0){
			this.setWarningText(TT);
		}
		else {
			this.setWarningText(null);
		}
	}
};

Blockly.C['ds_class_inheritance_extend'] = function(block){
    var code = '';

	var classVarDec = Blockly.C.variableDB_.getName(block.getFieldValue('myClassDec'), Blockly.Variables.NAME_TYPE);
	var classVarExtend = Blockly.C.variableDB_.getName(block.getFieldValue('myClassExtend'), Blockly.Variables.NAME_TYPE);
	
	var classExtendType = block.getField('myExtendScope').getText();
	
	//public
	var statements_state1 = Blockly.C.statementToCode(block, 'state1');
	//protected
	var statements_state2 = Blockly.C.statementToCode(block, 'state2');
	//private
	var statements_state3 = Blockly.C.statementToCode(block, 'state3');

	code += 'class ' + classVarDec + ' : ' + classExtendType + ' ' + classVarExtend + ' {\n';
	code += 'public:\n';
	code += statements_state1;
	code += 'protected:\n';
	code += statements_state2;
	code += 'private:\n';
	code += statements_state3;
	code += '};\n';


    return code;
};





















Blockly.Blocks['ds_class_inheritance_mutator'] = {
    init: function(){

        this.appendDummyInput()
            .appendField('class ' + this.getFieldValue('myClassDec'));

        this.appendStatementInput('state1')
            .setCheck(null);

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
        this.setColour(classHue);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['test_class'] = {
	init: function() {

		this.appendDummyInput()
			.appendField('class ')
			.appendField(new Blockly.FieldVariable("myClass", null, ['isClass'], 'isClass'), "myClassDec");
		this.appendStatementInput("NAME")
			.setCheck(null);
			
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.C['test_class'] = function(block){
	var state1 = Blockly.C.statementToCode(block, 'NAME');
	var variable = this.getField('myClassDec').getText();
	var code = '';

	code += 'class ' + variable + ' {\n';
	code += state1;
	code += '};'

	return code;
};

Blockly.Blocks['class_public'] = {
	init: function() {

		this.appendDummyInput()
			.appendField('public:');

		this.appendStatementInput("NAME")
			.setCheck(null);
			
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setDeletable(false);
		this.setMovable(false);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.C['class_public'] = function(block){
	var state1 = Blockly.C.statementToCode(block, 'NAME');
	var code = '';
	code += 'public:\n';
	code += state1;

	return code;
};

Blockly.Blocks['class_protected'] = {
	init: function() {

		this.appendDummyInput()
			.appendField('protected:');

		this.appendStatementInput("NAME")
			.setCheck(null);
			
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setDeletable(false);
		this.setMovable(false);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.C['class_protected'] = function(block){
	var state1 = Blockly.C.statementToCode(block, 'NAME');
	var code = '';

	code += 'protected:\n';
	code += state1;
	

	return code;
};

Blockly.Blocks['class_private'] = {
	init: function() {
		this.appendDummyInput()
			.appendField('private:');

		this.appendStatementInput("NAME")
			.setCheck(null);
			
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setDeletable(false);
		this.setMovable(false);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.C['class_private'] = function(block){
	var state1 = Blockly.C.statementToCode(block, 'NAME');
	var code = '';

	code += 'private:\n';
	code += state1;

	return code;
};




