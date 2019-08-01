let rover
let grid
let gridsize = 10
let obstacles

function make2DArray(cols, rows) {
    let arr = new Array(cols)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }
    return arr
}

function setup() {
    createCanvas(800, 600)
    grid = make2DArray(width / gridsize, height / gridsize)
    //init the grip
    let counter = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = new Cell(i, j, gridsize, counter)
            counter++;
        }
    }
    rover = new Rover(gridsize)
    obstacles = new Array(floor(random(15, 30)))
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i] = new Obstacle(50, 50, gridsize)
    }

    frameRate(30)
}

function draw() {
    background(80)
    rover.update()
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].update()
    }
    //update the grip
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            //if ()
            grid[i][j].update()
            let p = grid[i][j].pos
            if (rover.contains(p.x, p.y)) {
                grid[i][j].revealed = true
            }
        }
    }
    //check if elements are scanned

}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        rover.setDir(0, -1)
    } else if (keyCode === DOWN_ARROW) {
        rover.setDir(0, 1)
    } else if (keyCode === RIGHT_ARROW) {
        rover.setDir(1, 0)
    } else if (keyCode === LEFT_ARROW) {
        rover.setDir(-1, 0)
    }
}

function keyReleased() {
    switch (keyCode) {
        case UP_ARROW:
        case DOWN_ARROW:
        case RIGHT_ARROW:
        case LEFT_ARROW:
            rover.setDir(0, 0)
            break
    }
}