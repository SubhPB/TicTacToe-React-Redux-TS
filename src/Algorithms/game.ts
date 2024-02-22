/* -- Byimaan -- */

import { boardType } from "../Store/types";
import { playerType } from "../Store/Refs";
interface Game {
    gameBoard(): boardType;
    printBoard(): void;
    checkWinner(square: number, letter: string): boolean;
    countEmptySlots(): number;
    isEmptySlot(square: number): boolean;
    getAvailableMoves(): number[];
    acquireSlot(square: number, letter: string):boolean;
}

export class TicTacToe implements Game{

    board: Array<Array<null | playerType>>;
    gameIsOver: boolean;
    winner: string | null;

    constructor(defBoard?:boardType){
        this.board = defBoard ?? this.gameBoard();
        this.winner = null;
        this.gameIsOver = false;
    };

    gameBoard(){
        return Array.from( {length: 3}, () => Array(3).fill(null));
    };

    printBoard(printIndex ?: boolean){
        let tempBoard:any = [...this.board];
        if (printIndex){
            tempBoard = this.board.map( (_ , ind) => Array.from({length: 3}, (v, i) => String(i + ind*3) ));
        };
        [0,1,2].forEach( ind => {
            console.log('| ' + tempBoard[ind].join(' | ') + ' |');
        });
    };

    checkWinner(square: number, letter: string, checkRow= false, checkCol=false, checkDia=false): boolean{

        const _checkRow = () => {
            const rowIndex = Math.floor(square/3);
            const isWinner = this.board[rowIndex].every( sq => sq === letter );
            return isWinner;
        };
        if (checkRow) return _checkRow();

        const _checkCol = () => {
           const colIndex = square % 3;
           const isWinner = this.board.map( row => row[colIndex] );
           return isWinner.every(sq => sq === letter)
        };
        if (checkCol) return _checkCol();

        const _checkDia = () => {
            const dia1Winner = [0,1,2].every( sq => this.board[sq][sq] === letter);
            const dia2Winner = [0,1,2].every( sq => this.board[sq][2-sq] === letter);
            return dia1Winner || dia2Winner
        };
        if (checkDia) return _checkDia();


        this.gameIsOver = _checkRow() || _checkCol() || _checkDia();
        if (this.gameIsOver) {
            this.winner = letter;
        };

        return this.gameIsOver;
    };

    getWinningSpots(lastMove:number, letter: 'X'|'O'): Array<number>{
        if (this.checkWinner(lastMove, letter, true)){
            // -- row spots -- 
            const rowInd = Math.floor(lastMove/3)
            return Array.from({length:3}, (_,i) => i+rowInd*3)
        } else if (this.checkWinner(lastMove, letter, false, true)){
            // -- col spots -- 
            const colInd = lastMove % 3;
            return Array.from({length:3}, (_,i) => 3*i + colInd)
        } else if (this.checkWinner(lastMove, letter, false, false, true)){
            // -- diagonal -- 
            if ([0,1,2].every( sq => this.board[sq][sq] === letter)){
                // -- dia1 --
                return [0,4,8];
            } else if ([0,1,2].every( sq => this.board[sq][2-sq] === letter)){
                // -- dia2 -- 
                return [2,4,6];
            };
        };
        return [];
    };

    countEmptySlots(){
        let count = 0;
        this.board.forEach( row => (row.forEach( slot => slot === null ? count++ : count)));
        return count;
    };

    isEmptySlot(square: number){
        const row = Math.floor(square/3);
        const col = square % 3;
        return this.board[row][col] === null;
    };

    getAvailableMoves(){
        // getIndex converts the row and col index in to single array index between (0-8)
        const getIndex = (rowInd:number,colInd:number): number => rowInd + colInd + 2*rowInd ;
        let availableSlots: any[] = this.board.map( (row,rowInd) => (row.map((slot,slotInd) => slot === null ? getIndex(rowInd,slotInd) : null)));
        availableSlots = availableSlots.reduce( (acc,val) => acc.concat(val),[]);
        return availableSlots.filter( slot => slot !== null);
    };

    acquireSlot(square:number, letter: playerType, silent: boolean = false){
        const row = Math.floor(square/3);
        const col = square % 3;
        if (this.getAvailableMoves().includes(square)){
            this.board[row][col] = letter;
            this.checkWinner(square,letter)
            return true;
        }
        return false;
    };

    undoMove(square: number){
        const row = Math.floor(square/3);
        const col = square % 3;
        this.board[row][col] = null;
    }

};

