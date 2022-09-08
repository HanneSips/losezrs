import {width, height, MAX_X, MAX_Y, MAX_Z, changeWidth, changeHeight, tool_wrapper, defineToolWrapper, defineToolBox, toolbox} from "./globals.js"

var angle = 0.7
var canvas

import ToolBox from "./toolBox.js"



let createNewCanvas = function () {
    defineToolWrapper(document.getElementById('tool-wrapper'))
    changeWidth(tool_wrapper.clientWidth);
    changeHeight(tool_wrapper.clientHeight);
    canvas = createCanvas(width, height, WEBGL).id("tool")
    canvas.parent('tool-wrapper')
}
  
// This Redraws the Canvas when resized
let windowResized = function () {
    resizeCanvas(document.getElementById('tool-wrapper').clientWidth, document.getElementById('tool-wrapper').clientHeight);
};

let setup = function () {
    //pixelDensity(3)
    console.log("hallo")
    createNewCanvas()
    defineToolBox(new ToolBox(canvas, MAX_X(), MAX_Y(),MAX_Z()))
    toolbox.setup()
}

let draw = function () {
    // Put drawings here
    //console.log(angle);

    toolbox.draw()
}

window.setup = setup 
window.draw = draw