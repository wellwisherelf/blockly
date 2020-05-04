
var variableHUE = 330;

//type check conversion, 
function typeConv(type){
	//Replaces the first letter to capitalize, used for fielddropdown types
	return type.charAt(0).toUpperCase() + type.slice(1);
}


/* The block defined for a variable declaration
 * in its mutator. If selected in the mutator,
 * the variable declaration will become
 * const, and must be initialized.
 * TODO: if true, default initialization
 */
Blockly.Blocks['var_const'] = {
	init: function() {
		this.appendDummyInput()
			  .appendField("const?")
			  .appendField(new Blockly.FieldCheckbox("FALSE"), "check1");
		this.setColour(variableHUE);
		this.setTooltip(Blockly.Msg['var_const_TT']);
		this.setHelpUrl(Blockly.Msg['var_const_URL']);
		
	},
	
	onchange: function(){
		
	}
	
};


Blockly.Blocks['variable_declare'] = {
	init: function() {
		
		this.appendValueInput("NAME")
			.appendField("Declare: ")
			.appendField(new Blockly.FieldDropdown([["int","myVarTypeInt"], ["size_t","myVarTypeSize_t"], ["float","myVarTypeFloat"], ["char","myVarTypeChar"], ["string","myVarTypeString"], ["bool","myVarTypeBool"], ["auto","myVarTypeAuto"], ["short","myVarTypeShort"], ["long", "myVarTypeLong"], ["long long", "myVarTypeLongLong"]]), "myVarType")
			.appendField(new Blockly.FieldVariable("myVar", null, ['isVar'], 'isVar'), "myVarDec")
			.setCheck(["Int", "Size_t", "Double", "Float", "Char", "String", "Bool", "Auto", "Variable"]);
			
			this.setInputsInline(false);
			this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(variableHUE);
		this.setTooltip("A standard variable declaration.\n\nConstant - Determines whether the variable is mutable (non constant), or if it cannot be changed after it has been declared (constant).");
		this.setHelpUrl("http://www.cplusplus.com/doc/tutorial/variables/");
		
		//Sets the block type (default)
		this.typeName = (typeConv(this.getField('myVarType').getText()));
		this.getVar_ = this.getField('myVarDec').getText();
		
		this.con = false;
		
		//Activates the mutation box
		this.setMutator(new Blockly.Mutator(['']));
		this.setDataStr("isVar", true);
		
	},
	
	//Save Mutation Data
	mutationToDom: function(){
		var container = document.createElement('mutation');
		var hasConst = (this.getFieldValue('check1') == 'TRUE');
		container.setAttribute('isConst', hasConst);

		return container;
	},

	//block is being restored from XML
	domToMutation: function(xmlElement){
		var test = (xmlElement.getAttribute('isConst') == 'TRUE');
	},

	//mutator box opens
	decompose: function(workspace){
		var containerBlock = workspace.newBlock('var_const');
		containerBlock.initSvg();
		
		if(this.con == true){
			containerBlock.setFieldValue('TRUE','check1');
		}
		else {
			containerBlock.setFieldValue('FALSE', 'check1');
		}

		return containerBlock;
	},

	//mutator box closes
	compose: function(containerBlock){
		
        if(containerBlock.getFieldValue('check1') == 'TRUE'){
        	this.con = true;
        }
        else {
        	this.con = false;
        }
		
	},

	onchange: function(){

		//Value Input
		var value_name = Blockly.C.valueToCode(this, 'NAME', Blockly.C.ORDER_ATOMIC);
		
		this.getVar_ = this.getField('myVarDec').getText();
		
		//Data types
		var dropdown_myvartype = this.getField('myVarType').getText();
		
		dropdown_myvartype = typeConv(dropdown_myvartype);

		//Declare a string that will aggregate all warnings and errors
		var TT = "";
		
		
		if(!value_name && this.con){
			TT += 'Error, const variable requires an initializer.\n';
		}
		
		if(dropdown_myvartype == 'Auto' && value_name.length < 1){
			if(TT.length > 0){
				TT += '\n';
			}

			TT += 'Error, auto variable requires an initializer.\n';

		}
		
		//this.childBlocks_[0] refers to the next connected block to the right
		//If there is a connected block, and that connected block is the initialization block
		if(this.childBlocks_[0] && (this.childBlocks_[0].type == 'var_initialization')){
			
			//If the type is not auto, and the var declaration type is not the same as var initialization type
			if(dropdown_myvartype != 'Auto' && dropdown_myvartype != this.childBlocks_[0].typeName){


				TT += 'Error, var declaration is "' + dropdown_myvartype + '", var initialization is "' + this.childBlocks_[0].typeName + '".\n';

			}
			
		}

		if(TT.length > 0){
			this.setWarningText(TT);
		}
		else {
			this.setWarningText(null);
		}
		
	}



	
};

