class Rover {
    constructor(_gridsize) {
        this.gridsize = _gridsize
        this.pos = createVector(2, 2)
        this.vel = createVector(0, 0)
        this.scanRange = 80
    }

    setDir(x, y) {
        this.vel.x = x
        this.vel.y = y
        this.vel.mult(this.gridsize)
    }

    update() {
        this.pos = p5.Vector.add(this.pos, this.vel)

        this.pos.x = constrain(this.pos.x, 0, width - this.gridsize)
        this.pos.y = constrain(this.pos.y, 0, height - this.gridsize)

        //paint it
        push()
        stroke(200, 0, 0)
        fill(200, 0, 0)
        //rectMode(CENTER)
        rect(this.pos.x, this.pos.y, this.gridsize, this.gridsize)
        stroke(0, 200, 0)
        noFill()
        ellipseMode(CENTER)
        ellipse(this.pos.x + this.gridsize / 2, this.pos.y + this.gridsize / 2, this.scanRange)
        pop()
    }

    contains(x,y) {
        let point = createVector(x,y)
        let d = p5.Vector.sub(this.pos, point).mag()
        if (d <= this.scanRange / 2){
            return true
        } else {
            return false
        }
    }
}