import {range} from 'lodash';
import Square from './Square';
const SIDES = [
    [ -1, -1 ],
    [ 0, -1 ],
    [ 1, -1 ],
    [ -1, 0 ],
    [ 1, 0 ],
    [ -1, 1 ],
    [ 0, 1 ],
    [ 1, 1 ]
];
const DIFFICULTIES = {
    'easy': {
        sizex: 9,
        sizey: 9,
        numMines: 10,
    },
    'intermediate': {
        sizex: 16,
        sizey: 16,
        numMines: 40,
    },
    'hard': {
        sizex: 16,
        sizey: 30,
        numMines: 99,
    }
}

export default class Board {
    constructor(difficulty) {
        /* reset game state */
        this.hasWon = false;
        this.hasLost = false;
        this.numMines = DIFFICULTIES[difficulty]['numMines'];
        this.numUnflaggedMines = this.numMines;
        /* function bindings */
        this.getSideSquares = this.getSideSquares.bind(this);
        this.toggleFlag = this.toggleFlag.bind(this);
        this.checkWon = this.checkWon.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.createBoard = this.createBoard.bind(this);
        this.getPotentialMineSquare = this.getPotentialMineSquare.bind(this);
        /* run main board creation function */
        this.createBoard(DIFFICULTIES[difficulty])
        return this;
    }
    createBoard( settings){
        /* create the board */
        this.data = range(settings.sizex).map((x)=> {
            return range(settings.sizey).map((y)=>{
                return new Square(x, y);
            })
        });
        /* plant the mines */
        this.mines = range(settings.numMines).map((i) => {
            const mineSquare = this.getPotentialMineSquare(settings);
            mineSquare.setMine();
            /* notify each of the surrounding squares of the mine */
            const mineSideSquares = this.getSideSquares(mineSquare.data.x, mineSquare.data.y);
            mineSideSquares.forEach((mineSideSquare)=> {
                mineSideSquare.setSideMine(mineSquare);
            });
            return mineSquare;
        });
    }
    getPotentialMineSquare(settings){
        const minex = Math.floor(Math.random() * settings.sizex);
        const miney = Math.floor(Math.random() * settings.sizey);
        const mineSquare = this.data[minex][miney];
        if (mineSquare.data.isMine){
            /* oops we randomly picked a mine. Let's recursively try again */
            return this.getPotentialMineSquare(settings);
        } else {
            return mineSquare;
        }
    }
    getSideSquares(x,y){
        /* get all adjcent squares as array */
        return SIDES.map((sideVector) => {
            const sideSquareX = x + sideVector[0];
            const sideSquareY = y + sideVector[1];
            return (this.data[sideSquareX] && this.data[sideSquareX][sideSquareY]) ? this.data[sideSquareX][sideSquareY] : undefined;
        }).filter(sideSquare => typeof sideSquare === 'object');
    }
    clickSquare(square) {
        const self = this;
        if (!this.hasLost && !this.hasWon){
            const boardSquare = this.data[square.data.x][square.data.y];
            // update the square state by clicking it
            boardSquare.click();
            if (boardSquare.data.isMine === true) {
                // if player clicks on mine, end the game
                this.gameOver();
            } else if (boardSquare.data.numSideMines === 0){
                // if player clicks on square with zero adjacent mines, show all surrounding squares with zero adacent mines;
                const sideSquares = this.getSideSquares(boardSquare.data.x, boardSquare.data.y);
                sideSquares.forEach((sideSquare)=>{
                    if (sideSquare.data.numSideMines === 0 && sideSquare.data.isClicked === false){
                        self.clickSquare(sideSquare);
                    }
                });
            }
        }
        return this;
    }
    toggleFlag(square){
        const boardSquare = this.data[square.data.x][square.data.y];
        boardSquare.toggleFlag();
        this.checkWon();
        return this;
    }
    checkWon(){
        const numCorrectlyFlaggedMines = this.mines.filter((mine) => {
            return mine.data.isFlagged === true;
        }).length;
        this.numUnflaggedMines = this.numMines - numCorrectlyFlaggedMines;
        this.hasWon = (numCorrectlyFlaggedMines === this.mines.length);
        console.log('Won?', this.hasWon);
        return this.hasWon;
    }
    gameOver(){
        this.hasLost = true;
        this.mines.forEach((mine) => mine.click());
    }
}