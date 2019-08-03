class Cell {
    constructor(x, y, gridsize, id) {
        this.id = id
        this.size = gridsize
        this.pos = createVector(x * this.size, y * this.size)
        //console.log(this.pos)
        this.revealed = true
        this.timesVisited = 0
        this.navigatable = true
    }

    update() {
        push()
        stroke(120)
        if (this.revealed) {
            if (this.navigatable==true) {
                fill(110,0)
            }
            else {
                fill(0,255)
            }
        }
        else {
            fill(40)
        }
        //console.log(this.pos)
        rect(this.pos.x, this.pos.y, this.size, this.size)
        pop()
    }
}