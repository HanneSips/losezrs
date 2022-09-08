import { MAX_X, MAX_Y } from "./globals.js";
import Vertex from "./Vertex.js";
import Plane from "./plane.js";

export default class Projection {
    constructor(polyhedron, projectionPlane, lightSource) {
        this.polyhedron = polyhedron;
        this.projectionPlane = projectionPlane;
        this.lightSource = lightSource;
        this.vertices = [];
        this.projectedPlanes = [];
        this.calculateNewVertices()
        this.calculateNewProjectedPlanes()
    }

    calculateProjectedVertex(_vertex) {
        const l = this.lightSource.x - _vertex.x
        const m = this.lightSource.y - _vertex.y
        const n = this.lightSource.z - _vertex.z
        var projectedX
        var projectedY
        var projectedZ

        // calculation of projected vertices
        if (this.projectionPlane.type == "x") {
            projectedX = MAX_X()
            projectedY = m * ((projectedX - _vertex.x) / l) + _vertex.y
            projectedZ = n * ((projectedX - _vertex.x) / l) + _vertex.z
        } else if (this.projectionPlane.type == "y") {
            projectedY = MAX_Y()
            projectedX = l * ((projectedY - _vertex.y) / m) + _vertex.x
            projectedZ = n * ((projectedY - _vertex.y) / m) + _vertex.z
        } else Error("projection plane type doesn't exist")

        return new Vertex(projectedX, projectedY, projectedZ)
    }

    calculateNewVertices() {
        this.vertices = this.polyhedron.vertices.map(_vertex => this.calculateProjectedVertex(_vertex))
    }

    calculateNewProjectedPlanes() {
        this.projectedPlanes = []
        this.polyhedron.polyplanes.forEach(polyplane => {
            this.projectedPlanes.push(new Plane(polyplane.vertices.map(_vertex => 
                this.calculateProjectedVertex(_vertex)))
                )
        })
    }

    draw(rotationX, rotationY, lightMoved) {
        strokeWeight(0.3)
        if ((rotationX != 0) || (rotationY != 0) || (lightMoved) ) {
            this.calculateNewVertices()
            this.calculateNewProjectedPlanes()
        }

        fill(255, 255, 255)
        this.vertices.forEach(vertex => {
            line(vertex.x, vertex.y, vertex.z, this.lightSource.x, this.lightSource.y, this.lightSource.z)
            vertex.draw()
        })
        this.projectedPlanes.forEach(plane => {
            fill(255, 255, 255, 0);
            strokeWeight(6)
            plane.draw()
        })

    }
}