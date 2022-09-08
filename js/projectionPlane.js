import { MAX_X, MAX_Y, MAX_Z} from "./globals.js";

export default class ProjectionPlane {
    constructor(type, index) {
        this.type = type;
        this.index = index;
        this.coordinate = (this.index) * MAX_X()
    }

    draw() {
        push()
        fill(255, 230, 200, 40)
        //ambientMaterial(color(255, 255, 255, 10));
        strokeWeight(0.2)

        if (this.type == 'x') {
            translate((this.index) * MAX_X(), 0, 0)
            box(1, MAX_Y() * 100, MAX_Z() * 100)
        }
        else if (this.type == 'y') {
            translate(0, (this.index) * MAX_Y(), 0)
            box(MAX_X() * 100, 1, MAX_Z() * 100)
        }
        else if (this.type == 'z') {
            plane(MAX_X() * 2, MAX_Y() * 2, MAX_Z() * 2)
        }
        pop()
    }
}

