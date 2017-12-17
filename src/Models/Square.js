
export default class Square {
    constructor(x, y) {
        this.data = {
            x: x,
            y: y,
            isMine: false,
            isFlagged: false,
            sideMines: [],
            numSideMines: 0,
            isClicked: false,
        };
        return this;
    }
    setMine(){
        this.data.isMine = true;
    }
    setSideMine(mineSquare){
        this.data.sideMines.push(mineSquare);
        this.data.numSideMines = this.data.sideMines.length;
    }
    click(){
        this.data.isFlagged = false;
        this.data.isClicked = true;
    }
    toggleFlag(){
        this.data.isFlagged = !this.data.isFlagged;
    }
}