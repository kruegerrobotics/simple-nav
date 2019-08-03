let rover
let grid
let gridsize = 10
let gridCols
let gridRows
let goal
let navi

function make2DArray(cols, rows) {
    let arr = new Array(cols)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }
    return arr
}

function setup() {
    createCanvas(800, 600)
    gridCols = width / gridsize
    gridRows = height / gridsize

    //add some noise for terrain modelling
    let colOff = 0

    grid = make2DArray(width / gridsize, height / gridsize)
    //init the grip
    let counter = 0
    for (let i = 0; i < grid.length; i++) {
        let rowOff = 0
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = new Cell(i, j, gridsize, counter)
            let r = noise(rowOff, colOff) * 50
            //set r=1 to switch noise off
            //r = 1
            grid[i][j].travelcost = r
            counter++;
            rowOff = rowOff + 0.3
        }
        colOff = colOff + 0.3
    }
    rover = new Rover(gridsize)


    //create the obstacles
    let obstacles = new Array(floor(random(15, 40)))
    for (let o = 0; o < obstacles.length; o++) {
        obstacles[o] = new Obstacle(gridsize)
        //get cells that are inside the obstacle and mark them as not navigatable
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (i == obstacles[o].gridPos.x && j == obstacles[o].gridPos.y) {
                    grid[i][j].navigatable = false
                    for (let c = 0; c < obstacles[o].gridWidth; c++) {

                        for (let v = 0; v < obstacles[o].gridHeight; v++) {
                            //console.log(c,j)
                            grid[i + c][j + v].navigatable = false
                        }
                    }

                }
            }

        }
    }

    //use the obstacles to mark grid not-navigatable
    frameRate(10)

    //mark the goal
    goal = createVector(gridCols - 3, gridRows - 3)
    //grid[2][1].navigatable = false
    navi = new AStar(rover.pos, goal)
}

function draw() {
    background(80)

    // for (let i = 0; i < obstacles.length; i++) {
    //     obstacles[i].update()
    // }
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

    //for (let i = 0; i < 1; i++) {
    //console.time('navigation algorithm');
    if (navi.arrived == false) {
        navi.update()
    }
    //console.timeEnd('navigation algorithm');
    //visualize nav

    navi.openNodes.forEach(function (node) {
        noStroke()
        fill(0, 200, 0)
        rect(node.pos.x * gridsize, node.pos.y * gridsize, gridsize, gridsize)
    })

    navi.closedNodes.forEach(function (node) {
        noStroke()
        fill(200, 0, 0)
        rect(node.pos.x * gridsize, node.pos.y * gridsize, gridsize, gridsize)
    })
    fill(0, 0, 200)
    rect(navi.currentNode.pos.x * gridsize, navi.currentNode.pos.y * gridsize, gridsize, gridsize)

    if (navi.arrived == true)
        for (let i = 0; i < navi.path.length; i++) {
            let r = navi.path[i].pos
            fill(255)
            rect(r.x * gridsize, r.y * gridsize, gridsize, gridsize)
        }

    rover.update()
    if (rover.hasMoved) {
        navi.restart(rover.pos, goal)
        rover.hasMoved = false
    }

    //the goal point
    noStroke()
    fill(255, 0, 255)
    rect(goal.x * gridsize, goal.y * gridsize, gridsize, gridsize)




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
    } else if (keyCode == 34) {
        navi.restart(rover.pos, goal)
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

function mouseDragged(event) {
    //console.log("click", event)
    let gridX = floor(event.clientX / gridsize)
    let gridY = floor(event.clientY / gridsize)

    for (let i = -2; i <= 2; i++) {
        gridX = gridX + i
        gridY = gridY + i
        if (gridX >= 0 && gridX < gridCols && gridY >= 0 && gridY < gridRows) {
            grid[gridX][gridY].travelcost = 1
        }
    }
}
