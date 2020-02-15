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
  
  return [code,Blockly.C.ORDER_ATOMIC];
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


