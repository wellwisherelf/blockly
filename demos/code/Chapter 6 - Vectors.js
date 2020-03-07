

var vectorHUE = 180;


Blockly.Blocks['vector'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck("VecInit")
        .appendField("vector<")
			.appendField(new Blockly.FieldDropdown([["int","myVecTypeInt"], ["size_t","myVecTypeSize_t"], ["double","myVecTypeDouble"], ["float","myVecTypeFloat"], ["char","myVecTypeChar"], ["string","myVecTypeString"], ["bool","myVecTypeBool"]]), "myVecType")
        .appendField(">")
        .appendField(new Blockly.FieldVariable("myVec"), "myVecDef");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(vectorHUE);
 this.setTooltip("A vector is like an array; it can store and access data. Unlike an array, its size can change.");
 this.setHelpUrl("http://www.cplusplus.com/reference/vector/vector/");
  }
};


Blockly.C['vector'] = function(block) {
	var dropdown_myvectype = this.getField('myVecType').getText();
	var variable_myvecdef = Blockly.C.variableDB_.getName(block.getFieldValue('myVecDef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	var std = 'std::';
	
	if(usingSTD === true){
		code += 'vector<';
	}
	else {
		code += std + 'vector<';
		
		//if data type requires std::
		if(dropdown_myvectype === 'string'){
			code += std;
		}
	}
	
	code += dropdown_myvectype + '> ' + variable_myvecdef;
	
	if(value_valinp1.length > 0){
		code += ' = {' + value_valinp1 + '}';
	}
	
	code += ';\n';	
	
	return code;
};


Blockly.Blocks['vec_init'] = {
	init: function() {
		
		this.appendValueInput("valinp1")
        .setCheck("VecInit")
		.appendField("type: ")
		.appendField(new Blockly.FieldDropdown([["int","myVarTypeInt"], ["size_t","myVarTypeSize_t"], ["double","myVarTypeDouble"], ["float","myVarTypeFloat"], ["char","myVarTypeChar"], ["string","myVarTypeString"], ["bool","myVarTypeBool"]]), "myVarType")
		.appendField("input:")
		.appendField(new Blockly.FieldTextInput(""), "text1");
			
			
		this.setOutput(true, "VecInit");
		
		this.setInputsInline(false);
		this.setColour(vectorHUE);
		this.setTooltip("");
		this.setHelpUrl("");
		
		//this.id = "var_initialization";
		
		//Sets the type that can be exported to other blocks
		this.tag = '1';
	},
	
	onchange: function(){
		
		//this.setOutput(true, typeConv(this.getField('myVarType').getText()) );
		
		dropdown_drop1 = typeConv(this.getField('myVarType').getText());
		
		
	}
};

Blockly.C['vec_init'] = function(block) {
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var dropdown_drop1 = typeConv(this.getField('myVarType').getText());
	var text_text1 = block.getFieldValue('text1');
	// TODO: Assemble C into code variable.
	var code = '';
	var error = "//WRONG TYPE ERROR INITIALIZATION\n";
	var errorCheck = false;
	
	//Helper Function for error
	function alert_WrongType(){
		//block.setWarningText("Wrong type has been selected in function parameter.");
	}
	
	
	if(text_text1.length > 0){
		
		//Check type
		if(dropdown_drop1 == 'Int' || dropdown_drop1 == 'Size_t'){
			
			//If text_text1 is not a number
			if(isNaN(text_text1) == true){
				text_text1 = 0;
				alert_WrongType(); 
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
				text_text1 = 0.0;
				alert_WrongType();
				errorCheck = true;
			}
		}
		
		//Check type
		if(dropdown_drop1 == 'Char'){
			if(typeof text_text1 === 'string'){
				text_text1 = "'" + text_text1.substring(0, 1) + "'";
			}
			else {
				text_text1 = "'a'";
				alert_WrongType();
				errorCheck = true;
			}
			
			
		}
		
		//Check type
		if(dropdown_drop1 == 'String'){
			if(typeof text_text1 === 'string'){
				text_text1 = '"' + text_text1 + '"';
			}
			else {
				text_text1 = "str";
				alert_WrongType(); 
				errorCheck = true;
			}
		}
		
		//Check type
		if(dropdown_drop1 == 'Bool'){
			if(text_text1 == 'true' || text_text1 == 'false'){
				
			}
			else {
				text_text1 = "true";
				alert_WrongType(); 
				errorCheck = true;
			}
		}
		
		
		
		code += text_text1;
		
		if( ( dropdown_drop1 == 'Double' || dropdown_drop1 == 'Float') && text_text1 % 1 === 0){
			code += ".0";
		}
	}
	
	if(value_valinp1.length > 0){
		code += ', ' + value_valinp1;
	}
		
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

// Vector Size
Blockly.Blocks['vectorsize'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("myVec"), "NAME")
        .appendField(".size()");
    this.setOutput(true, "Number");
    this.setColour(vectorHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.C['vectorsize'] = function(block) {
	var variable_name = Blockly.C.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble C into code variable.
	var code = this.getField('NAME').getText() + '.size()';
	return [code, Blockly.C.ORDER_ATOMIC];
};



// Vector Empty
Blockly.Blocks['vectorempty'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("myVec"), "NAME")
        .appendField(".empty()");
    this.setOutput(true, "Boolean");
    this.setColour(vectorHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.C['vectorempty'] = function(block) {
	var variable_name = Blockly.C.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble C into code variable.
	var code = this.getField('NAME').getText() + '.empty()';
	return [code, Blockly.C.ORDER_ATOMIC];
};

// Vector At Position

Blockly.Blocks['vectoratposition'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(["Int", "Number"])
        .appendField(new Blockly.FieldVariable("myVec"), "myVecVar")
        .appendField(".at(");
    this.appendDummyInput()
        .appendField(")");
    this.setOutput(true, null);
    this.setColour(vectorHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['vectoratposition'] = function(block) {
	var text_inp = this.getField('myVecVar').getText();
	var text_ind = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	
	var code = '';
	
	var temp = Math.abs(Math.floor(text_ind));
	
	code += text_inp + '.at(' + temp + ')';
	
	return [code, Blockly.C.ORDER_ATOMIC];
};

Blockly.Blocks['vectorpushback'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField(new Blockly.FieldVariable("myVec"), "myVecVar")
        .appendField(".push_back");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(vectorHUE);
 this.setTooltip("Add");
 this.setHelpUrl("");
  }
};

Blockly.C['vectorpushback'] = function(block) {
	var variable_myvecvar = Blockly.C.variableDB_.getName(block.getFieldValue('myVecVar'), Blockly.Variables.NAME_TYPE);
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	code += variable_myvecvar + '.push_back(' + value_name + ');\n';
	
	return code;
};

Blockly.Blocks['vector_resize'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "Int"])
        .appendField(new Blockly.FieldVariable("myVec"), "myVecDef")
        .appendField(".resize(");
    this.appendDummyInput()
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(vectorHUE);
 this.setTooltip("Resizes the size of a vector.");
 this.setHelpUrl("");
  }
};

Blockly.C['vector_resize'] = function(block) {
	var variable_myvecdef = Blockly.C.variableDB_.getName(block.getFieldValue('myVecDef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	var temp = Math.abs(Math.floor(value_valinp1));
	
	code += variable_myvecdef + '.resize(' + temp + ');\n';
	
	return code;
};

