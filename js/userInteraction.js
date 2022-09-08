import {width, height, MAX_X, MAX_Y, MAX_Z, tool_wrapper, toolbox} from "./globals.js"
import Vertex from "./Vertex.js";

let polygonTurn = false;
let lightSlide = false
let x = 0;
let y = 0;
let UIModes = ["polyhedronTurn", "addPoint", "moveLight"]
var UIMode = "polyhedronTurn"


export function setupUI() {
    startUpUIListeners(tool_wrapper)
    changeUIFunctions("polyhedronTurn")
}

var currentFunctionMove
var currentFunctionDown
var currentFunctionUp
var currentFunctionKeyDown
var currentFunctionKeyUp


export function changeUIFunctions(UIMode) {
    console.log(UIMode)
    const previous = document.getElementById("previous")
    const next = document.getElementById("next")
    const addpoint = document.getElementById("addpoint")

    if (UIModes.includes(UIMode)) {
        if (UIMode == "polyhedronTurn") {
            addNewEventListener('mousedown', currentFunctionDown, mousedownPolyhedronTurn)
            addNewEventListener('mouseup', currentFunctionUp, mouseupPolyhedronTurn)
            addNewEventListener('mousemove', currentFunctionMove, mousemovePolyhedronTurn)
            addNewEventListener('keyup', currentFunctionKeyUp, defaultFunctionKeyUp)
            next.disabled = true
            previous.disabled = true
        } 
        
        else if (UIMode == "addPoint") {
            addNewEventListener('keydown', currentFunctionKeyDown, keydownAddPoint)
            currentFunctionKeyDown = keydownAddPoint
            addNewEventListener('keyup', currentFunctionKeyUp, keyupAddPoint)
            currentFunctionKeyUp = keyupAddPoint
            toolbox.polyhedronList[0].vertices[toolbox.selectedPoint].selected = true

            console.log("add point chosen!")
            toolbox.selectedPoint = 0
            next.disabled = false
            next.onclick = function () {
                toolbox.polyhedronList[0].vertices[toolbox.selectedPoint].selected = false
                toolbox.selectedPoint += 1
                if (toolbox.selectedPoint >= toolbox.polyhedronList[0].vertices.length) {
                    toolbox.selectedPoint = 0
                }
                toolbox.polyhedronList[0].vertices[toolbox.selectedPoint].selected = true
            }
            previous.disabled = false
            previous.onclick = function () {
                toolbox.polyhedronList[0].vertices[toolbox.selectedPoint].selected = false

                toolbox.selectedPoint -= 1
                if (toolbox.selectedPoint < 0) {
                    toolbox.selectedPoint = toolbox.polyhedronList[0].vertices.length - 1
                }
                toolbox.polyhedronList[0].vertices[toolbox.selectedPoint].selected = true
            }

            addpoint.disabled = false 
            addpoint.onclick = function () {
                toolbox.polyhedronList[0].vertices.forEach(vertex => {
                    vertex.selected = false
                }); 
                toolbox.polyhedronList[0].addVertices([new Vertex(random(-MAX_X(), MAX_X()), random(-MAX_Y(), MAX_Y()), random(-MAX_Z(), MAX_Z()))])

            }

        } 
        
        else if (UIMode == "moveLight") {
            toolbox.lightSourceList[toolbox.selectedLight].selected = true

            console.log("light chosen!")
            addNewEventListener('keydown', currentFunctionKeyDown, keydownMoveLight)
            currentFunctionKeyDown = keydownMoveLight

            next.disabled = false
            next.onclick = function () {
                toolbox.lightSourceList[toolbox.selectedLight].selected = false
                toolbox.selectedLight += 1
                if (toolbox.selectedLight >= toolbox.lightSourceList.length) {
                    toolbox.selectedLight = 0
                }
                toolbox.lightSourceList[toolbox.selectedLight].selected = true
            }

            previous.disabled = false
            previous.onclick = function () {
                toolbox.lightSourceList[toolbox.selectedLight].selected = false
                toolbox.selectedLight -= 1
                if (toolbox.selectedLight < 0) {
                    toolbox.selectedLight = toolbox.selectedLight.length - 1
                }
                toolbox.lightSourceList[toolbox.selectedLight].selected = true
            }
        }
    } else Error("UIMode not valid")
}

