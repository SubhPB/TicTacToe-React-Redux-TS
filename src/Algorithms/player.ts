/* -- Byimaan -- */

/*  -- Byimaan --

*/

import { TicTacToe } from "./game";
import { playerType } from "../Store/Refs";

// type Players = AIplayer | Player

export class Player{
    letter: playerType;
    constructor(letter:playerType){
        this.letter = letter;
    };
};


export class ComputerPlayer extends Player{
    constructor(letter: playerType){
        super(letter);
    };

    askMove(game: TicTacToe, waitTime: number = 1200){

        const _isValid = (sq: number):boolean => {
            return game.getAvailableMoves().includes(sq)
        };

        const randomSlot = Math.floor(Math.random()*game.getAvailableMoves().length);
        const playerChoice = game.getAvailableMoves()[randomSlot];
        
        if (_isValid(playerChoice)){

            game.acquireSlot(playerChoice, this.letter);
            
        };
        return playerChoice;

    };
};

interface minimaxInterface {
    position: number | null,
    score: number,
}

export class AIplayer extends Player{
    constructor(letter: playerType){
        super(letter)
    };

    askMove(game: TicTacToe): number| null | undefined{

        const _isValid = (sq: number):boolean => {
            return game.getAvailableMoves().includes(sq)
        };

        if (game.countEmptySlots() === 9){
            const randomSlot:number = Math.floor(Math.random()*9);
            if (_isValid(randomSlot)){
                return randomSlot
            };
        } else {
            const aImove: minimaxInterface = this.minimaxAI(game,this.letter);
            
            if ( typeof aImove['position'] === 'number'){
                
                return aImove['position'];
            };
        }
    };

    minimaxAI(state: TicTacToe, player: playerType): minimaxInterface{
        const maxPlayer = this.letter;
        const otherPlayer:playerType = player === 'X' ? 'O': 'X';

        if (state.winner === otherPlayer){
            const _getScore: number = (otherPlayer === maxPlayer) ? (
                state.countEmptySlots() + 1
            ) : (-1* state.countEmptySlots() - 1);
            return {position: null, score: _getScore}
        } else if (state.countEmptySlots() === 0){
            return {position: null, score: 0};
        };

        type outputType = minimaxInterface;
        let best: outputType;

        if (player === maxPlayer){
            best = {position: null, score: -Infinity}
        } else {
            best = {position: null, score: Infinity}
        };

        for(let move of state.getAvailableMoves()){

            state.acquireSlot(move, player, true);
            const simMove: outputType = this.minimaxAI(state, otherPlayer);

            state.undoMove(move);
            state.winner = null;
            state.gameIsOver = false;
            simMove.position = move;

            if (player === maxPlayer){
                if (simMove.score > best.score){
                    best = simMove;
                };
            } else {
                if (simMove.score < best.score){
                    best = simMove
                };
            };
        };
        return best;
    };
};
