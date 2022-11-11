let grid = 2
let numberOfPlayer = 2
let array = []
let htmlGrid = document.querySelector("#grid")
htmlGrid.classList.add('row-cols-'+grid)
class Player{
    constructor(grid) {
        this.grid = grid
        this.my = this.createInitial()
        this.color = Math.floor(Math.random()*16777215).toString(16);
    }
    place(index){
        console.log(this)

        // console.log(this.my[this.get2dFirst(index)][this.get2dSecond(index)])
        console.log(this.my[0][0])
        console.log(this.my[0][1])
        console.log(this.my[1][0])
        console.log(this.my[1][1])
        // this.my[this.get2dFirst(index)][this.get2dSecond(index)] = true
         this.my[0][0] = true
        console.log(this.my)
        let arr=this.my[0]
        let arr1 = arr[0]
        arr1=false
        console.log(this.my)
        // console.log()
        // console.log(this.get2dFirst(index))
        // console.log(this.get2dSecond(index))
        console.log(this.my)
        // this.my[0][0] = true
        // console.log(this.my[this.get2dFirst(index)][this.get2dSecond(index)])
        console.log(this.my[0][0])
        console.log(this.my[0][1])
        console.log(this.my[1][0])
        console.log(this.my[1][1])
        // console.log(this.my)
    }
    isWin(){
        console.log("test")
    }
    createInitial(){
        let result = []
        let temp = []
        console.log(this.grid)
        for(let j=0;j<this.grid;j++){
            temp.push(false)
        }
        for(let i=0;i<this.grid;i++){
            result.push(temp)
        }
        // result = [[false,false],[false,false]]
        // for (let i=0; i<3;i++){
        //     let temp =new Array(3)
        //     temp =temp.map(each => {
        //         console.log("1111")
        //         return false
        //     })
        //     console.log(temp)
        // }
        return result
    }
    get2dFirst(index){

        return Math.floor(index/this.grid)
    }
    get2dSecond(index){

        return index%this.grid
    }

}
class turn{
    constructor(gird,numberPlayer) {
        this.grid = grid
        this.number = numberPlayer
        this.round =1
        for(let i=0;i<numberPlayer;i++){
            // let player = new this.Player](grid);
            let player = new Player(grid)
            array.push(player)
        }
        console.log(array)
    }
    turn(id){
        let turnplay = this.round%this.number
        let index = id
        array[turnplay].place(index)
        document.getElementById(id).setAttribute("background-color",array[turnplay].color)
        document.getElementById(id).classList.add("place")
        this.round +=1
    }
    get2dFirst(index){
        let result= Math.floor(index/this.grid)
    }
    get2dSecond(index){
        let result= index%this.grid
    }

}

let manager = new turn(grid,numberOfPlayer)

for(let i = 0; i<grid**2;i++){
    let col = document.createElement("div")
    let shape = document.createTextNode("-")
    col.append(shape)
    col.classList.add("col")
    col.setAttribute("id",i)
    col.addEventListener("click",()=>{
            if(!col.classList.contains("place")){
                let id = col.getAttribute("id")
                manager.turn(id)
            }else{
                console.log("It already place")
            }

    })
    htmlGrid.appendChild(col)
}
document.querySelector("#log").addEventListener("click",()=>{
    console.log(array)
})
// document.querySelector("#clear").addEventListener("click",()=>{
//
//     console.log(array)
// })