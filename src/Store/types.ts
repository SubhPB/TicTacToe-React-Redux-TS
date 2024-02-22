/* -- Byimaan -- */

import { USER_VS_AI, playerType, gameConfigInterface } from "./Refs";

export type boardType = Array<Array<playerType | null>>

const players: Array<playerType> = ['X','O'];
const randomPlayer: playerType = players[Math.round(Math.random())];

export interface gameInterface {
    gameConfig: gameConfigInterface;
    board: boardType;
    currPlayer: playerType;
    winner: playerType | null;
    gameIsOver: boolean;
    draw: boolean;
    winningSpots: Array<number>;
    message: string;
    wait: boolean;
};

export const gameInitialState : gameInterface = {
    gameConfig: {
        gameType: USER_VS_AI,
        selfLetter: randomPlayer,
        opponentLetter: randomPlayer === 'X' ? 'O' : 'X',
    },
    board: Array.from( {length: 3}, () => Array(3).fill(null) ),
    currPlayer: randomPlayer,
    winner: null,
    gameIsOver: false,
    draw: false,
    winningSpots: [],
    message: `TicTacToe: Player '${randomPlayer}'s turn. Waiting for response...`,
    wait: false,
};


export type actionType = {
    type: string,
    payload ?: any,
};