Blockly.C['variable_declare'] = function(block) {
	var dropdown_myvartype = this.getField('myVarType').getText();
	
	var variable_myvardec = Blockly.C.variableDB_.getName(block.getFieldValue('myVarDec'), Blockly.Variables.NAME_TYPE);
	
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	
	var code = '';

	
	if(this.con){
		code += 'const ';
	}

	//Numeric Types
	
	//if using namespace std; is not active, and type is string
	if(C_Logic.namespace.using_namespace_std === false && dropdown_myvartype === 'string'){
		code += 'std::' + dropdown_myvartype + ' ' + variable_myvardec;
	}
	else {
		// using namespace std; is active 
		code += dropdown_myvartype + ' ' + variable_myvardec;
	}
	// if initialized, initialize
	if(value_name.length > 0){
		code += ' = ' + value_name;
	}
	
	
	
	code += ';\n'
	
	//Update typeName
	this.typeName = (typeConv(this.getField('myVarType').getText()));
	return code;
};

//Initialize the variable. Can be of any time. The code is a string literal.
Blockly.Blocks['var_initialization'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("type: ")
			.appendField(new Blockly.FieldDropdown([["int","myVarTypeInt"], ["size_t","myVarTypeSize_t"], ["double","myVarTypeDouble"], ["char","myVarTypeChar"], ["string","myVarTypeString"], ["bool","myVarTypeBool"], ["short","myVarTypeShort"], ["long", "myVarTypeLong"], ["long long", "myVarTypeLongLong"]]), "myVarType")
		this.appendDummyInput()
			.appendField("input:")
			.appendField(new Blockly.FieldTextInput(""), "text1");
		this.setOutput(true, null);
		
		this.setInputsInline(true);
		this.setColour(variableHUE);
		this.setTooltip("Variable initialization. Can be used to define variables, or used elsewhere where the required type input is needed e.g. switch statements.");
		this.setHelpUrl("");
		
		//Set the type of the block (default)
		this.typeName = typeConv(this.getField('myVarType').getText());
	},
	
	onchange: function(){
		//Set the output type of the block
		this.setOutput(this.typeName);
		
		var inp = this.getFieldValue('text1');

		//Tooltip for warnings
		var TT = '';


		
		if(isNaN(inp) == true && inp.length > 0 && (this.typeName == 'Int' || this.typeName == 'Size_t' || this.typeName == 'Short' || this.typeName == 'Long' || this.typeName == 'Long long')){
			TT += 'Error, "' + inp + '" is not a number.\n';
		}
		else {
			var x = +inp;

			if(this.typeName == 'Int' || this.typeName == 'Size_t'){
				if(inp.indexOf('.') > -1){
					TT += 'Error, "' + this.typeName + '" cannot have decimal places.\n';
				}
	
			}
			if(this.typeName == 'Size_t'){
				if(inp.indexOf('-') > -1){
					TT += 'Error, "' + this.typeName + '" is unsigned and cannot be negative.\n';
				}
			}
			
			if(this.typeName == 'Double'){
				
			}

			if(this.typeName == 'Short'){
				if(x > 32767){
					TT += 'Warning, "' + inp + '" is above the range of "' + this.typeName + '" (32767). An overflow will result.\n';
				}
				if(x < -32768){
					TT += 'Warning, "' + inp + '" is below the range of "' + this.typeName + '" (-32768).  An underflow will result.\n';
				}
			}

			if(this.typeName == 'Long'){
				if(x > 4294967295){
					TT += 'Warning, "' + inp + '" is above the range of "' + this.typeName + '" (4294967295 or 2^32). An overflow will result.\n';
				}
				if(x < -4294967296){
					TT += 'Warning, "' + inp + '" is below the range of "' + this.typeName + '" (-4294967296 or -2^32 - 1).  An underflow will result.\n';
				}
			}

			if(this.typeName == 'Long long'){
				if(inp.length >= 20){
					TT += 'Warning, "' + inp + '" is approximately out of the range of "' + this.typeName + '" (2^64).\n';
				}
			}
		}
		
		//Non number types
		switch(this.typeName){
			case 'Char':
				if(inp.length > 1 && !inp.includes('\\')){
					TT += 'Warning, type "' + this.typeName + '" cannot have more than one character.\n';
				}
				else if(inp.includes('\\') && inp.length === 1){
					TT += 'Error, "\\" cannot be used alone in a char, try "\\\\".';
				}
				else if(inp.length === 0){
					TT += 'Error, type "' + this.typeName + '" must require at least one character in initialization.\n';
				}

			break;

			case 'String':
				// temp var to see if \" exists instead of just "
				var proper_quote = true;


				if(inp.includes('"') && !inp.includes('\\')){
					proper_quote = false;
				}
				
				if(!inp.includes('"') && inp.includes('\\')){
					TT += 'Warning, a backslash cannot be used typically in a string.\n'
				}

				//TODO \" is regulated, but "\ isn't
				for(var i = 0; i < inp.length; ++i){
					//If a backslash precedes a quote
					if(inp.charAt(i) != '\\' && inp.charAt(i + 1) == '"'){
						proper_quote = false;

						//If there exists at least one instance of an inproper quote,
						//there is no reason to keep checking
						break;
					}

				}

				if(!proper_quote){
					TT += 'Error, a string literal cannot have a quote.\n';
				}


				//String protects: \"
			break;

			case 'Bool':
				if(inp != 'true' && inp != 'false' && inp != '0' && inp != '1'){
					TT += 'Error, "' + inp + '" is not of type ' + this.typeName + '.\n';
				}
			break;
		}


		if(this.parentBlock_ == null){
			TT += 'Block warning, this block has a return and must be connected.\n';
		}

		if(TT.length > 0){
			this.setWarningText(TT);
		}
		else {
			this.setWarningText(null);
		}
		
	}
};

