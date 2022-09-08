export default class LightSource {
    constructor(xyz, type, red, green, blue, x, y, z) {
        this.xyz = xyz
        this.type = type;
        this.x = x;
        this.y = y;
        this.z = z;
        this.green = green;
        this.red = red;
        this.blue = blue;
        this.lightSize = 20
        this.selected = false
    }

    move(moveLightX, moveLightY) {
        this.x += moveLightX
        this.y += moveLightY
    }

    draw() {
        // add light to webgl canvas
        if (this.type == "direction") {
            this.drawDirectionalLightSource()
        } else if (this.type == "point") {
            this.drawPointLightSource()
        }

        // Draw light source symbol
        this.drawLightSymbol()
    }

    drawDirectionalLightSource() {
        console.log("draw source")
        var lightVector = createVector(-this.x, -this.y, -this.z)
        lightVector.normalize()
        directionalLight(this.red, this.green, this.blue, lightVector)
    }

    drawPointLightSource() {
        pointLight(this.red, this.green, this.blue, this.x, this.y, this.z)
    }

    drawLightSymbol() {
        push()
        translate(this.x, this.y, this.z)

        if (this.selected == true) {
            fill(255, 50, 255)
            box(this.lightSize * 2, this.lightSize * 2, 0)
        } else {
            fill(255, 255, 50)
            box(this.lightSize, this.lightSize, 0)
        }

        pop()
    }


}

