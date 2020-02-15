//https://stackoverflow.com/questions/46277625/initialize-a-blockly-mutator-within-javascript
//new array to keep track of all arrays
var arrayTotal = new Array();
function createArray(length){
	
}

//array check by checking variable block. each variable is unique. Attach a type tag to the variable


var arrayHUE = 195;

var vectorHUE = 180;

Blockly.Blocks['array'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(null)
		.appendField(new Blockly.FieldDropdown([["int","myArrTypeInt"], ["size_t","myArrTypeSize_t"], ["double","myArrTypeDouble"], ["float","myArrTypeFloat"], ["char","myArrTypeChar"], ["string","myArrTypeString"], ["bool","myArrTypeBool"]]), "myArrType")
        .appendField(new Blockly.FieldVariable("myArray"), "myArr")
        .appendField("[")
        .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "myArrSize")
        .appendField("]");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array'] = function(block) {
	var dropdown_myarrtype = this.getField('myArrType').getText();
	
	var variable_myarr = Blockly.C.variableDB_.getName(block.getFieldValue('myArr'), Blockly.Variables.NAME_TYPE);
	
	var number_myarrsize = this.getField('myArrSize').getText();
  
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);  
	
  // TODO: Assemble C into code variable.  
	var code = '';
	var std = '';
  
	if(dropdown_myarrtype === "string" && usingSTD === false){
		std += 'std::';
	}
	
	code += std + dropdown_myarrtype + ' ' + variable_myarr + '';
	
	if(number_myarrsize < 1){
		code += '[]';
	}
	if(number_myarrsize > 0) {
		code += '[' + number_myarrsize + ']';
	}
	
	//if(number_myarrsize < 1 && value_valinp1.length < 1){
	//	//this.setWarningText("You cannot declare an array with an unknown size without initialization.");
	//}
	
	if(value_valinp1.length < 1) {
		code += " = { ";
		
		for(var i = 0; i < number_myarrsize; ++i){
			if(dropdown_myarrtype === "int" || dropdown_myarrtype === "size_t" ){
				code += i;
			}
			
			if(dropdown_myarrtype === "double" || dropdown_myarrtype === "float"){
				code += i + '.0';
			}
	
			if(dropdown_myarrtype === "char"){
				code += "'a'";
			}
	
			if(dropdown_myarrtype === "string"){
				code += '"Str' + i + '"';
			}
	
			if(dropdown_myarrtype === "bool"){
				code += 'true';
			}
			
			if(i < number_myarrsize - 1){
				code += ', ';
			}
			
		}
		
		code += ' }';
  	}
	
	if(value_valinp1.length > 0){
		code += ' = { ' + value_valinp1 + ' }';
	}
	
	code += ';\n';
	
	return code;
};

