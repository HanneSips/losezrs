export default class Vertex {
    constructor(x, y, z) {
        //if (x <= MAX_X() && y <= MAX_Y() && z <= MAX_Z()) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.partOfPlanes = [] // list that contains all planes the vertex is part of
            this.selected = false
        //} else {
        //    Error("New vertex is out of range!")
        //}
    }

    move(x, y) {
        this.x += x
        this.y += y
    }

    getCoordinateArray() {
        return [this.x, this.y, this.z]
    }

    draw() {
        push()

        translate(this.x, this.y, this.z)
        if (this.selected == true) {
            ambientMaterial(color(255, 0, 0, 40))
            sphere(12)
        } else {
            fill(255, 0, 50)
            sphere(8)
        }

        pop()
    }
}

