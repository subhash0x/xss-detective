// ==UserScript==
// @name XSS Detective Test Vectors
// @author John Garland
// @version 0.1
// @namespace http://userscripts.org/scripts/show/52430
// @description Tests for XSS Detective.
// ==/UserScript==

var xssTestVectors = [
   {
      name : "Simple DOM Test",
      description : "Tries to add a div to the body and checks if it's there",
      vector : "<script>document.body.appendChild(document.createElement('div').setAttribute('id', 'XD_dom_test'))</script>",
      check : function (dom) { return dom.getElementById('XD_dom_test') === null; }
   },
   {
      name : "Less Simple DOM Test",
      description : "Tries to add a div to the body and checks if it's there, uses fromCharCode to bypass escaped quotes",
      vector : "<script> var node = document.createElement(String.fromCharCode(100, 105, 118)); node.setAttribute(String.fromCharCode(105, 100), String.fromCharCode(88, 68, 95, 100, 111, 109, 95, 116, 101, 115, 116, 95, 99, 104, 97, 114, 95, 99, 111, 100, 101)); document.body.appendChild(node)</script>",
      check : function (dom) { return dom.getElementById('XD_dom_test_char_code') === null; }
   },
   {
      vector : "'';!--\"<XSS>=&{()}",
      name : "XSS Quick Test",
      description: "If you don't have much space, this string is a nice compact XSS injection check. View source after injecting it and look for <XSS versus &lt;XSS to see if it is vulnerable.",
      check : function (dom) { return dom.body.innerHTML.indexOf('<XSS') == -1; }
   },
];

if (typeof(unsafeWindow) !== 'undefined') {
    unsafeWindow.xssTestVectors = xssTestVectors;
}
