'use strict';
// Depending on the URL argument, render as LTR or RTL.
var rtl = (document.location.search == '?rtl');
var block = null;

function start() {
	Blockly.inject(document.getElementById('main'), 
		{
		path: './', 
		toolbox: document.getElementById('toolbox')
		}
	);
	Blockly.addChangeListener(renderContent);
	Blockly.Blocks.CreateMainBlock();
}

function updateLog(){
	alert("Update  - Beta 1.0\n\n\nChapter 1:\n-Added numeric range option (short, long etc) in variable declaration.\n-Added a type check warning for Variable Initialization Block.\n-endl Block can now add other input values,\nChapter 2:\n-Added Exponential Block type to represent exponential numbers.\nChapter 3:\n-Added Switch Block, Switch Case, Default, and Break Blocks to represent switch case statements.\nChapter 6:\n-Reworked arrays, including array index assignments and array initialization. \n\nGeneral: \n-In the process of changing type checking from alerts to block warnings.\n-Added colored labels in the toolbox to designate/name certain blocks.\n-Added the update log.");
}


function downloadCode() {
	var code = Blockly.C.workspaceToCode();
	var codeArray = [];
	codeArray.push(code);
	console.log(code);
	
	
	var codeBlob = new Blob(codeArray, {type: "text/plain;charset=utf-8"});
	saveAs(codeBlob, "main.cpp");
}

function downloadXML() {
	var code = this.variablesToDom(variableList);
	var codeArray = [];
	codeArray.push(code);
	console.log(code);
	
	
	var codeBlob = new Blob(codeArray, {type: "text/plain;charset=utf-8"});
	saveAs(codeBlob, "main.cpp");
}
