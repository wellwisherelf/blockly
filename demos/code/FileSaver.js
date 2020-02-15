
function downloadCode() {
  var code = Blockly.C.workspaceToCode();
  var codeArray = [];
  codeArray.push(code);
  console.log(code);
  var codeBlob = new Blob(codeArray, {type: "text/plain;charset=utf-8"});
  saveAs(codeBlob, "main.cpp");
}