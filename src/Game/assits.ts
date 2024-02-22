/*  -- Byimaan --  */

import { gameInterface } from "../Store/types";
import { TicTacToe } from "../Algorithms/game";
import { AIplayer, ComputerPlayer  } from "../Algorithms/player";
import { oppoentType } from "../Store/Refs";
import {USER_VS_COM, USER_VS_AI } from "../Store/Refs";

type boardType = Array<Array<playerType | null>>
type playerType = 'X' | 'O';

const msgs = {
    draw: "TicTacToe: This match is a draw between 'O' and 'X'.",
    msg: function(winner:any, selfLetter: playerType):string{
        if(winner === selfLetter) return `TicTacToe: Congrats!, You have won the game.`;
        return '"TicTacToe: Oops!, You have lost the game."'
    },
};

const composeMsg = (state: gameInterface):string => {
    if (state.draw){
        return msgs.draw;
    } else if (state.winner){
        return msgs.msg(state.winner, state.gameConfig.selfLetter);
    } else {
        return `TicTacToe: Player '${state.currPlayer}' 's turn. Waiting for response...`
    }
};


export function _countEmptySpots(board: boardType): number {
    let count : number = 0;
    board.forEach( row => (
        row.forEach( spot => spot === null ? count ++ : count )
    ));
    return count;
};

export function _getAvailableMoves(board: boardType):Array<number> {

    const getIndex = (rowInd:number,colInd:number): number => rowInd + colInd + 2*rowInd ;
    let availableSpots: any[] = board.map( (row,rowInd) => (row.map((slot,slotInd) => slot === null ? getIndex(rowInd,slotInd) : null)));
    availableSpots = availableSpots.reduce( (acc,val) => acc.concat(val),[]);
    return availableSpots.filter( slot => slot !== null);
};

export function _makeMove(state: gameInterface, square: number): gameInterface {
    const row = Math.floor(square / 3);
    const col = square % 3;
    const newBoard = state.board.map(row => [...row]);

    newBoard[row][col] = state.currPlayer;

    const TTT = new TicTacToe(newBoard);
    const winner = TTT.checkWinner(square,state.currPlayer);
    const draw = (TTT.countEmptySlots() === 0 && !winner);
    const winningSpots = TTT.getWinningSpots(square,state.currPlayer);

    const newState: gameInterface = {
        ...state, 
        board: newBoard,
        winner: winner ? state.currPlayer : null,
        gameIsOver: winner || draw,
        currPlayer: state.currPlayer === 'X' ? 'O' : 'X',
        draw: draw,
        winningSpots: winningSpots,
    }

    return {
        ...newState,
        message: composeMsg(newState),
    };
};

export const askMove = (game:gameInterface, askFrom: oppoentType) => {
    switch ( askFrom ){
        case USER_VS_COM:
            return _askComputer(game, game.currPlayer);
        case USER_VS_AI:
            return _askAI(game, game.currPlayer);
        default:
            return;                 
    }
};

export const _askComputer = (gameState: gameInterface, letter: playerType):number => {
    const compPlayer = new ComputerPlayer(letter);
    const TTT = new TicTacToe(gameState.board.map( v => [...v]));
    const move = compPlayer.askMove(TTT);
    return move;
};

export const _askAI = (gameState: gameInterface, letter: playerType) => {
    const aIplayer = new AIplayer(letter);
    const TTT = new TicTacToe([...gameState.board.map( v => [...v])]);

    const move: number | undefined | null = aIplayer.askMove(TTT);

    return move;
};

export async function timePass(ms:number= 1000){
    await new Promise( (res) => {
        setTimeout( () => {return res('')}, ms)
    });
}