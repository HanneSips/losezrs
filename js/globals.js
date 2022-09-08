
export var width
export var height
export function MAX_X() {return width /(2) }
export function MAX_Y() {return height/(2) }
export function MAX_Z() {return width/(2) }
export function changeWidth(newWidth) {width = newWidth}
export function changeHeight(newHeight) {height = newHeight}
export var tool_wrapper
export function defineToolWrapper(toolwrapper) {tool_wrapper = toolwrapper}
export var toolbox
export function defineToolBox(newtoolbox) {toolbox = newtoolbox}