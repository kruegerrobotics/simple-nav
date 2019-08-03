class Obstacle {
    constructor(col, row, gridsize) {
        this.gridPos = createVector(floor(random(10, gridCols-10)), floor(random(10, gridRows-10)))
        this.gridWidth = floor(random(3, 10))
        this.gridHeight = floor(random(3, 10))        
    }

    //only for debug
    update() {
        push()
        stroke(0)
        fill(120, 0, 0, 120)
        rect(this.gridPos.x * gridsize, this.gridPos.y * gridsize, this.gridWidth * gridsize, this.gridHeight * gridsize)
        pop()
    }
}