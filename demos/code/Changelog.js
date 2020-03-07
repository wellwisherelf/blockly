'use strict';
// Depending on the URL argument, render as LTR or RTL.
var rtl = (document.location.search == '?rtl');
var block = null;

function start() {
	Blockly.inject(document.getElementById('main'),{
		path: '', 
		toolbox: document.getElementById('toolbox')
		}
	);
	Blockly.addChangeListener(renderContent);
	Blockly.Blocks.CreateMainBlock();
}



function updateLog(){
	
	//version Beta 1 point 0
	var vB1p0 = "\n --- Update  - Beta 1.0 --- \n\nChapter 1:\n-Added numeric range option (short, long etc) in variable declaration.\n-Added a type check warning for Variable Initialization Block.\n-endl Block can now add other input values,\n\nChapter 2:\n-Added Exponential Block type to represent exponential numbers.\n\nChapter 3:\n-Added Switch Block, Switch Case, Default, and Break Blocks to represent switch case statements.\n\nChapter 6:\n-Reworked arrays, including array index assignments and array initialization. \n\nGeneral: \n-In the process of changing type checking from alerts to block warnings.\n-Added colored labels in the toolbox to designate/name certain blocks.\n-Added the update log.\n";
	
	var vB1p1 = "\n --- Update - Beta 1.1 --- \n\nChapter 1:\n-Finished tooltips for chapter 1.\n\nGeneral:\n-Added a code save feature to save the C++ code. \n-Added a save and load feature to save all progress in the blockly program.\n";
	
	var vB1p2 = "\n --- Update - Beta 1.2 --- \n\nChapter 1:\n-Updated the variable block to remove constant and included \"short\", \"long\" and \"long long\" as a part of the data type dropdown list.\n\nChapter 6:\n-Changed \"array index\" blocks and labels to \"array element\".\n-Changed \n-Updated the vector block to remove size streamlined initialization.\n";
	
	var vB1p3 = "\n --- Update - Beta 1.3 --- \n\nChapter 1:\n-Fixed a bug in float/double initialization relating to user inputted decimals.\n\nGeneral:\n-Added examples for every section of every chapter.\n";
	
	alert(vB1p3 + vB1p2 + vB1p1 + vB1p0);
}


function downloadCode() {
	var code = Blockly.C.workspaceToCode();
	var codeArray = [];
	codeArray.push(code);
	console.log(code);
	
	
	var codeBlob = new Blob(codeArray, {type: "text/plain;charset=utf-8"});
	saveAs(codeBlob, "main.cpp");
}


function readFile(input){

	let file = input.files[0];
	
	let reader = new FileReader();
	
	reader.readAsText(file);
	
	reader.onload = function(){
		console.log(reader.result);
		
		Blockly.mainWorkspace.clear();
		
		let saveXML = reader.result;

		let textToDom = Blockly.Xml.textToDom(saveXML);
		Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, textToDom);
		
		
	};
	
	reader.onerror = function() {
		console.log(reader.error);
	};
	
}



function downloadXML() {
	//Grab the workspace XML
	let codeXML = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	
	//Prettify the XML
	let saveXML = Blockly.Xml.domToPrettyText(codeXML);
	
	var codeArray = [];
	codeArray.push(saveXML);
	console.log(saveXML);
	
	//Get current date, used to make sure no save file with overwrite another
	
	var today = new Date();
	
	var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
	
	var codeBlob = new Blob(codeArray, {type: "text/plain;charset=utf-8"});
	saveAs(codeBlob, "blockly save " + time + ".txt");
}










