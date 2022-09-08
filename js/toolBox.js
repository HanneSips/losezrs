import Polyhedron from "./polyhedron.js";
import LightSource from "./lightSource.js";
import Projection from "./projection.js";
import Vertex from "./Vertex.js";
import ProjectionPlane from "./projectionPlane.js";
import {width, height, MAX_X, MAX_Y, MAX_Z, tool_wrapper} from "./globals.js"
import { setupUI } from "./userInteraction.js";

export default class ToolBox {
    constructor(canvas) {
        this.canvas = canvas
        this.polyhedronList = [];
        this.projectionPlaneList = [];
        this.lightSourceList = [];
        this.polyhedronGraphList = [];
        this.projectionList = [];
        this.rotationX = 0
        this.rotationY = 0
        this.lightMoved = false
        this.selectedLight = 0
        this.selectedPoint = 0
    }

    customSetup() {
        // Light sources
        var lightSourceX = new LightSource("x", "point", 255, 0, 0, 0, -MAX_Y() * 2, 0);
        var lightSourceY = new LightSource("y", "point", 0, 255, 0, -MAX_X() * 2, 0, 0);
        this.addLightSource(lightSourceX)
        this.addLightSource(lightSourceY)

        // polyhedron
        const cubeSize = 250
        const vertex1 = new Vertex(100, 200, cubeSize)
        const vertex3 = new Vertex(0, cubeSize, cubeSize)
        const vertex6 = new Vertex(0, 0, cubeSize)
        const vertex5 = new Vertex(0, 0, 0)

        const polyhedron1 = new Polyhedron([vertex1, vertex3, vertex6, vertex5]);
        this.addPolyhedron(polyhedron1);
        console.log(polyhedron1)

        //polyhedron1.addPlane(new Plane([vertex1, vertex3, vertex7, vertex5]))
        //polyhedron1.addPlane(new Plane([vertex2, vertex7, vertex5, vertex8]))
        //polyhedron1.addPlane(new Plane([vertex1, vertex3, vertex6, vertex4]))
        //polyhedron1.addPlane(new Plane([vertex2, vertex6, vertex4, vertex8]))

        const plane1 = new ProjectionPlane("x", 1)
        const plane2 = new ProjectionPlane("y", 1)
        //const plane3 = new ProjectionPlane("x", -1)
        //const plane4 = new ProjectionPlane("y", -1)
        this.addProjectionPlane(plane2)

        this.addProjectionPlane(plane1)
        //this.addProjectionPlane(plane3)
        //this.addProjectionPlane(plane4)

        const projection1 = new Projection(polyhedron1, plane1, lightSourceY)
        const projection2 = new Projection(polyhedron1, plane2, lightSourceX)
        this.addProjection(projection1)
        this.addProjection(projection2)

    }

    setup() {
        this.customSetup()        
        setupUI(tool_wrapper)
    }



    addLightSource(lightSource) {
        this.lightSourceList.push(lightSource)
    }

    addPolyhedron(polyhedron) {
        this.polyhedronList.push(polyhedron)
    }

    addProjectionPlane(plane) {
        this.projectionPlaneList.push(plane)
    }

    addProjection(projection) {
        this.projectionList.push(projection)
    }

    draw() {
        rectMode(CENTER)
        camera(0, 0, (MAX_Y()*2 /2) / tan(PI / 6) + MAX_Z(), 0, 0, 0, 0, 1, -1);
        this.drawBox()
        this.drawAllLightSources()
        this.drawAllPolyhedra()


        this.drawAllProjections()
        this.drawAllPlanes()
        this.lightMoved = false


        // draw toolbox with all its elements

    }

    drawBox() {
        background(250);
        //rectMode(CENTER);
        strokeWeight(0.3)
    }

    drawAllPolyhedra() {
        this.polyhedronList.forEach(poly => poly.draw(this.rotationX, this.rotationY))
    }

    drawAllPlanes() {
        (this.projectionPlaneList).forEach(_plane => {
            _plane.draw()
        })
    }

    drawAllLightSources() {
        (this.lightSourceList).forEach(lightSource =>
            lightSource.draw(this.lightMoved)
        )
    }

    drawAllProjections() {
        this.projectionList.forEach(projection => 
            projection.draw(this.rotationX, this.rotationY, this.lightMoved))
    }

}