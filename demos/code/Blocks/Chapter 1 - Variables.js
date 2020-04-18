
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
			.appendField(new Blockly.FieldDropdown([["int","myVarTypeInt"], ["size_t","myVarTypeSize_t"], ["double","myVarTypeDouble"], ["float","myVarTypeFloat"], ["char","myVarTypeChar"], ["string","myVarTypeString"], ["bool","myVarTypeBool"], ["auto","myVarTypeAuto"], ["short","myVarTypeShort"], ["long", "myVarTypeLong"], ["long long", "myVarTypeLongLong"]]), "myVarType")
			.appendField(new Blockly.FieldVariable("myVar", null, ['isVar'], 'isVar'), "myVarDec")
			//.appendField(new Blockly.FieldVariable('X', null, ['Number', 'String'], 'Number' )
			.setCheck(["Int", "Size_t", "Double", "Float", "Char", "String", "Bool", "Auto", "Variable"]);
			
			this.setInputsInline(false);
			this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(variableHUE);
		this.setTooltip("A standard variable declaration.\n\nConstant - Determines whether the variable is mutable (non constant), or if it cannot be changed after it has been declared (constant).");
		this.setHelpUrl("http://www.cplusplus.com/doc/tutorial/variables/");
		
		//Sets the block type (default)
		this.typeName = (typeConv(this.getField('myVarType').getText()));
		
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
		var value_name = Blockly.C.valueToCode(this, 'NAME', Blockly.C.ORDER_ATOMIC);
		
		//Declare a string that will aggregate all warnings
		var TT = "";
		
		
		if(!value_name && this.con){
			TT += 'Warning, const variable requires an initializer';
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
	
	//If variable type is auto but is uninitialized
	if(dropdown_myvartype === 'auto' && value_name.length < 1){
		code += dropdown_myvartype + ' ' + variable_myvardec + ' = 1';
	}
	//If variable type is auto and is initialized
	else if(dropdown_myvartype === 'auto' && value_name.length > 0){
		code += dropdown_myvartype + ' ' + variable_myvardec + ' = ' + value_name;
	}
	else {
		//if using namespace std; is not active, and type is string
		if(usingSTD === false && dropdown_myvartype === 'string'){
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
			.appendField(new Blockly.FieldDropdown([["int","myVarTypeInt"], ["size_t","myVarTypeSize_t"], ["double","myVarTypeDouble"], ["float","myVarTypeFloat"], ["char","myVarTypeChar"], ["string","myVarTypeString"], ["bool","myVarTypeBool"]]), "myVarType");
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
		
		if(this.parentBlock_ == null){
			this.setWarningText('Block warning, this block has a return and must be connected.');
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
	var error = "//WRONG TYPE ERROR INITIALIZATION\n";
	var errorCheck = false;
	
	//Helper Function for error
	function alert_WrongType(TT){
		block.setWarningText("Wrong type has been selected in variable initialization:\n" + TT + " is not of type " + dropdown_drop1);
	}
	

	if(text_text1.length > 0){
		
		//Check type
		if(dropdown_drop1 == 'Int' || dropdown_drop1 == 'Size_t'){
			
			//If text_text1 is not a number
			if(isNaN(text_text1) == true){
				alert_WrongType(text_text1); 
				text_text1 = 0.0;
				errorCheck = true;
			}
			
			//Since it is Int/Size_t, round the down
			text_text1 = Math.floor(text_text1);
			
			//If type is Size_t, get the absolute value
			if(dropdown_drop1 == 'Size_t'){
				text_text1 = Math.abs(text_text1);
			}
			
		}
		
		//Check type
		if(dropdown_drop1 == 'Double' || dropdown_drop1 == 'Float'){
			if(isNaN(text_text1) == true){
				alert_WrongType(text_text1); 
				text_text1 = 0.0;
				errorCheck = true;
			}
		}
		
		//Check type
		if(dropdown_drop1 == 'Char'){
			if(typeof text_text1 === 'string'){
				text_text1 = "'" + text_text1.substring(0, 1) + "'";
			}
			else {
				alert_WrongType(text_text1); 
				text_text1 = "'a'";
				errorCheck = true;
			}
			
			
		}
		
		//Check type
		if(dropdown_drop1 == 'String'){
			if(typeof text_text1 === 'string'){
				text_text1 = '"' + text_text1 + '"';
			}
			else {
				alert_WrongType(text_text1); 
				text_text1 = "str";
				errorCheck = true;
			}
		}
		
		//Check type
		if(dropdown_drop1 == 'Bool'){
			if(text_text1 == 'true' || text_text1 == 'false'){
				
			}
			else {
				alert_WrongType(text_text1); 
				text_text1 = "true";
				errorCheck = true;
			}
		}
		
		
		
		code += text_text1;
		
		//If data type is Double or Float, and is a whole number
		if( ( dropdown_drop1 == 'Double' || dropdown_drop1 == 'Float') && text_text1 % 1 === 0){
			
			//If user only inputs a 2, it will become a 2.0
			//If a user inputs a 2.0, it will only output a 2.0
			if(text_text1.indexOf(".0") === -1){
				code += ".0";
			}
			
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











