Blockly.Blocks['variable_declare_ptr'] = {
	init: function() {
		
		this.appendValueInput("NAME")
			.appendField("Declare: ")
			.appendField(new Blockly.FieldDropdown([["int","myVarTypeInt"], ["size_t","myVarTypeSize_t"], ["double","myVarTypeDouble"], ["float","myVarTypeFloat"], ["char","myVarTypeChar"], ["string","myVarTypeString"], ["bool","myVarTypeBool"], ["short","myVarTypeShort"], ["long", "myVarTypeLong"], ["long long", "myVarTypeLongLong"]]), "myVarType")
			.appendField(new Blockly.FieldDropdown([["","myPtrNone"], ["*","myPtrAdd1"], ["&","myPtrAdd"], ["*&","myPtrAddPtr"], ["**","myPtrAdd2"], ["***","myPtrAdd3"]]), "myPtr")
			.appendField(new Blockly.FieldVariable("myVar", null, ['myVar', 'myPtr'], 'myVar'), "myVarDec")
			.setCheck(["Int", "Size_t", "Double", "Float", "Char", "String", "Bool", "Auto", "Variable", "Null"]);
			
			this.setInputsInline(false);
			this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(0);
		this.setTooltip("");
		this.setHelpUrl("");
		
		//Sets the block type (default)
		this.typeName = (typeConv(this.getField('myVarType').getText()));
		
		
		//Activates the mutation box
		this.setDataStr("isVar", true);
		
  }
};

Blockly.C['variable_declare_ptr'] = function(block) {
	var dropdown_myvartype = this.getField('myVarType').getText();
	var dropdown_myptr = this.getField('myPtr').getText();
	
	var variable_myvardec = Blockly.C.variableDB_.getName(block.getFieldValue('myVarDec'), Blockly.Variables.NAME_TYPE);
	
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	
	var code = '';


	//Numeric Types
	
	//if using namespace std; is not active, and type is string
	if(usingSTD === false && dropdown_myvartype === 'string'){
		code += 'std::' + dropdown_myvartype + dropdown_myptr + ' ' + variable_myvardec;
	}
	else {
		// using namespace std; is active 
		code += dropdown_myvartype + dropdown_myptr + ' ' + variable_myvardec;
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

Blockly.Blocks['variable_declare_ptr_class'] = {
	init: function() {
		
		this.appendValueInput("valinp1")
			.appendField("Declare: ")
			.appendField(new Blockly.FieldVariable("myStruct", null, ['isStruct', 'isClass'], 'isStruct'), "myClassDec")
			.appendField(new Blockly.FieldDropdown([["*","myPtrAdd1"], ["&","myPtrAdd"], ["*&","myPtrAddPtr"], ["**","myPtrAdd2"], ["***","myPtrAdd3"]]), "myPtr")
			.appendField(new Blockly.FieldVariable("next", null, ['isPtr'], 'isPtr'), "myNextDec")
			.setCheck(null);
			
			this.setInputsInline(false);
			this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(0);
		this.setTooltip("");
		this.setHelpUrl("");
		
		//Sets the block type (default)
		this.typeName = (typeConv(this.getField('myClassDec').getText()));
		
		
		this.setDataStr("isVar", true);
		
  }
};

Blockly.C['variable_declare_ptr_class'] = function(block) {
	var dropdown_myptr = this.getField('myPtr').getText();
	
	var variable_myclassdec = Blockly.C.variableDB_.getName(block.getFieldValue('myClassDec'), Blockly.Variables.NAME_TYPE);
	var variable_mynextdec = Blockly.C.variableDB_.getName(block.getFieldValue('myNextDec'), Blockly.Variables.NAME_TYPE);
	
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	
	var code = '';


	// using namespace std; is active 
	code += variable_myclassdec + dropdown_myptr + ' ' + variable_mynextdec;

	// if initialized, initialize
	if(value_name.length > 0){
		code += ' = ' + value_name;
	}
	
	
	
	code += ';\n'
	
	//Update typeName
	this.typeName = (typeConv(this.getField('myClassDec').getText()));
	return code;
};

Blockly.Blocks['get_var_ptr'] = {
	init: function() {
	this.appendDummyInput()
		.appendField(new Blockly.FieldDropdown([["*","myPtrAdd1"], ["&","myPtrAdd"], ["*&","myPtrAddPtr"], ["**","myPtrAdd2"], ["***","myPtrAdd3"]]), "myPtr")
		.appendField(new Blockly.FieldVariable("myPtr", null, ['myPtr'], 'myPtr'), "VAR");
	this.setOutput(true, null);
	this.setColour(0);
	this.setTooltip("");
	this.setHelpUrl("");
	}
};
  
Blockly.C['get_var_ptr'] = function(block) {
	var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
	var dropdown_myptr = this.getField('myPtr').getText();

	var code = '';
	code += dropdown_myptr + variable_var;
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};


Blockly.Blocks['pointer_null'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("NULL");
    this.setOutput(true, "Null");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['pointer_null'] = function(block) {
  // TODO: Assemble C into code variable.
  var code = 'NULL';
  
  return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['pointer_nullptr'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("nullptr");
    this.setOutput(true, "Null");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['pointer_nullptr'] = function(block) {
  // TODO: Assemble C into code variable.
  var code = 'nullptr';
  
  return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['pointer_ref'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["&","myPoiRef"], ["*","myPoiDeref"]]), "myPoi");
    this.setOutput(true, "Pointer");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['pointer_ref'] = function(block) {
	var dropdown_mypoi = this.getField('myPoi').getText();
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	code += dropdown_mypoi;
	
	if(value_valinp1.length > 0){
		code += ' ' + value_valinp1;
	}
	
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};


