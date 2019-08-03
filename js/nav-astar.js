class AStarNode {
    constructor(pos) {
        //distance from Start
        this.gCost

        //distance from End
        this.hCost

        //total movement cost (g + h)
        this.gCost

        //required for checks
        this.pos = pos

        //parent last update originator of this node
        this.parent
    }

    update() {
        this.fCost = this.gCost + this.hCost
    }
}

class AStar {
    constructor(startPos, targetPos) {
        this.restart(startPos, targetPos)
    }
    
    restart(startPos, targetPos) {
        this.startPos = startPos
        this.targetPos = targetPos

        this.openNodes = []
        this.closedNodes = []

        //first node where current pos == startPos
        this.startNode = new AStarNode(this.startPos)
        this.currentNode = new AStarNode(this.startPos)

        //where to go
        this.targetNode = new AStarNode(this.targetPos)

        this.openNodes.push(this.currentNode)

        this.iteration = 0;

        this.path = []

        this.arrived = false

    }    

    //primitve method to compare to nodes (position only)
    //find better way with js or p5js!!! TODO
    isNodeEqual(nodeA, nodeB) {
        let d = p5.Vector.sub(nodeA.pos, nodeB.pos).mag()
        if (d <= 0.01) {
            return true
        } else {
            return false
        }
    }

    //distance calculator for moving in the grid: hor, vert, diag
    getDistance(nodeA, nodeB) {
        let distX = Math.abs(nodeA.pos.x - nodeB.pos.x)
        let distY = Math.abs(nodeA.pos.y - nodeB.pos.y)

        if (distX > distY) {
            return 14 * distY + 10 * (distX - distY)
        } else {
            return 14 * distX + 10 * (distY - distX)
        }
    }


    tracePath(startNode, endNode) {
        let currentNode = endNode

        while (!(this.isNodeEqual(currentNode, startNode))) {
            this.path.push(currentNode)
            currentNode = currentNode.parent
        }
        this.path = this.path.reverse()        
    }
    //this is the loop function, but here separated to be executed in each frame
    update() {
        //console.log("Iteration:", this.iteration)
        //sort the nodes to have the lowest fCost on top
        if (this.arrived == false) {
            this.openNodes.sort(function (a, b) {
                return a.fCost - b.fCost
            })
        
            //remove the current node from open
            this.currentNode = this.openNodes.shift()


            //add current node to closed
            this.closedNodes.push(this.currentNode)

            //checking if the current node is the end node
            if (this.isNodeEqual(this.currentNode, this.targetNode)) {
                console.log("ARRIVED")
                this.tracePath(this.startNode, this.currentNode)
                this.arrived = true
                return
            }

            //checking all neighbors - ideally we have 8 but have to check if in grid
            //getting the neighbors
            let neighbours = []
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {

                    //avoid getting the current node into the list
                    if (x == 0 && y == 0) {
                        continue
                    }

                    //check if in the grid
                    let checkX = this.currentNode.pos.x + x
                    let checkY = this.currentNode.pos.y + y

                    if (checkX >= 0 && checkX < gridCols && checkY >= 0 && checkY < gridRows) {
                        let pos = createVector(checkX, checkY)
                        neighbours.push(new AStarNode(pos, this.startPos, this.goalPos))
                    }

                }
            }

            //checking if the neighbors are navigatable and remove also if node is already closed
            for (let i = neighbours.length - 1; i >= 0; i--) {
                let n = neighbours[i]
               
                let test = grid[n.pos.x][n.pos.y].navigatable
                if (test == false) {
                    neighbours.splice(i, 1);
                    continue
                }

                //removal from neighbour - ineffficent method look for better one in JS to find and rmeove elemnt from array
                let delNeighbour = false
                for (let j = 0; j < this.closedNodes.length; j++) {
                    if (this.isNodeEqual(this.closedNodes[j], n)) {
                        neighbours.splice(i, 1);
                        delNeighbour = true;
                    }
                }

                //less elegant to jump back to for loop
                if (delNeighbour == true) {
                    continue
                }

                let moveCostToNeighbour = this.currentNode.gCost = this.getDistance(this.currentNode, n)
                if (moveCostToNeighbour < n.gCost || !this.openNodes.includes(n)) {
                    //console.log("new fcost")
                    n.gCost = moveCostToNeighbour
                    n.hCost = this.getDistance(n, this.targetNode)
                    n.update()
                    n.parent = this.currentNode
                    //noLoop()

                    let inOpenNodes = false
                    for (let j = 0; j < this.openNodes.length; j++) {
                        if (this.isNodeEqual(this.openNodes[j], n)) {
                            inOpenNodes = true
                        }
                    }
                    if (inOpenNodes == false) {
                        this.openNodes.push(n)
                    }
                }
                //console.log(moveCostToNeighbour, n)
            }

            //check if the neighbor is in the closed list
            //console.table(neighbours)
            this.iteration++
        }
    }
}