Blockly.C['var_initialization'] = function(block) {
	var dropdown_drop1 = typeConv(this.getField('myVarType').getText());
	var text_text1 = block.getFieldValue('text1');
	// TODO: Assemble C into code variable.
	var code = '';

	if(text_text1.length > 0){
		
		if(dropdown_drop1 == 'Char'){
			code += "'" + text_text1 + "'";
		}
		else if(dropdown_drop1 == 'String'){
			code += '"' + text_text1 + '"';
		}
		else {
			code += text_text1;
		}

	}

	//Update the type
	this.typeName = typeConv(this.getField('myVarType').getText());

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};


Blockly.Blocks['var_change'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "String", "Variable"])
        .appendField("Increment ")
        .appendField(new Blockly.FieldVariable("myVar", null, ['isVar', 'isVarPtr'], 'isVar'), "myVarDef")
		.appendField("by");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(variableHUE);
 this.setTooltip("Increment the variable.");
 this.setHelpUrl("");
  }
};

Blockly.C['var_change'] = function(block) {
	var variable_myvardef = Blockly.C.variableDB_.getName(block.getFieldValue('myVarDef'), Blockly.Variables.NAME_TYPE);
	var value_name = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	//Increments variable  my value_name
	code += variable_myvardef + " = " + variable_myvardef + " + " + value_name + ';\n';
	
	
	return code;
};

Blockly.Blocks['var_reinit'] = {
	init: function() {
	this.appendValueInput("valinp1")
		.setCheck()
		.appendField("Set ")
		.appendField(new Blockly.FieldVariable("myVar", null, ['isVar','isPtr'], 'isPtr'), "myVarDef")
		.appendField("to");
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(variableHUE);
	this.setTooltip("Sets the variable.");
	this.setHelpUrl("");
	
	
	},
	
	onchange: function(){
		
	},

	allocateOptions: function(){
		
	}
};

Blockly.C['var_reinit'] = function(block) {
	var variable_myvardef = Blockly.C.variableDB_.getName(block.getFieldValue('myVarDef'), Blockly.Variables.NAME_TYPE);
	var value_name = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	//output myVar and initialization.
	code += variable_myvardef + " = " + value_name + ';\n';
	
	return code;
};