Blockly.Blocks['array_index_1d'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "Variable"])
        .appendField(new Blockly.FieldVariable("myArray"), "myArrRef")
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.setInputsInline(true);
    this.setOutput(true, "Variable");
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array_index_1d'] = function(block) {
	var variable_myarrref = Blockly.C.variableDB_.getName(block.getFieldValue('myArrRef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	code += variable_myarrref + '[' + value_valinp1 + ']';
	
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};








Blockly.Blocks['array2d'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
			.appendField(new Blockly.FieldDropdown([["int","myArrTypeInt"], ["size_t","myArrTypeSize_t"], ["double","myArrTypeDouble"], ["float","myArrTypeFloat"], ["char","myArrTypeChar"], ["string","myArrTypeString"], ["bool","myArrTypeBool"]]), "myArrType")
        .appendField(new Blockly.FieldVariable("myArray2D"), "myArr")
        .appendField("[")
        .appendField(new Blockly.FieldNumber(0, 1), "myVarY")
        .appendField("] [")
        .appendField(new Blockly.FieldNumber(0, 1), "myVarX")
        .appendField("]");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array2d'] = function(block) {
	var dropdown_myarrtype = block.getFieldValue('myArrType');
	var variable_myarr = Blockly.C.variableDB_.getName(block.getFieldValue('myArr'), Blockly.Variables.NAME_TYPE);
	var number_myvary = block.getFieldValue('myVarY');
	var number_myvarx = block.getFieldValue('myVarX');
	var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
	
	// TODO: Assemble C into code variable.
	
	
	var std = '';
	
	if(this.getField('myArrType').getText() === "string" && usingSTD === false){
		std += 'std::';
	}
  
	
	var code = std + this.getField('myArrType').getText() + " " + this.getField('myArr').getText() + "[" + this.getField('myVarY').getText() + "][" + this.getField('myVarX').getText() + "] = { \n";
	
	var jsMyArray = new Array();
  
	var total = 0;
	for(var i = 0; i < this.getField('myVarY').getText(); i++){
		code += "  {";
		for(var j = 0; j < this.getField('myVarX').getText(); j++){
			
			if(this.getField('myArrType').getText() == "int"){
				jsMyArray[i] = i;
				code += total;
			} 
			else if(this.getField('myArrType').getText() == "double"){
				jsMyArray[i] = i;
				code += total + ".0";
			}
			else if(this.getField('myArrType').getText() == "char"){
				jsMyArray[i] = "'a'";
				code += jsMyArray[i];
			}
			else if(this.getField('myArrType').getText() == "string"){
				jsMyArray[i] = "\"" + "Str" + total + "\"";
				code += jsMyArray[i];
			}
			
			total++;
			
			if(j < this.getField('myVarX').getText() - 1){
			
				code += ", ";
			
			}
		
		}
		
		if(i < this.getField('myVarY').getText() - 1){
		
			code += "},\n";
		
		}
	}
  
	code += "}\n};\n"
  
	return code;
};

Blockly.Blocks['array_index_2d'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "Variable"])
        .appendField(new Blockly.FieldVariable("myArray2D"), "myArrRef")
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.appendValueInput("valinp2")
        .setCheck(["Number", "Variable"])
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.setInputsInline(true);
    this.setOutput(true, "Variable");
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array_index_2d'] = function(block) {
	var variable_myarrref = Blockly.C.variableDB_.getName(block.getFieldValue('myArrRef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var value_valinp2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	code += variable_myarrref + '[' + value_valinp1 + '][' + value_valinp2 + ']';
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};










Blockly.Blocks['vector'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("vector<")
			.appendField(new Blockly.FieldDropdown([["int","myVecTypeInt"], ["size_t","myVecTypeSize_t"], ["double","myVecTypeDouble"], ["float","myVecTypeFloat"], ["char","myVecTypeChar"], ["string","myVecTypeString"], ["bool","myVecTypeBool"]]), "myVecType")
			.appendField(">")
			.appendField(new Blockly.FieldVariable("myVec"), "myVecDef");
		this.appendValueInput("valinp1")
			.setCheck(["Int", "Size_t"])
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("size:");
		this.appendValueInput("valinp2")
			.setCheck("VecInit")
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("Initialization:");
		this.setInputsInline(false);
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
	var value_valinp2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	
	// Set input string to a number, round it up, then grab the absolute value.
	var temp = Math.abs( Math.floor (Number(value_valinp1) ) );	
	var code = '';
	
	var std = 'std::';
	
	if(usingSTD === true){
		code += 'vector<' + dropdown_myvectype + '> ' + variable_myvecdef + '';
	}
	// if using namespace std; is not active
	if(usingSTD === false){
		code += std + 'vector<';
		
		//if data type requires std::
		if(dropdown_myvectype === 'string'){
			code += std;
		}
		
		code += dropdown_myvectype + '> ' + variable_myvecdef + '';
		
	}
	
	if(value_valinp1.length > 0){
		code += '(' + temp + ')';
	}
	
	if(value_valinp2.length > 0 && value_valinp1.length < 1){
		code += ' = {' + value_valinp2 + '}';
	}
	
	
	if(value_valinp2.length > 0 && value_valinp1.length > 0){
		
		code += ';\n' + variable_myvecdef + ' = {' + value_valinp2 + '}';
		
	}
	
	code += ';\n';	
	
	return code;
};


Blockly.Blocks['vec_init'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck("VecInit")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("vector init:")
        .appendField(new Blockly.FieldTextInput("0"), "inp");
    this.setOutput(true, "VecInit");
    this.setColour(vectorHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['vec_init'] = function(block) {
	var text_inp = block.getFieldValue('inp');
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	if(text_inp.length > 0){
		code += text_inp;
		if(value_valinp1.length > 0){
			code += ', ' + value_valinp1;
		}
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
  return code;
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



Blockly.Blocks['array_index_1d_init'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "Variable"])
        .appendField(new Blockly.FieldVariable("myArray"), "myArrRef")
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.appendValueInput("valinp2")
        .appendField(" = ")
        .setCheck();
    this.setInputsInline(true);
    this.setOutput(true, "Variable");
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array_index_1d_init'] = function(block) {
	var variable_myarrref = Blockly.C.variableDB_.getName(block.getFieldValue('myArrRef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var value_valinp2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	
	if(value_valinp2.length < 1){
		value_valinp2 = '0';
	}
	
	
	code += variable_myarrref + '[' + value_valinp1 + '] = ' + value_valinp2;
	
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};








Blockly.Blocks['array_index_2d_init'] = {
  init: function() {
    this.appendValueInput("valinp1")
        .setCheck(["Number", "Variable"])
        .appendField(new Blockly.FieldVariable("myArray2D"), "myArrRef")
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.appendValueInput("valinp2")
        .setCheck(["Number", "Variable"])
        .appendField("[");
    this.appendDummyInput()
        .appendField("]");
    this.setInputsInline(true);
    this.appendValueInput("valinp3")
        .appendField(" = ")
        .setCheck();
    this.setOutput(true, "Variable");
    this.setColour(arrayHUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['array_index_2d_init'] = function(block) {
	var variable_myarrref = Blockly.C.variableDB_.getName(block.getFieldValue('myArrRef'), Blockly.Variables.NAME_TYPE);
	var value_valinp1 = Blockly.C.valueToCode(block, 'valinp1', Blockly.C.ORDER_ATOMIC);
	var value_valinp2 = Blockly.C.valueToCode(block, 'valinp2', Blockly.C.ORDER_ATOMIC);
	var value_valinp3 = Blockly.C.valueToCode(block, 'valinp3', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	
	if(value_valinp3.length < 1){
		value_valinp3 = '0';
	}
	
	code += variable_myarrref + '[' + value_valinp1 + '][' + value_valinp2 + '] = ' + value_valinp3;
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};



//Initialize the variable. Can be of any time. The code is a string literal.
Blockly.Blocks['array_init_literal'] = {
	init: function() {
		
		this.appendValueInput("valinp1")
        .setCheck("FuncParam")
		.appendField("type: ")
		.appendField(new Blockly.FieldDropdown([["int","myVarTypeInt"], ["size_t","myVarTypeSize_t"], ["double","myVarTypeDouble"], ["float","myVarTypeFloat"], ["char","myVarTypeChar"], ["string","myVarTypeString"], ["bool","myVarTypeBool"]]), "myVarType")
		.appendField("input:")
		.appendField(new Blockly.FieldTextInput(""), "text1");
			
			
		this.setOutput(true, "FuncParam");
		
		this.setInputsInline(false);
		this.setColour(arrayHUE);
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

Blockly.C['array_init_literal'] = function(block) {
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


Blockly.Blocks['array2d_init'] = {
	init: function() {
	this.appendDummyInput()
		.appendField("initialization");
	this.appendValueInput("valinp0")
		.setCheck(null)
		.appendField("init:");
	this.setOutput(true, null);
	this.setColour(230);
	this.setTooltip("");
	this.setHelpUrl("");
	this.tag = 0;
	},
	
	onchange:function(){
		var value_valinp = Blockly.C.valueToCode(block, 'valinp0', Blockly.C.ORDER_ATOMIC);
		var myValInp = 'valinp' + this.tag;
		
		if(myValInp.length > 0){
			this.tag += 1;
			
			myValInp = 'valinp' + this.tag;
			
			this.appendValueInput(myValInp)
				.setCheck(null)
				.appendField("initialization");
				
		}
	}
	
};

Blockly.C['array2d_init'] = function(block) {
	var value_valinp0 = Blockly.C.valueToCode(block, 'valinp0', Blockly.C.ORDER_ATOMIC);
	// TODO: Assemble C into code variable.
	var code = '';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.C.ORDER_NONE];
};

















