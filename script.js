let array = []
class Player{
    constructor(grid) {
        this.grid = grid
        this.my = this.createInitial(grid)
        this.color = "#"+Math.floor(Math.random()*16777215).toString(16);
    }
    place(index){
        console.log(index)
        console.log(this.get2dFirst(index))
        console.log(this.get2dSecond(index))
        this.my[this.get2dFirst(index)][this.get2dSecond(index)] = true
    }
    isWin(){
        if(this.checkLine()||this.checkDiagonal()){
            console.log("get winner")
            return true
        }
    }
    checkLine(){
        for(let i =0;i<this.grid;i++){
            let checkHorizontal = true
            let checkVertical = true
            for(let j=0;j<this.grid;j++){
               if(this.my[i][j]=== false) {
                   checkVertical=false
               }
            }
            if(checkVertical===true){
                console.log("get winner Horizontal")
                return true
            }
            for(let j=0;j<this.grid;j++){
                if(this.my[j][i]=== false) {
                    checkHorizontal=false
                }
            }
            if(checkHorizontal===true){
                console.log("get winner Vertical")
                return true
            }
        }
        return false
    }
    checkDiagonal() {
        if (this.grid % 2 === 0) {
            return false
        } else {
            let check = true
            for (let i = 0, j = 0; i < this.grid; i++, j++) {
                if (this.my[j][i] === false) {
                    check = false
                }
            }
            if (check === true) {
                console.log("get winner Diagonal")
                return true
            }
            check = true
            for (let i = 0, j = this.grid-1; i < this.grid; i++, j--) {
                if (this.my[j][i] === false) {
                    check = false
                }
            }
            if (check === true) {
                console.log("get winner Diagonal 2")
                return true
            }
        }
    }
    createInitial(grid){
        let arr = [];
        let rows = grid
        let cols =grid
        // Creates all lines:
        for(let i=0; i < rows; i++){

            // Creates an empty line
            arr.push([]);

            // Adds cols to the empty line:
            arr[i].push( new Array(cols));

            for(let j=0; j < cols; j++){
                // Initializes:
                arr[i][j] = false
            }
        }
        return arr;
    }
    get2dFirst(index){
        return Math.floor(index/this.grid)
    }
    get2dSecond(index){
        return index%this.grid
    }
}
class turn{
    constructor(grid,numberPlayer) {
        this.grid = grid
        this.number = numberPlayer
        this.round =0
        this.hasWinner = false
        this.draw = false
        for(let i=0;i<numberPlayer;i++){
            let player = new Player(grid)
            array.push(player)
        }
    }
    turn(id){
        let turnPlay = this.round % this.number
        if(this.round===(this.grid**2-1)){
            this.draw=true
        }
        let player = turnPlay+1
        if(this.hasWinner===false && this.draw === false) {
            let index = id
            array[turnPlay].place(index)
            if (array[turnPlay].isWin() === true) {
                this.hasWinner=true
                alert("Player "+player+"Is the Winner")
            }
            document.getElementById(id).style.backgroundColor = array[turnPlay].color
            document.getElementById(id).setAttribute("empty", "false")
            this.round += 1
        }
        else{
            alert("Game is End")
        }
    }
    getTurn(){
        return this.round%this.number+1
    }
}
function initial(gridSize =3,number =2) {
    let grid = parseInt(gridSize)
    let numberOfPlayer = number
    let htmlGrid = document.querySelector("#grid")
    htmlGrid.classList.add('row-cols-'+grid)
    let manager = new turn(grid, numberOfPlayer)
    for (let i = 0; i < grid ** 2; i++) {
        let col = document.createElement("div")
        let shape = document.createTextNode("o")
        col.append(shape)
        col.classList.add("col")
        col.setAttribute("id", i)
        col.addEventListener("click", () => {
            if (!col.getAttribute("empty","place")) {
                let id = col.getAttribute("id")
                document.querySelector("#whoPlay").innerHTML = "This is Player "+manager.getTurn()+" Turn"
                manager.turn(id)
            } else {
                console.log("It already place")
            }
        })
        htmlGrid.appendChild(col)
    }
}
    document.querySelector("#log").addEventListener("click", () => {
        console.log(array)
        console.log(manager)
    })
    document.querySelector("#clear").addEventListener("click", () => {
        clear()
    })
function clear(){
    document.querySelector("#grid").innerHTML =""
    array = []
    let grid = document.querySelector("#inputGrid").value
    let player = document.querySelector("#inputNumberPlayer").value
    if(grid <2 || player <1 ){
        initial(3,2)
    }else{
        initial(grid,player)
    }
}
initial(3,2)
document.querySelector("#inputBtn").addEventListener("click",()=>{
    clear()
})