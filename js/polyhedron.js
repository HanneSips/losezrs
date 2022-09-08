//export default 
import { ConvexGeometry } from 'https://unpkg.com/three@0.124.0/examples/jsm/geometries/ConvexGeometry.js';
import Plane from './plane.js';
import { toolbox } from './globals.js';


export default class Polyhedron {
    constructor(vertices) {
        this.vertices = vertices;
        this.polyplanes = [];
        this.calculateConvexPlanes()
    }
    addVertices(newVerticesList) {
        this.vertices = this.vertices.concat(newVerticesList)
        this.polyplanes = []
        this.calculateConvexPlanes()
    }

    addPlane(newPlane) {
        this.polyplanes.push(newPlane)
    }

    calculateConvexPlanes() {
        this.polyplanes = []
        //const geometry = new ConvexGeometry( this.vertices.map(vertex => vertex.getCoordinateArray()) );
        //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        //const mesh = new THREE.Mesh( geometry, material );

        const polygon = window.quickhull3dobj(this.vertices.map(vertex => vertex.getCoordinateArray()))
        //scene.add( mesh );
        console.log(polygon)
        
        polygon.forEach(face => {
            const planeVertices = face.map(vertexIndex => this.vertices[vertexIndex])
            const newPlane = new Plane(planeVertices)
            this.addPlane(newPlane)
        })
    }

    calculateNewVertices() {
        this.vertices.forEach(vertex => {
            // rotation around x axis
            const oldVertexY = vertex.y;
            vertex.y = vertex.y * cos(toolbox.rotationX) - vertex.z * sin(toolbox.rotationX)
            vertex.z = oldVertexY * sin(toolbox.rotationX) + vertex.z * cos(toolbox.rotationX)

            // rotation around y axis
            const oldVertexX = vertex.x;
            vertex.x = vertex.x * cos(toolbox.rotationY) - vertex.z * sin(toolbox.rotationY)
            vertex.z = oldVertexX * sin(toolbox.rotationY) + vertex.z * cos(toolbox.rotationY)
        })
    }

    draw(rotationX, rotationY) {
        ambientMaterial(color(255, 255, 255, 40));
        //ambientMaterial(255, 0, 255)
        
        strokeWeight(2)

        if ((rotationX != 0) || (rotationY != 0)) {
            this.calculateNewVertices()
        }

        // Draw all points
        this.vertices.forEach(vertex => vertex.draw())
        // draw all planes
        this.polyplanes.forEach(_plane => _plane.draw())        

    }
}

