class Obstacle {
    constructor (x, y, gridsize) {
        this.pos = createVector(random(100, width-20),random (50, height-100))
        this.width = random(3,10) * gridsize 
        this.height = random(3,10) * gridsize
    }

    update(){
        push ()
        stroke (0)
        fill (0)
        rect(this.pos.x, this.pos.y, this.width, this.height)
        pop ()
    }
}