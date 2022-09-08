export default class Plane {
    constructor(listOfVertices) {
        this.vertices = listOfVertices;
    }
    draw() {
        push()
        beginShape();
        this.vertices.forEach(_vertex => vertex(_vertex.x, _vertex.y, _vertex.z))
        endShape(CLOSE); 
        pop()
    }
}