// Function that changes current event listeners on events mouse down, up, move
function addNewEventListener(eventName, oldFunction, newFunction) {
    tool_wrapper.removeEventListener(eventName, oldFunction)
    tool_wrapper.addEventListener(eventName, newFunction)
}

// UI functions POLYGON TURN
function mousedownPolyhedronTurn(e) {
        // check location of mousedown
        console.log("mouse down poly!")
        if (e.x, e.y)
        x = e.offsetX;
        y = e.offsetY;
        polygonTurn = true;
}
function mouseupPolyhedronTurn() {
    console.log("uup!")
    if (polygonTurn === true) {
        x = 0;
        y = 0;
        toolbox.rotationX = 0;
        toolbox.rotationY = 0;
        polygonTurn = false;
    }
}
function mousemovePolyhedronTurn(e) {
    if (polygonTurn === true) {
        console.log("move!")
        // rotate because of X movement
        toolbox.rotationY = - (e.offsetX - x) * 0.01;
        x = e.offsetX
        // turn because of Y movement
        toolbox.rotationX = - (e.offsetY - y) * 0.01;
        y = e.offsetY
    }
}

// UI functions ADD POINT
function keydownAddPoint(e) {
    toolbox.lightMoved = true
    switch (e.key) {
        case "ArrowLeft": 
            console.log("left")
            toolbox.polyhedronList[0].vertices[toolbox.selectedPoint].move(-8, 0)
            break
        case "ArrowRight":
            // Right pressed
            console.log("right")
            toolbox.polyhedronList[0].vertices[toolbox.selectedPoint].move(8, 0)
            break
        case "ArrowUp":
            // Up pressed
            console.log("up")
            toolbox.polyhedronList[0].vertices[toolbox.selectedPoint].move(0, -8)
            break
        case "ArrowDown":
            // Down pressed
            console.log("down")
            toolbox.polyhedronList[0].vertices[toolbox.selectedPoint].move(0, 8)
            break
    }
}

function keyupAddPoint() {
    toolbox.polyhedronList[0].calculateConvexPlanes()
}

// UI functions MOVE LIGHT
function keydownMoveLight(e) {
    console.log("move light: down")
    toolbox.lightMoved = true
    switch (e.key) {
        case "ArrowLeft": 
            console.log("left")
            toolbox.lightSourceList[toolbox.selectedLight].move(-8, 0)
            break
        case "ArrowRight":
            // Right pressed
            console.log("right")
            toolbox.lightSourceList[toolbox.selectedLight].move(8, 0)
            break
        case "ArrowUp":
            // Up pressed
            console.log("up")
            toolbox.lightSourceList[toolbox.selectedLight].move(0, -8)
            break
        case "ArrowDown":
            // Down pressed
            console.log("down")
            toolbox.lightSourceList[toolbox.selectedLight].move(0, 8)
            break
    }
}

function defaultFunctionKeyUp() {}

function startUpUIListeners(tool_wrapper) {
    console.log(tool_wrapper)
    // Add the event listeners for mousedown, mousemove, and mouseup
    tool_wrapper.addEventListener('mousedown', currentFunctionDown)

    tool_wrapper.addEventListener('mousemove', currentFunctionMove)

    tool_wrapper.addEventListener('mouseup', currentFunctionUp)

    tool_wrapper.addEventListener('keydown', currentFunctionKeyDown)

    tool_wrapper.addEventListener('keyUp', currentFunctionKeyUp)

}

window.changeUIFunctions = changeUIFunctions