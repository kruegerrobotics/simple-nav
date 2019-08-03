class Rover {
    constructor(_gridsize) {
        this.gridsize = _gridsize
        this.pos = createVector(1, 1)
        this.vel = createVector(0, 0)
        this.scanRange = 100
        this.hasMoved = false
    }

    setDir(x, y) {
        this.vel.x = x
        this.vel.y = y
        //this.vel.mult(this.gridsize)
        this.hasMoved = true
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
        let realX = this.pos.x * gridsize
        let realY = this.pos.y * gridsize
        rect(realX, realY, this.gridsize, this.gridsize)
        noFill()
        ellipseMode(CENTER)
        ellipse(realX + gridsize/2, realY+this.gridsize/2, this.scanRange)
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